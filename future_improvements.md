# Future Improvements

Deferred tasks, assumptions and ideas for the LARO landing page.

## Before production launch

- **Connect the contact form service.** `#contactForm` has `action="#"`, so the form runs in demo mode:
  it validates input and shows "Message sent" without sending anything. Set `action` to the service
  endpoint (Formspree / Web3Forms / own endpoint) and add the hidden fields it requires
  (e.g. Web3Forms `access_key`). Send a test submission and confirm the email arrives.
- **Replace the site URL** `https://den-dev-web.github.io/laro/` in `index.html`
  (`canonical`, `og:url`, `og:image`) with the production domain.
- **Check link previews** of the deployed page (opengraph.xyz, Facebook Sharing Debugger).

## Testing gaps

- **iOS Safari / WebKit was not tested.** Check on a real iPhone: mobile menu (open, close, anchor
  navigation, focus), fixed header with the notch (`env(safe-area-inset-top)`), contact form
  validation and autofill, reveal-on-scroll animation.

## Deferred (decided to keep as is for now)

- **Heavy blur effects**: full-screen `body::before` with `blur(200px)`, `.bg-color-*` glows and
  many `backdrop-blur-*` utilities. Measure scrolling performance on low-end phones
  (Chrome DevTools → Performance, CPU throttling) before optimizing.

## Assets

- **Favicon / apple-touch-icon** are generated from `assets/logo.png` (96px), so the 180px
  apple-touch-icon is slightly soft. Regenerate from a vector (SVG) or ≥512px logo when available;
  an SVG logo would also allow `<link rel="icon" type="image/svg+xml">`.
- **OG image** (`assets/og-image.jpg`) uses Noto Sans instead of the site font Inter.
  Replace with a designed image if needed (1200×630, keep `og:image:width/height` in sync).

## Code and content

- The "About" section heading is commented out in `index.html`: restore or remove it.
- Product card `data-delay` values are irregular (80, 0, 40, 120, 80, 120 ms); consider a
  consistent stagger like the info cards (0, 80, 160 ms).
- Structural markup is duplicated (desktop + mobile navigation, contacts and social links in Hero
  and Contacts). When moving to a CMS, turn these into shared partials/templates.
- `docs/ADAPTIVE_PLAN.md` is written in Russian, unlike the rest of the docs.
