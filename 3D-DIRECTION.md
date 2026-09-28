# Violet Media — motion and 3D direction

## Shipped first step

The main studio hero now reuses the approved ten-second Perth film inside a layered portfolio composition. It has Play/Pause, a still fallback, reduced-motion/data-saving defaults, and offscreen/background pausing. No additional generation charge or video download variant was introduced.

The showcase uses actual CSS perspective and depth transforms on flat website panels, with restrained pointer response and an explicit touch/keyboard depth control. It is not a fully modelled WebGL scene or a 3D product configurator. Navigation remains ordinary accessible links; the page works without JavaScript.

## Recommended next prototype

Create a dedicated Violet Media brand scene: a sculpted violet emblem surrounded by three selectable website worlds. Keep the headline and enquiry action in ordinary HTML. Selecting a world reveals its design story and a link to the live concept. This gives the studio its own visual identity rather than relying entirely on client-concept imagery.

Build one scene first, with an approved visual reference and actual 3D assets. Test whether visitors understand and use it. Avoid a compulsory intro, scroll hijacking, or hiding contact/navigation inside a canvas. No new fixed price or package inclusion is promised until asset creation, interactions, and device support are scoped.

## Where 3D earns its place

- Product viewer: rotate a product, inspect details, compare finishes. Best first commercial demonstration because the interaction has a clear purpose.
- Architectural presentation: explore a room or selected viewpoints. Requires a real model or suitable panoramic capture; the existing interior film is not a navigable 3D space.
- Brand story: a small art-directed scene with meaningful interactive chapters. Appropriate for Violet Media's own premium positioning.

## Delivery requirements

Load a still first, then the scene on intent or when visible. Render on demand where possible, cap pixel density, pause when hidden, provide touch and keyboard controls and a non-3D alternative, and test lower-powered phones. Agree payload and frame-time budgets during the prototype and measure them on target hardware before promising production performance.

Reference: Three.js on-demand rendering, https://threejs.org/manual/pages/rendering-on-demand.html ; responsive rendering, https://threejs.org/manual/pages/responsive.html ; model-viewer deferred loading, https://modelviewer.dev/examples/lighthouse.html .
