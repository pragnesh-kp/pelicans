# Website design system — metizsoft layout

This folder is an alternative design of the Pelicans public website. Its layout,
section order, type scale and interactions follow a study of metizsoft.com
(October 2026). Only the *design language* was taken over — all text, photos,
logos and brand assets are Pelicans' own.

## Colours (`:root` tokens in `src/app/globals.css`)

metizsoft uses deep indigo + purple + orange. Per the client's "white + blue" rule
those map to Pelicans colours:

| Token | Value | metizsoft equivalent | Use |
|---|---|---|---|
| `--deep` | `#0b2468` navy | `#2a2273` indigo | buttons, footer, numbers, active states |
| `--brand` | `#1163fb` Pelicans blue | `#6b3fa0` purple | highlighted words, icons, links |
| `--brand-light` | `#eef4ff` | `#f3eeff` | pills, icon tiles |
| `--sky` | `#22b5f5` | `#ff6000` orange | end of the title gradient |
| `--gradient` | navy → blue → sky | indigo → purple → orange | italic serif words in hero titles |
| `--light` | `#f8f9fc` | same | alternate (grey) sections |
| `--contact-bg` | `#e7efff` | `#efe4f7` lilac | contact section, project showcase |

## Type

- **Poppins** for everything; **Instrument Serif italic** for the accent words in hero titles (`.serif`).
- Hero H1 ≈ 84px / 800 / −0.045em · section H2 40px / 600 / −1.2px · body 16px, line-height 1.7.
- Eyebrows: a light-blue pill above centred titles; a small uppercase "• KICKER" above split titles; `.kicker` (line + uppercase) in heroes.

## Shapes

- Buttons: solid navy rectangle, 10px corners, small ↗ (`.btn`); `.btn--outline` is the 2px-border version.
- Cards: white, 1px `#e8eaf0` border, 16–24px radius, lift + shadow on hover (`.card`).
- Hero backgrounds: soft blue glows + faded 56px grid (`.grid-wash`).

## Sections (where they live)

| Pattern | Component |
|---|---|
| Fixed header (see-through → white), mega menu with uppercase group titles + tech logos | `components/layout/Header.js` |
| Hero: kicker, giant title with serif accent, 2 buttons, 5-card bento grid | `components/site/HomeHero.js` |
| "Trusted by" strip: kicker + numbers, two logo rows sliding opposite ways | `components/site/ClientLogos.js` (`variant="strip"`) |
| Photo + 3 point cards + highlighted note | `components/home/WhyPelicans.js` |
| Process: 3 cards with ringed icons on grey | `components/home/ProcessCards.js` |
| Services grid with "Explore ↗" | `components/home/ServiceCards.js` |
| Tech stack tabs with logo chips | `components/home/TechTabs.js` |
| Dark gradient numbers band | `components/home/StatsBand.js` |
| Industries accordion + photo | `components/site/Industries.js` |
| Project showcase carousel | `components/home/ProjectShowcase.js` |
| Testimonial cards | `components/site/Testimonials.js` |
| FAQ: bordered rows, open row outlined blue, + → × | `components/blocks/FaqBlock.js` |
| Contact section on every page: numbers + logos, rotating quote, form card | `components/site/ContactBand.js` |
| Navy footer: numbers, 5 link columns, offices with flags, social | `components/layout/Footer.js` |
| Inner-page hero: grid wash, kicker, serif accent, picture/form, numbers row | `components/blocks/HeroBlock.js`, `components/site/PageHero.js` |
| Shared-border "roadmap" card grid ("01 — LABEL") | `components/blocks/CardGrid.js` |

## Motion (all off with "reduce motion")

Lenis smooth scrolling, letter-by-letter section titles, staggered card reveals,
drifting hero glow, orbiting dot + floating orb and phone, chart line drawing in,
logo marquee, count-up numbers, accordion height animation, rotating contact quote.
