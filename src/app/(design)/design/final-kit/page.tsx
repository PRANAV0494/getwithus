import {
  Code,
  FileText,
  Globe,
  MessageCircle,
  Megaphone,
  Phone,
  RefreshCw,
  Rocket,
  Server,
  Smartphone,
  Sparkles,
  TrendingUp,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import CallDemo from "@/components/motion/CallDemo";
import ChatDemo from "@/components/motion/ChatDemo";
import CodeTypewriter from "@/components/motion/CodeTypewriter";
import FloatingTiles, { type FloatingTile } from "@/components/motion/FloatingTiles";
import Marquee from "@/components/motion/Marquee";
import Orbit3D, { type OrbitItem } from "@/components/motion/Orbit3D";
import ProcessStepper from "@/components/motion/ProcessStepper";
import RevealText from "@/components/motion/RevealText";
import RotatingSeal from "@/components/motion/RotatingSeal";
import TagSphere from "@/components/motion/TagSphere";
import { Layer, Scene, TiltScene } from "@/components/motion/TiltScene";
import TypedText from "@/components/motion/TypedText";
import Typewriter from "@/components/motion/Typewriter";
import ModelStill from "@/components/three/ModelStill";
import WebGLModel from "@/components/three/WebGLModel";
import TechLogo from "@/components/ui/TechLogo";
import { isFilled } from "@/config/site";
import { codeSamples } from "@/content/code-samples";
import { callDemo, whatsappDemo } from "@/content/demos";
import { processSteps } from "@/content/process";
import { serviceLines } from "@/content/services/catalog";
import { toolCategories, tools, type ToolCategory } from "@/content/tools";

export const metadata: Metadata = {
  title: "Final kit",
  description: "Every primitive of the final light 3D design, in both themes.",
};

const COLOR: Record<ToolCategory, string> = {
  web: "var(--c-web)",
  mob: "var(--c-mob)",
  data: "var(--c-data)",
  ai: "var(--c-ai)",
  mkt: "var(--c-mkt)",
};

const CATEGORY_ICON: Record<ToolCategory, ReactNode> = {
  web: <Globe size={20} strokeWidth={1.75} />,
  mob: <Smartphone size={20} strokeWidth={1.75} />,
  data: <Server size={20} strokeWidth={1.75} />,
  ai: <Sparkles size={20} strokeWidth={1.75} />,
  mkt: <TrendingUp size={20} strokeWidth={1.75} />,
};

const ICON = { size: 17, strokeWidth: 1.9 } as const;

const SERVICE_STYLE: Record<string, { icon: ReactNode; color: string }> = {
  "web-development": { icon: <Globe {...ICON} />, color: "var(--c-web)" },
  "app-development": { icon: <Smartphone {...ICON} />, color: "var(--c-mob)" },
  "agentic-automation": { icon: <Workflow {...ICON} />, color: "var(--c-data)" },
  "whatsapp-bot": { icon: <MessageCircle {...ICON} />, color: "var(--wa)" },
  "calling-agent": { icon: <Phone {...ICON} />, color: "var(--c-ai)" },
  "digital-marketing": { icon: <Megaphone {...ICON} />, color: "var(--c-mkt)" },
  "custom-software": { icon: <Code {...ICON} />, color: "var(--accent)" },
};

const orbitItems: OrbitItem[] = serviceLines
  .flatMap((line) => [line, ...(line.children ?? [])])
  .map((service) => ({ label: service.name, href: service.href, ...SERVICE_STYLE[service.slug] }));

const STEP_ICONS = [FileText, Code, Rocket, RefreshCw];

const steps = processSteps.map((step, index) => {
  const StepIcon = STEP_ICONS[index] ?? FileText;
  return {
    title: step.title,
    icon: <StepIcon strokeWidth={1.6} />,
    detail: (
      <>
        <h3 className="type-h4 text-ink">{step.title}</h3>
        <p className="mt-2 text-body">{step.short}</p>
        <p className="mt-3 text-sm font-semibold text-ink">
          You get: {step.youGet.filter(isFilled).join(", ")}
        </p>
      </>
    ),
  };
});

function ToolChip({ name, logo }: { name: string; logo: string | null }) {
  return (
    <span className="flex h-12 items-center gap-2.5 rounded-[14px] border border-line bg-card pr-4 pl-2 text-[15px] font-semibold whitespace-nowrap text-ink">
      {logo ? (
        <span className="grid size-8 place-items-center rounded-[10px] bg-bg-soft">
          <TechLogo slug={logo} size={18} />
        </span>
      ) : (
        <span className="w-2" />
      )}
      {name}
    </span>
  );
}

const tiles: FloatingTile[] = [
  {
    key: "ts",
    style: { left: -34, top: -30 },
    z: 90,
    rotate: -10,
    content: <TechLogo slug="typescript" />,
  },
  {
    key: "py",
    style: { right: -26, top: 40 },
    z: 130,
    rotate: 9,
    delay: 1.4,
    content: <TechLogo slug="python" />,
  },
  {
    key: "dart",
    style: { left: -46, bottom: 90 },
    z: 70,
    rotate: 8,
    delay: 2.6,
    content: <TechLogo slug="dart" />,
  },
  {
    key: "sql",
    style: { right: "28%", top: -46 },
    z: 60,
    rotate: -6,
    delay: 3.3,
    content: <TechLogo slug="postgresql" />,
  },
  {
    key: "next",
    style: { left: "30%", bottom: -40 },
    z: 100,
    rotate: 6,
    delay: 0.7,
    content: <TechLogo slug="nextdotjs" />,
  },
];

function KitSection({
  title,
  note,
  children,
}: {
  title: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-line py-20">
      <div className="mx-auto max-w-[1220px] px-6">
        <h2 className="type-h3 text-ink">{title}</h2>
        <p className="mt-2 max-w-[44em] text-body">{note}</p>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export default function FinalKitPage() {
  const sphereTools = tools.map((tool) => ({
    name: tool.name,
    category: tool.category,
    logo: tool.logo ? <TechLogo slug={tool.logo} /> : null,
  }));
  const sphereCategories = toolCategories.map((category) => ({
    key: category.key,
    label: category.label,
    color: COLOR[category.key],
    icon: CATEGORY_ICON[category.key],
  }));
  const half = Math.ceil(tools.length / 2);

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="sticky top-0 z-[80] border-b border-line bg-hdr backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1220px] items-center justify-between px-6">
          <p className="font-display text-[22px] font-extrabold tracking-tight">
            GetWithUs final kit
          </p>
          <ThemeToggle />
        </div>
      </header>

      <section className="dots-bg py-20">
        <div className="mx-auto max-w-[1220px] px-6">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card py-2 pr-4 pl-3 text-sm font-semibold text-body shadow-soft">
            <span className="pulse-dot" aria-hidden="true" />
            Pulse dot pill
          </p>
          <h1 className="mt-6 type-display text-ink">
            <span className="block">We build the</span>
            <span className="block text-[0.92em] text-accent">
              <Typewriter
                words={["websites", "mobile apps", "WhatsApp bots", "calling agents", "software"]}
                spoken="websites, mobile apps, WhatsApp bots, calling agents, and software"
              />
            </span>
            <span className="block">your business runs on.</span>
          </h1>
          <p className="mt-4 max-w-[36em] type-lead text-body">
            Typewriter in the h1 word slot. Below: TypedText in a URL bar.
          </p>
          <p className="mt-6 inline-flex h-11 items-center rounded-full border border-line bg-card px-5 font-mono text-sm text-body">
            <TypedText text="getwithus.com/services/web-development" />
          </p>
        </div>
      </section>

      <KitSection
        title="Type scale"
        note="Bricolage Grotesque for headings, Figtree for text, JetBrains Mono for code only."
      >
        <div className="space-y-4">
          <p className="type-display">Display 80</p>
          <p className="type-h2">Heading two</p>
          <p className="type-h3">Heading three</p>
          <p className="type-h4">Heading four</p>
          <p className="type-lead text-body">Lead text for introductions under a heading.</p>
          <p className="type-body text-body">Body text for paragraphs and lists.</p>
          <p className="type-small text-muted">Small text for notes and captions.</p>
          <p className="type-label text-muted">Interface label</p>
          <p className="type-code text-ink">const code = &quot;mono&quot;;</p>
        </div>
      </KitSection>

      <KitSection
        title="Orbit3D"
        note="Services as links on a tilted ring around the cube. Drag to spin; hover or focus a chip to stop it."
      >
        <Orbit3D items={orbitItems} label="Services" />
      </KitSection>

      <KitSection
        title="Marquee"
        note="Two rows of official marks, the second reversed. Pauses on hover and focus."
      >
        <Marquee label="Tools we build with, first row" duration={55}>
          {tools.slice(0, half).map((tool) => (
            <ToolChip key={tool.name} name={tool.name} logo={tool.logo} />
          ))}
        </Marquee>
        <Marquee label="Tools we build with, second row" duration={60} reverse>
          {tools.slice(half).map((tool) => (
            <ToolChip key={tool.name} name={tool.name} logo={tool.logo} />
          ))}
        </Marquee>
      </KitSection>

      <KitSection
        title="TiltScene"
        note="Tilts toward a fine pointer, up to 9 degrees; the layers lift 1.9 times on hover."
      >
        <div className="grid gap-6 md:grid-cols-2">
          <TiltScene>
            <Scene>
              <Layer
                z={10}
                className="inset-x-[9%] top-[30px] bottom-[-1px] rounded-t-[14px] border border-line bg-card shadow-soft"
              >
                <div className="flex h-[30px] items-center gap-1.5 border-b border-line px-3">
                  <span className="size-2 rounded-full bg-[#f26b5b]" />
                  <span className="size-2 rounded-full bg-[#f5b54a]" />
                  <span className="size-2 rounded-full bg-[#3ec27a]" />
                  <span className="ml-2.5 h-3.5 flex-1 rounded-md bg-bg-soft" />
                </div>
                <div className="flex flex-col gap-2 p-4">
                  <span className="h-3 w-[80%] rounded bg-ink" />
                  <span className="h-2 w-[90%] rounded bg-line" />
                  <span className="h-2 w-[70%] rounded bg-line" />
                  <span className="mt-1 h-6 w-24 rounded-full bg-accent" />
                </div>
              </Layer>
              <Layer z={60} className="float-chip bottom-[26px] left-[5%]">
                <Smartphone size={16} className="text-c-web" aria-hidden="true" />
                Mobile first
              </Layer>
              <Layer z={85} className="float-chip top-4 right-[5%]">
                <TechLogo slug="nextdotjs" size={16} />
                Next.js
              </Layer>
            </Scene>
            <div className="tilt-scene-text px-3.5 pt-6">
              <h3 className="type-h3 text-ink">Websites and web apps</h3>
              <p className="mt-2 text-body">A tilt scene with three layers at different depths.</p>
            </div>
          </TiltScene>
          <TiltScene>
            <Scene className="flex items-center justify-center">
              <Layer
                z={20}
                className="top-6 left-[calc(50%-60px)] h-[200px] w-[120px] rounded-[24px] bg-ink p-2"
              >
                <div className="flex h-full flex-col gap-2 rounded-[17px] bg-card p-3">
                  <span className="h-14 rounded-[10px] bg-[color-mix(in_srgb,var(--c-mob)_22%,transparent)]" />
                  <span className="h-2 w-[80%] rounded bg-ink" />
                  <span className="h-1.5 w-[60%] rounded bg-line" />
                  <span className="mt-auto h-6 rounded-full bg-accent" />
                </div>
              </Layer>
              <Layer z={90} className="float-chip top-10 left-[6%]">
                Payment received
              </Layer>
              <Layer z={50} className="float-chip right-[10%] bottom-5">
                iOS and Android, one codebase
              </Layer>
            </Scene>
            <div className="tilt-scene-text px-3.5 pt-6">
              <h3 className="type-h3 text-ink">Mobile apps</h3>
              <p className="mt-2 text-body">A phone in the scene, chips in front of it.</p>
            </div>
          </TiltScene>
        </div>
      </KitSection>

      <KitSection
        title="CodeTypewriter, FloatingTiles, RotatingSeal"
        note="Types each file while on screen, runs it, moves on. Tabs and language rows switch files."
      >
        <CodeTypewriter
          samples={codeSamples}
          logos={codeSamples.map((sample) => (
            <TechLogo key={sample.name} slug={sample.logo} />
          ))}
          intro={<h3 className="type-h2 text-ink">Real code, in your repo, from week one</h3>}
          decor={
            <>
              <FloatingTiles tiles={tiles} />
              <div className="code-seal">
                <RotatingSeal id="kit-seal" />
              </div>
            </>
          }
        />
      </KitSection>

      <KitSection
        title="TagSphere"
        note="Tool chips with official marks on a sphere. Choose a group to light it up."
      >
        <TagSphere tools={sphereTools} categories={sphereCategories}>
          <h3 className="type-h2 text-ink">The stack behind your project</h3>
          <p className="mt-4 type-lead text-body">Mainstream, well documented tools.</p>
        </TagSphere>
      </KitSection>

      <KitSection
        title="ProcessStepper"
        note="Advances every 2.8 s on screen, holds while hovered or focused, and for 9 s after a choice."
      >
        <ProcessStepper steps={steps} label="How a project runs" />
      </KitSection>

      <KitSection
        title="ChatDemo and CallDemo"
        note="Scripted demos from src/content/demos.ts, looping while on screen."
      >
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <ChatDemo script={whatsappDemo} className="mx-auto w-full max-w-[420px]" />
          <CallDemo script={callDemo} className="mx-auto w-full max-w-[460px]" />
        </div>
      </KitSection>

      <KitSection
        title="WebGLModel"
        note="A still SVG until the first scroll, pointer move, or key press; then the model loads near the viewport at 30 fps."
      >
        <WebGLModel
          model="brand-cube"
          still={<ModelStill model="brand-cube" />}
          className="mx-auto max-w-[640px]"
        />
      </KitSection>

      <KitSection
        title="RevealText"
        note="Rises in once, line by line, when it first enters the screen."
      >
        <RevealText
          text="Headings rise in line by line, once, as they enter the screen."
          className="max-w-[16em] type-h2 text-ink"
        />
      </KitSection>

      <KitSection
        title="Official marks"
        note="Every tool in content/tools.ts. Seven brands have no mark in simple-icons and are shown by name."
      >
        <ul className="flex flex-wrap gap-3">
          {tools.map((tool) => (
            <li key={tool.name}>
              <ToolChip name={tool.name} logo={tool.logo} />
            </li>
          ))}
        </ul>
      </KitSection>

      <KitSection
        title="WhatsApp button"
        note="Fixed bottom right on the live site, once the phone number is known. Icon only below 600 px."
      >
        <WhatsAppFab preview />
      </KitSection>
    </div>
  );
}
