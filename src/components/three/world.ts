/*
 * Builds every station's geometry data from one seeded random stream, in the same
 * order as the tuned prototype, so the scene is identical on every load. Counts
 * scale with the quality tier.
 */
import { FIELD, NETWORK, SEED, SLAB } from "@/components/three/constants";
import { mulberry32 } from "@/lib/random";

type Point = { x: number; y: number; z: number };
type Segment = { a: Point; b: Point; order: number; seed: number };

/** Attributes for the shared line shader: positions plus per-vertex t, draw order, and pulse seed. */
type LineData = {
  position: Float32Array;
  t: Float32Array;
  order: Float32Array;
  seed: Float32Array;
};

export type World = {
  cols: number;
  rows: number;
  cubes: number;
  slabWidth: number;
  slabHeight: number;
  gridPositions: Float32Array;
  cloudPositions: Float32Array;
  paneGrid: LineData;
  nodes: Point[];
  /** The leftmost and rightmost nodes: a message arriving and a reply going out. */
  endA: number;
  endB: number;
  edges: LineData;
  field: {
    count: number;
    start: Float32Array;
    end: Float32Array;
    slab: Float32Array;
    size: Float32Array;
    seed: Float32Array;
  };
};

function toLineData(segments: readonly Segment[]): LineData {
  const n = segments.length;
  const data: LineData = {
    position: new Float32Array(n * 6),
    t: new Float32Array(n * 2),
    order: new Float32Array(n * 2),
    seed: new Float32Array(n * 2),
  };
  segments.forEach((segment, k) => {
    data.position.set(
      [segment.a.x, segment.a.y, segment.a.z, segment.b.x, segment.b.y, segment.b.z],
      k * 6,
    );
    data.t[k * 2 + 1] = 1;
    data.order[k * 2] = data.order[k * 2 + 1] = segment.order;
    data.seed[k * 2] = data.seed[k * 2 + 1] = segment.seed;
  });
  return data;
}

function distanceSquared(a: Point, b: Point): number {
  return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
}

/** @param counts share of full instance counts for the tier; @param mobile fewer field points */
export function buildWorld(counts: number, mobile: boolean): World {
  const rnd = mulberry32(SEED);
  const root = Math.sqrt(counts);

  // Station 0 and 5: the slab and its cloud.
  const cols = Math.max(8, Math.round(SLAB.cols * root));
  const rows = Math.max(5, Math.round(SLAB.rows * root));
  const cubes = cols * rows;
  const gridPositions = new Float32Array(cubes * 3);
  const cloudPositions = new Float32Array(cubes * 3);
  for (let i = 0; i < cubes; i++) {
    gridPositions[i * 3] = ((i % cols) - (cols - 1) / 2) * SLAB.spacing;
    gridPositions[i * 3 + 1] = (Math.floor(i / cols) - (rows - 1) / 2) * SLAB.spacing;
    const u = rnd();
    const v = rnd();
    const w = rnd();
    const r = 0.8 + 2.0 * Math.cbrt(u);
    const theta = v * Math.PI * 2;
    const phi = Math.acos(2 * w - 1);
    cloudPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    cloudPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
    cloudPositions[i * 3 + 2] = r * Math.cos(phi) * 0.8;
  }

  // Station 1: the 12 x 8 grid drawn on the pane, in the pane's unit space.
  const gridSegments: Segment[] = [];
  for (let i = 0; i <= 12; i++) {
    const x = -0.5 + i / 12;
    gridSegments.push({
      a: { x, y: -0.5, z: 0.5 },
      b: { x, y: 0.5, z: 0.5 },
      order: i / 20,
      seed: rnd(),
    });
  }
  for (let i = 0; i <= 8; i++) {
    const y = -0.5 + i / 8;
    gridSegments.push({
      a: { x: -0.5, y, z: 0.5 },
      b: { x: 0.5, y, z: 0.5 },
      order: 0.6 + i / 20,
      seed: rnd(),
    });
  }

  // Station 3: nodes inside an ellipsoid, edges to near neighbours, then random pairs.
  const nodeCount = Math.round(NETWORK.nodes * counts);
  const edgeCount = Math.round(NETWORK.edges * counts);
  const [rx, ry, rz] = NETWORK.radii;
  const nodes: Point[] = [];
  for (let i = 0; i < nodeCount; i++) {
    const a = rnd() * Math.PI * 2;
    const b = Math.acos(2 * rnd() - 1);
    const rr = 0.5 + 0.5 * Math.cbrt(rnd());
    nodes.push({
      x: rr * Math.sin(b) * Math.cos(a) * rx,
      y: rr * Math.sin(b) * Math.sin(a) * ry,
      z: rr * Math.cos(b) * rz,
    });
  }
  let endA = 0;
  let endB = 0;
  for (let i = 1; i < nodeCount; i++) {
    if (nodes[i].x < nodes[endA].x) endA = i;
    if (nodes[i].x > nodes[endB].x) endB = i;
  }

  const edgeSegments: Segment[] = [];
  const seen = new Set<string>();
  const addEdge = (p: number, q: number) => {
    const key = p < q ? `${p}:${q}` : `${q}:${p}`;
    if (p === q || seen.has(key)) return;
    seen.add(key);
    edgeSegments.push({ a: nodes[p], b: nodes[q], order: rnd(), seed: rnd() });
  };
  for (let i = 0; i < nodeCount && edgeSegments.length < edgeCount; i++) {
    const nearest = nodes
      .map((node, j) => ({ j, d: distanceSquared(node, nodes[i]) }))
      .sort((x, y) => x.d - y.d);
    addEdge(i, nearest[1].j);
    if (edgeSegments.length < edgeCount) addEdge(i, nearest[2].j);
  }
  for (let guard = 0; edgeSegments.length < edgeCount && guard < 1000; guard++) {
    const p = Math.floor(rnd() * nodeCount);
    const q = Math.floor(rnd() * nodeCount);
    addEdge(p, q);
  }

  // Station 4 and 5: points seeded by the network, spreading on a paraboloid, settling into slab slots.
  const pointCount = Math.round((mobile ? FIELD.mobile : FIELD.desktop) * counts);
  const field = {
    count: pointCount,
    start: new Float32Array(pointCount * 3),
    end: new Float32Array(pointCount * 3),
    slab: new Float32Array(pointCount * 3),
    size: new Float32Array(pointCount),
    seed: new Float32Array(pointCount),
  };
  for (let i = 0; i < pointCount; i++) {
    const node = nodes[i % nodeCount];
    field.start[i * 3] = node.x + (rnd() - 0.5) * 0.3;
    field.start[i * 3 + 1] = node.y + (rnd() - 0.5) * 0.3;
    field.start[i * 3 + 2] = node.z + (rnd() - 0.5) * 0.3;
    const radius = rnd() * FIELD.radius;
    const angle = rnd() * Math.PI * 2;
    field.end[i * 3] = Math.cos(angle) * radius;
    field.end[i * 3 + 1] = 0.085 * radius * radius - 0.7;
    field.end[i * 3 + 2] = Math.sin(angle) * radius * 0.65;
    const slot = (i % cubes) * 3;
    field.slab[i * 3] = gridPositions[slot] + (rnd() - 0.5) * 0.05;
    field.slab[i * 3 + 1] = gridPositions[slot + 1] + (rnd() - 0.5) * 0.05;
    field.slab[i * 3 + 2] = (rnd() - 0.5) * 0.08;
    field.size[i] = 1 + rnd() * 1.4;
    field.seed[i] = rnd();
  }

  return {
    cols,
    rows,
    cubes,
    slabWidth: cols * SLAB.spacing,
    slabHeight: rows * SLAB.spacing,
    gridPositions,
    cloudPositions,
    paneGrid: toLineData(gridSegments),
    nodes,
    endA,
    endB,
    edges: toLineData(edgeSegments),
    field,
  };
}
