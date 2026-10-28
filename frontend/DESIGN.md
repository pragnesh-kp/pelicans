# Website design system

The public website's look follows a study of appinventiv.com (October 2026): its
colours, type scale, layout patterns and motion. Only the *design language* was
taken over — all text, images, logos and brand assets are Pelicans' own.

## Colours (`.site` tokens in `src/app/globals.css`)

White + blue (since 26 Oct 2026 — the client rejected the earlier all-black look).

| Token | Value | Use |
|---|---|---|
| `--bg` / `--bg-alt` | `#ffffff` / `#f3f7ff` | page background / light-blue alternate bands |
| `--surface` | `#ffffff` | cards (with a light border) |
| `--border` / `--border-strong` | `#e2e9f6` / `#c8d5ec` | card borders, dividers |
| `--text` / `--muted` | `#0b1a3d` / `#4d5b78` | deep-navy text / secondary text |
| `--primary` | `#1163fb` | buttons, links, highlights |
| `--primary-gradient` | `#70a1fd → #1163fb` | blue bands and CTA cards |
| `--navy` | `#071a45` | dark areas: photo heroes, footer, `.theme-dark` / `.section--dark` (white text) |
| `.section--light` | `#eef4ff` bg | light-blue bands (services, case studies, testimonial cards) |
| `--cream` | `#fefbdc` | small highlight strips (mega-menu footer) |

Header: white bar over navy/photo areas, deep-blue bar over white sections.

## Type

- Font: **Plus Jakarta Sans** (Google Fonts, self-hosted by Next.js).
- Hero H1 ≈ 56px / 600 · section H2 ≈ 34–40px / 500–600 · body 15–16px · labels 12px uppercase.
- Lists and accordions are numbered in brackets: `[1]`, `(01)`.

## Shapes

- Buttons: pills (48px radius), 14px / 600, ↗ arrow. Solid blue, blue outline, or white on blue.
- Cards: 16–18px radius, 1px border, no heavy shadows on dark.

## Motion (all off with "reduce motion")

| Effect | Where | How |
|---|---|---|
| Smooth scrolling | whole site | Lenis (`components/motion/SmoothScroll.js`) |
| Letter-by-letter heading reveal | section titles, heroes | `SplitTitle` + CSS, triggered by `MotionProvider` |
| Pinned columns moving at different speeds | home services | GSAP ScrollTrigger (scrub) |
| Active item follows scroll | industries list | IntersectionObserver |
| Stacked sticky cards | numbered feature lists | CSS `position: sticky` |
| Timeline line fills while scrolling | process steps | GSAP ScrollTrigger (scrub) |
| Logo marquees | client logos | CSS keyframes, pause button |
| Count-up numbers, staggered card reveals | stats, grids | `CountUp`, `data-stagger` |
