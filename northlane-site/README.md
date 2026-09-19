# Northlane Consulting — 5-page business website

Plain HTML/CSS/JS. No build step, no dependencies to install — just static files.

## Files
- `index.html`, `about.html`, `services.html`, `work.html`, `contact.html` — the 5 pages
- `styles.css` — shared design system (tokens, layout, components)
- `script.js` — mobile nav, scroll reveal, 3D tilt-on-hover card, contact form validation
- `_headers` — security headers for Netlify (Vercel/GitHub Pages ignore this file harmlessly)

## Deploy in 5 minutes

**Netlify (drag-and-drop, fastest):**
1. Go to app.netlify.com → "Add new site" → "Deploy manually"
2. Drag this whole folder into the upload box → you get a live URL immediately

**GitHub Pages:**
1. Create a new repo, push these files to the `main` branch
2. Repo → Settings → Pages → Source: `main` branch, `/root` → Save
3. Your site is live at `https://<username>.github.io/<repo>/` in ~1 minute

**Vercel:**
1. `npm i -g vercel` (or use the Vercel dashboard "Add New Project")
2. From this folder run `vercel --prod`, or import the GitHub repo in the dashboard

## Before you submit
- [ ] Run Lighthouse (Chrome DevTools → Lighthouse tab) on the deployed URL, screenshot the scores
- [ ] Take screenshots of each page at desktop (1440px) and mobile (390px) widths
- [ ] Record a 2–3 min screen walkthrough (nav, hover tilt on homepage, contact form submit)
- [ ] Push to GitHub with a clean commit history

## Design decisions (write-up)
Northlane is positioned as an operations-and-growth consultancy, so the design leans editorial and evidence-led rather than glossy: an ink/paper palette with a single rust accent, a serif (Fraunces) for headlines paired with Inter for body text, and hairline-ruled grids that read like a report rather than a marketing brochure. The homepage opens with a tilt-responsive 3D stat card instead of a stock hero image, since credibility-by-numbers fits the brand better than illustration. Motion is deliberately restrained to one scroll-reveal pass and the hover tilt, per the brief's own guidance against scattering effects everywhere. All five pages share one header/footer and one CSS file for consistency, and the layout is mobile-first with a slide-down nav below 820px. Given more time, I'd add real photography, wire the contact form to an actual email service (e.g. Formspree or a serverless function), and build out individual case-study pages instead of one combined page.

## Security notes
This is a static site with no backend and no database, so there's no server-side attack surface (no SQL injection, no auth to breach). What's included:
- Contact form validates input client-side and never executes user input as HTML
- `_headers` sets CSP, clickjacking (X-Frame-Options), and MIME-sniffing protections for Netlify hosting
- No inline event handlers or `eval`; all JS is in `script.js`
- If you later wire the form to a real backend, validate and sanitize server-side too — client-side checks are UX only, not security
