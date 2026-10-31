# Kickoff

Setup, once, in a terminal inside this folder:

```text
corepack enable
pnpm install
git init
git add -A
git commit -m "Starter"
```

Then open Claude Code in this folder and paste the message below as one message.

```text
You are building a Next.js agency website in this repository. The complete specification is in docs/build-prompt.md, with an addendum in docs/build-addendum.md that overrides section 5 of the spec wherever numbers differ. A browser prototype of the home page's 3D scene is at docs/prototype/home.html.

Read all three files fully before writing any code. Then build everything in the spec, sections 0 to 28. Do not stop to ask questions unless a hard blocker appears.

Before phase 1, do section 28.12 (verify every dependency version with npm view and record it in docs/decisions/0001-versions.md). Pin from those results, never from memory.

Work phase by phase in the order of section 26.1. Before each commit run pnpm check and pnpm build; do not move on while either fails. Commit after each phase with the phase name.

Read docs/prototype/home.html before phase 4 and port its logic for the stations, shaders and render loop, not its three r128 API calls.

Finish with docs/handoff.md as described in section 26.3.
```

If Claude Code compacts its context or you close the terminal, start the next session with:

```text
Continue building the site specified in docs/build-prompt.md and docs/build-addendum.md. Read both files, then git log and docs/, and resume at the next unfinished phase of section 26.1.
```

Delete this file once the build has started; the spec forbids stray files in the repo.
