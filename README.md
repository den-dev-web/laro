# Laro

Laro is a static personal landing page project designed as a clean, responsive “business card” website with interactive UI elements and modern styling.

🔗 Live demo: https://den-dev-web.github.io/laro/

---

## 📌 About the Project

Laro is a lightweight frontend project built as a personal or brand presentation page.  
The goal of the project is to demonstrate **clean layout composition, responsive design, and interactive UI behavior** using only native web technologies and utility-first styling.

---

## ⚙️ Tech Stack

- **HTML5** — semantic markup and page structure  
- **Tailwind CSS v4** — utility-first styling and design tokens  
- **JavaScript (Vanilla)** — interactive behavior without frameworks  
- **PostCSS + @tailwindcss/postcss** — CSS build into `dist/styles.css` (minified for production)
- **GitHub Actions** — builds CSS and deploys to GitHub Pages on push to `main`

---

## 🧩 Development Approach

- Semantic HTML and accessibility considerations:
  - ARIA attributes where appropriate
  - alternative text for images
  - visible focus states and sufficient color contrast
- Mobile-first responsive design:
  - flexible layouts using Flexbox and Grid
  - media queries for larger screens
- Styling strategy:
  - utility-first approach with Tailwind CSS
  - consistent spacing, colors, and typography via design tokens
- Clear separation of concerns:
  - HTML — structure
  - CSS — presentation
  - JavaScript — behavior

---

## ✨ Key Features

- Responsive layout optimized for mobile and desktop
- Interactive UI elements and animations
- Forms and basic client-side interactions
- Reusable layout blocks and components
- Clean visual hierarchy suitable for a personal or brand page

## 🧪 Local Usage

The page is static, but the CSS must be built first: `index.html` loads `dist/styles.css`, which is not stored in the repository.

```bash
npm ci                # install dependencies
npm run build:css     # production build (minified) → dist/styles.css
npm run dev           # or: watch mode with source maps while editing
```

Then serve the folder with any static server and open http://localhost:8000:

```bash
python3 -m http.server 8000
```

Images are served via `<picture>` as AVIF → WebP → original PNG/JPG fallback, so all three formats in `assets/` must be kept.

---

## 🎯 What This Project Demonstrates

- Ability to build clean, responsive landing pages without frameworks
- Practical use of Tailwind CSS in a real project
- Attention to accessibility and UI details
- Structured and readable frontend code
- Understanding of static deployment constraints

---

## 🚀 Possible Improvements

- Enhanced form validation and feedback states
- Content customization via configuration file
- Animations based on scroll interactions

