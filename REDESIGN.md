# Violet Media Web Design — September 2026 rebuild

## Run

Node 24 is required. Install with `npm ci`, then `npm run build`, `npm test`, and `npm run preview`. Netlify builds the Astro source and publishes only `dist/`.

The original root HTML and image files remain as source history/assets, but are not published by the new build. `scripts/prepare-assets.mjs` makes two responsive WebP sizes from each of 17 newly generated photographs in `assets/photography-2026-09-28/` plus the two `assets/gym-*-2026-09-28/` revision folders. Original PNGs are retained locally in its ignored `originals/` subfolder. Responsive outputs are regenerated on every deployment. Prompts and the Perth and reference-led Australian gym corrections are documented in `PROMPTS.md` alongside the source WebPs.

## Routes

- `/`: web design studio and real enquiry form
- `/demos/bakery/`: Bella’s menu filters and sample cake enquiry
- `/demos/fitness/`: Apex timetable filters, memberships and sample trial journey
- `/demos/interiors/`: Noir & Co. portfolio and sample consultation
- `/demos/interiors/projects/*/`: three individual project stories
- `/privacy/`, `/thank-you/`, `/404.html`

The six former starter/standard/premium URLs redirect permanently to the new concept routes. Concepts are noindex and excluded from the public sitemap. All business names, schedules, descriptions and prices inside the concepts are fictional demonstration content; no invented testimonials or client outcomes are presented.

## Enquiries

The main form retains the established FormSubmit destination `info@violetmedia.org`. It uses provider verification, a honeypot and native required-field validation, with a dedicated return page. `?concept=bakery`, `fitness` or `interiors` carries the visitor’s chosen concept into the enquiry. Package buttons preselect the package.

Demo forms stay in the browser. They do not submit, store, charge, subscribe or book anything. They require no personal data.

Mailbox delivery is not established by a build or a browser form-validation test. Before using the site for paid acquisition, send a user-authorised real enquiry and confirm receipt and provider activation.

## Commercial scope

The Premium interiors concept now demonstrates a ten-second architectural hero film, alongside its three individual project stories and consultation flow. The homepage explicitly compares Standard (from AUD 1,500) and Premium (from AUD 3,000), with final motion, content and page scope agreed in the proposal.

The hero uses silent H.264 MP4s (1080p desktop: 6.70 MB; 720p mobile: 2.11 MB), copied from `assets/premium-motion-2026-09-28/` during the build. The original still remains the poster and no-JavaScript/error fallback. Reduced-motion and data-saving preferences suppress automatic video loading; the visitor can choose Play. Playback pauses offscreen and in background tabs, with an explicit Play/Pause control. No video soundtrack is shipped.

Existing starting prices remain AUD 800 / AUD 1,500 / AUD 3,000. No unsupported popularity/satisfaction or audience metrics are used. Hosting, CMS and paid integrations require a scoped proposal; no unlimited free hosting promise is made.

## Analytics

No analytics trackers were present in the old root HTML, and none have been added without a configured destination. Concept attribution is included in enquiries. Traffic, funnel conversion and paid-campaign reporting remain a separate setup step.

## Editing

The studio homepage hero is `src/components/StudioShowcase.astro`. It reuses the Premium film and shared playback controller, with lightweight CSS 3D depth controlled by `src/scripts/studio-showcase.js`. `3D-DIRECTION.md` distinguishes the shipped panel composition from proposed modelled 3D experiences and records the next prototype direction.

Homepage: `src/pages/index.astro`. Each demo has its own page and CSS section in `src/styles/demos.css`. Shared navigation, forms and filters are in `src/scripts/site.js`. Interior project data is in `src/data/interiors.js`.
