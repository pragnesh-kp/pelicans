# Website design system — multiqos layout

This folder is an alternative design of the Pelicans public website. Its layout,
section patterns and components follow a study of multiqos.com (October 2026).
Only the *design language* was taken over — all text, images, logos and brand
assets are Pelicans' own (same content files as `../frontend`).

## Colours (`:root` tokens in `src/app/globals.css`)

| Token | Value | Use |
|---|---|---|
| `--primary` | `#1163fb` (Pelicans blue) | buttons, arrow badges, highlights. multiqos uses a pink-red here; change this one token to switch |
| `--primary-gradient` | blue gradient | CTA banners |
| `--navy` | `#050d24` | home hero (dark area) |
| `--text` / `--muted` | `#000` / `#434343` | headings / body text |
| `--grey` | `#f1f2f4` | every card, accordion row and the contact card |
| `--tint-1…5` | soft blue, lilac, sky, mint, peach | number cards, testimonial cards, mission/vision cards |

Pages are white; sections don't alternate colours — the grey cards carry the contrast.

## Type

- Font: **Manrope** (Google Fonts, self-hosted by Next.js).
- Hero H1 ≈ 60px / 700 / -1.5px · section H2 ≈ 44px / 700 / -1px · card titles 19–22px · body 15–17px.
- Every section starts with an eyebrow (◉ target icon + label), the title on the left and the intro on the right (`.section-head`).

## Shapes

- Buttons: outlined pill + a round accent badge with ↗ that overlaps it. On hover the pill fills and the arrow turns →. Plain markup: `<a class="btn">Label <ArrowUpRight/></a>`.
- Cards: grey, 32px radius; on hover many turn accent-blue and round off the bottom-left corner (110–140px).
- Accordions / tabs: grey pills with a round chevron.

## Sections (where they live)

| Pattern | Component |
|---|---|
| Sticky white header, mega menu with category tabs + "next step" card | `components/layout/Header.js` |
| Dark hero, rotating highlight, divider, intro + numbers | `components/site/HomeHero.js`, `RotatingWords.js` |
| Sliding card row with dots | `components/ui/Carousel.js` (services, feature sliders) |
| Service tabs ("What We Offer") | `components/home/OfferTabs.js` |
| Industry list with marker + card | `components/site/Industries.js` |
| Tech accordion + hub diagram | `components/home/TechNetwork.js` |
| Tech-stack rows (name + pills) | `components/blocks/LogoCategories.js`, `TechStackTags.js` |
| Step-by-step roadmap (sticky left, timeline right) | `components/blocks/ProcessSteps.js` |
| Logo grid with "Ready to get started?" tile | `components/site/ClientLogos.js` |
| Contact card above the footer on every page | `components/site/ContactBand.js` |
| White footer with offices + 5 link columns | `components/layout/Footer.js` |

## Motion (all off with "reduce motion")

Lenis smooth scrolling, letter-by-letter heading reveal, staggered card reveals,
rotating hero phrase, timeline line that fills while scrolling, logo marquee, count-up numbers.
