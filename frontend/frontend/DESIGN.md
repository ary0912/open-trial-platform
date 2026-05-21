---

version: beta
name: Cohere Enterprise Intelligence System
description: >
A controlled enterprise AI interface system built around editorial restraint,
infrastructural calmness, precise typography, dark product environments,
restrained interaction design, and enterprise-grade information hierarchy.

philosophy:
core: - Calm interfaces create trust. - Whitespace is infrastructural clarity. - Motion exists to preserve continuity. - Visual restraint increases perceived intelligence. - Typography creates hierarchy more than color. - Surfaces should feel controlled, not decorative. - AI interfaces should feel reliable, not speculative.

emotional-tone: - intelligent - infrastructural - editorial - restrained - institutional - precise - cinematic-minimal

design-principles: - Use scale instead of heavy font weights. - Use color sparingly and intentionally. - Preserve large breathing intervals. - Prefer open layouts over excessive cards. - Use media as emotional emphasis. - Maintain low-noise interfaces. - Build hierarchy through rhythm and spacing. - Favor continuity over novelty.

colors:
primary: "#17171c"
cohere-black: "#000000"
ink: "#212121"
deep-green: "#003c33"
dark-navy: "#071829"

canvas: "#ffffff"
soft-stone: "#eeece7"
pale-green: "#edfce9"
pale-blue: "#f1f5ff"

hairline: "#d9d9dd"
border-light: "#e5e7eb"
card-border: "#f2f2f2"

muted: "#93939f"
slate: "#75758a"
body-muted: "#616161"

action-blue: "#1863dc"
focus-blue: "#4c6ee6"

coral: "#ff7759"
coral-soft: "#ffad9b"

form-focus: "#9b60aa"

success: "#0f9f67"
warning: "#d97706"
destructive: "#b30000"

on-primary: "#ffffff"
on-dark: "#ffffff"

color-rules:

- Coral is reserved for editorial taxonomy and warm emphasis.
- Blue is reserved for links, focus, and utility emphasis.
- Gradients must never be used as generic surface fills.
- Dark green and navy should occupy large intentional regions only.
- Most surfaces should remain white or mineral-neutral.
- Avoid mixing coral, navy, and blue in the same local composition.
- Use black sparingly to preserve contrast impact.

gradients:
allowed: - media-panels - hero-imagery - particle-fields - cinematic-product-bands

prohibited: - buttons - generic-card-backgrounds - dashboard-surfaces - form-fields

typography:
families:
display:
primary: "CohereText"
fallback: - "Space Grotesk" - "Inter" - "ui-sans-serif" - "system-ui"

    body:
      primary: "Unica77 Cohere Web"
      fallback:
        - "Inter"
        - "Arial"
        - "ui-sans-serif"
        - "system-ui"

    mono:
      primary: "CohereMono"
      fallback:
        - "IBM Plex Mono"
        - "ui-monospace"
        - "system-ui"

hero-display:
fontFamily: "CohereText"
fontSize: "clamp(56px, 8vw, 96px)"
fontWeight: 400
lineHeight: 1
letterSpacing: "-1.92px"

product-display:
fontFamily: "CohereText"
fontSize: "clamp(48px, 6vw, 72px)"
fontWeight: 400
lineHeight: 1
letterSpacing: "-1.44px"

section-display:
fontFamily: "Unica77 Cohere Web"
fontSize: "clamp(40px, 5vw, 60px)"
fontWeight: 400
lineHeight: 1
letterSpacing: "-1.2px"

section-heading:
fontFamily: "Unica77 Cohere Web"
fontSize: "clamp(32px, 4vw, 48px)"
fontWeight: 400
lineHeight: 1.2
letterSpacing: "-0.48px"

card-heading:
fontFamily: "Unica77 Cohere Web"
fontSize: "32px"
fontWeight: 400
lineHeight: 1.2
letterSpacing: "-0.32px"

feature-heading:
fontFamily: "Unica77 Cohere Web"
fontSize: "24px"
fontWeight: 400
lineHeight: 1.3

body-large:
fontFamily: "Unica77 Cohere Web"
fontSize: "18px"
fontWeight: 400
lineHeight: 1.4

body:
fontFamily: "Unica77 Cohere Web"
fontSize: "16px"
fontWeight: 400
lineHeight: 1.5

button:
fontFamily: "Unica77 Cohere Web"
fontSize: "14px"
fontWeight: 500
lineHeight: 1.7

caption:
fontFamily: "Unica77 Cohere Web"
fontSize: "14px"
fontWeight: 400
lineHeight: 1.4

mono-label:
fontFamily: "CohereMono"
fontSize: "14px"
fontWeight: 400
lineHeight: 1.4
letterSpacing: "0.28px"
textTransform: uppercase

micro:
fontFamily: "Unica77 Cohere Web"
fontSize: "12px"
fontWeight: 400
lineHeight: 1.4

typography-principles:

- Use massive type sparingly.
- Preserve tight tracking on display headlines.
- Avoid bold typography for hierarchy.
- Use mono labels for technical context.
- Maintain calm typographic rhythm.
- Typography should feel carved, not decorative.

spacing:
0: 0px
2: 2px
4: 4px
8: 8px
12: 12px
16: 16px
24: 24px
32: 32px
48: 48px
64: 64px
80: 80px
120: 120px

layout:
container:
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
xxl: 1440px

content-width:
reading: 720px
editorial: 860px
dashboard: 1440px

grid:
columns: 12
gutter: 24px

whitespace-philosophy: - Whitespace communicates institutional confidence. - Empty intervals separate meaning layers. - Dense content should exist only where necessary. - Breathing room improves cognitive parsing.

radius:
xs: 4px
sm: 8px
md: 16px
lg: 22px
xl: 30px
pill: 32px
full: 9999px

elevation:
flat:
shadow: none

subtle:
shadow: "0 1px 2px rgba(0,0,0,0.04)"

elevated:
shadow: "0 8px 24px rgba(0,0,0,0.08)"

cinematic:
shadow: "0 24px 60px rgba(0,0,0,0.16)"

elevation-rules:

- Prefer tonal separation over shadows.
- Use shadows only when interaction requires lift.
- Most enterprise surfaces should remain visually flat.
- Media contrast creates depth more effectively than shadows.

motion:
philosophy: - Motion should preserve continuity. - Motion should never feel playful. - Animation exists to support cognition. - Movement should feel infrastructural and calm.

duration:
instant: 100ms
fast: 160ms
standard: 240ms
slow: 400ms

easing:
productive: "cubic-bezier(0.2, 0, 0, 1)"
expressive: "cubic-bezier(0.22, 1, 0.36, 1)"

transitions:
fade-enter:
opacity:
from: 0
to: 1
duration: 240ms

    hover-lift:
      translateY:
        from: 0px
        to: -2px
      duration: 160ms

    modal-enter:
      scale:
        from: 0.98
        to: 1
      opacity:
        from: 0
        to: 1
      duration: 240ms

interaction-principles:

- Interfaces should respond immediately.
- Hover states should feel informative.
- Motion should reveal hierarchy progressively.
- State transitions should feel spatially continuous.
- Feedback should feel subtle but unmistakable.
- Avoid decorative interaction patterns.

states:
hover:
opacity: 0.96

active:
scale: 0.98

disabled:
opacity: 0.45
pointerEvents: none

loading:
cursor: progress

focus-visible:
ring:
color: "{colors.focus-blue}"
width: 2px

accessibility:
minimum-touch-target: 44px

focus-ring:
color: "{colors.focus-blue}"
width: 2px

reduced-motion:
disable-parallax: true
reduce-transition-duration: true

contrast:
minimum: "WCAG AA"

keyboard-navigation:
enabled: true

semantic-html:
required: true

z-index:
base: 0
dropdown: 100
sticky: 200
overlay: 400
modal: 500
toast: 700

blur:
nav: 20px
overlay: 24px

icons:
style: geometric-minimal
stroke-width: 1.5px
corner-style: soft
optical-alignment: centered

sizes:
sm: 16px
md: 20px
lg: 24px
xl: 32px

data-visualization:
principles: - Prefer monochrome charts with one accent color. - Use subtle gridlines only when necessary. - Avoid chart borders. - Prioritize readability over novelty. - Motion should communicate data updates only.

charts:
background: transparent
axis-color: "{colors.slate}"
gridline-color: "{colors.border-light}"
accent: "{colors.action-blue}"

components:
button-primary:
backgroundColor: "{colors.primary}"
textColor: "{colors.on-primary}"
typography: "{typography.button}"
radius: "{radius.pill}"
padding: "12px 24px"
interaction:
hover-lift: true

button-secondary:
backgroundColor: transparent
textColor: "{colors.ink}"
typography: "{typography.body}"
textDecoration: underline

button-pill-outline:
backgroundColor: transparent
border: "1px solid {colors.hairline}"
radius: "{radius.xl}"

announcement-bar:
height: 36px
backgroundColor: "{colors.cohere-black}"

hero-photo-card:
radius: "{radius.lg}"
overflow: hidden

agent-console-card:
backgroundColor: "{colors.primary}"
radius: "{radius.sm}"
padding: 24px

trust-logo-strip:
alignment: centered
spacing: expansive

capability-card:
backgroundColor: "{colors.canvas}"
radius: "{radius.xs}"
padding: 24px

dark-feature-band:
backgroundColor: "{colors.deep-green}"
padding: 80px

product-card:
backgroundColor: "{colors.soft-stone}"
radius: "{radius.sm}"
padding: 32px

data-table:
borderColor: "{colors.hairline}"
rowSpacing: 32px

contact-form-card:
backgroundColor: "{colors.canvas}"
radius: "{radius.lg}"
padding: 32px

content-tone:
voice: - calm - precise - infrastructural - intelligent - editorial

avoid: - hype language - exaggerated futurism - excessive marketing tone - emotional manipulation

responsive:
breakpoints:
sm: 425px
md: 640px
lg: 768px
xl: 1024px
xxl: 1440px

behavior: - Hero layouts stack vertically on mobile. - Forms collapse into single-column flows. - Data tables preserve hierarchy through stacked metadata. - Navigation condenses progressively.

governance:
prohibited: - excessive gradients - decorative shadows - over-rounded cards - rainbow accent usage - playful motion systems - inconsistent spacing scales

required: - restrained color usage - consistent typographic rhythm - calm interaction design - editorial whitespace - semantic component naming

engineering:
css-architecture: - token-first - utility-compatible - semantic-layer-ready

preferred-stack: - React - Next.js - Tailwind CSS - Framer Motion

implementation-principles: - Prefer composable primitives. - Avoid deeply nested component trees. - Keep tokens centralized. - Separate semantics from styling.

final-principle:

>

    The interface should feel less like software
    and more like a controlled intelligence environment.
