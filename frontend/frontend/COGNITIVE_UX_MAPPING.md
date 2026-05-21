# 🧠 Cognitive Psychology & UX Mapping Guidelines

This document serves as a high-fidelity reference mapping how **OpenTrials** applies the **106 Growth.design Cognitive Biases & UX Principles** to drive optimal decision-making, minimal cognitive load, and premium developer/operator experiences.

---

## 🏆 Tier 1: Core Behavioral Architecture

### 1. Aesthetic-Usability Effect (Principle #29)
> *"People perceive designs with great aesthetics as easier to use."*
- **Application**: The entire OpenTrials platform leverages curated HSL theme values, sleek dark/light cobalt accentuation (`#1863dc`), and glassmorphism. Subtle glowing ambient background indicators and grid textures make the environment look like a premium tool (e.g. Linear/Vercel), establishing instant cognitive trust and perceived usability.

### 2. Hick's Law (Principle #1)
> *"More options leads to harder decisions."*
- **Application**: Streamlined the global navigation system ([Navbar.tsx](file:///Users/aryanlodha/Desktop/2026%20Projects/open-trials-platform/open-trials-platform/frontend/frontend/app/components/Navbar.tsx)) by purging low-value experimental links. Focused the main hero fold down to a single primary action button to direct focus without choice paralysis.

### 3. Spark Effect (Principle #26)
> *"Users are more likely to take action when the effort is small."*
- **Application**: The landing page primary CTA contains a low-commitment caption directly below: `*No sign-up or credit card required. Ingest your CSV instantly.*`. This lowers psychological friction to near-zero, inducing the user to engage.

### 4. Aha! Moment (Principle #47)
> *"When new users first realize the value of your product."*
- **Application**: Implemented the **"Load Demo Data"** action inside the workspace ([dashboard/page.tsx](file:///Users/aryanlodha/Desktop/2026%20Projects/open-trials-platform/open-trials-platform/frontend/frontend/app/dashboard/page.tsx#L203-L212)). Clicking this single, highlighted button instantly populates the dashboard with complex analytics graphs, active metrics, and fully-mapped cohort ledgers. The user experiences immediate, zero-friction product value.

### 5. Progressive Disclosure (Principle #7)
> *"Users are less overwhelmed if they're exposed to complex features later."*
- **Application**:
  - The **Analytics Portfolio** uses interactive tab selections (*Cohort Retention*, *Stream Throughput*, *Drift Anomaly*) so that developers only view one clinical model at a time, avoiding information overload.
  - The **Platform Pipeline** displays a step-by-step flowchart where step commentaries only update when the respective node is clicked.

---

## 💎 Tier 2: Visual Salience & Information Presentation

### 6. Von Restorff Effect / Contrast (Principles #12 & #19)
> *"People notice items that stand out more / higher visual weights."*
- **Application**: Used bright, high-contrast HSL cobalt blue exclusively for primary buttons and active state components. All secondary CTAs (like *Watch Tour* or *Ingest CSV*) inherit light boundaries, ensuring the primary button immediately wins the "squint test".

### 7. Feedback Loop & Feedforward (Principles #27 & #52)
> *"Feedback communicates what happened / knowing what to expect before taking action."*
- **Application**:
  - The **API Copy Snippet** button dynamically updates to a green checkmark and triggers a `"Copied!"` message upon click, delivering instant mechanical feedback.
  - Interactive nodes inside the platform pipeline show active flowing animations representing data drift reconciliation *before* a user decides to integrate programmatic APIs.

### 8. Miller's Law (Principle #36)
> *"Users can only keep 7±2 items in their working memory."*
- **Application**: Consolidated metrics display cards down to a maximum of 4 key numbers (Total Records, Retention, Throughput, Drift). Ledger tables isolate complex rows with generous monospaced badges, allowing rapid semantic scan without tax.

### 9. Social Proof (Principle #30)
> *"Users adapt their behaviors based on what others do."*
- **Application**: Positioned a sleek, low-opacity grayscale logo band immediately beneath the landing page dashboard mockup representing top clinical/biotech institutions (*Pfizer-L*, *Genomics*, *Roche*), building trust.

---

## ⚡ Tier 3: Memory, Time & Friction Optimizations

### 10. Discoverability (Principle #82)
> *"The ease with which users can discover your features."*
- **Application**: Designed a monospaced technical ledger on the Platform page and interactive language code tabs (cURL, NodeJS, Python) on the API page to make developer-facing protocols instantly discoverable.

### 11. Zeigarnik Effect (Principle #93)
> *"People remember incomplete tasks better than completed ones."*
- **Application**: The **Developer API explorer** lists three language integrations side-by-side. Unselected languages represent a light, clean interactive call, inviting developers to complete their exploration.

### 12. Labor Illusion (Principle #62)
> *"People value things more when they see the work behind them."*
- **Application**: The **Platform Pipeline** displays dynamic processing status highlights (e.g. *Computing statistical averages...*, *Parsing variables...*), showing developers the algorithmic heavy-lifting happening under the hood.

---

---

## 🎨 Tier 4: Essentials of User Interface Design Blueprint

This section maps the core graphic layout and visual design tenets outlined by **Arash Ahadzadeh** to the physical layout structure of the OpenTrials ecosystem.

### 13. Layout & Grid Spacing Consistency
- **Tenet**: *"Consistency plays a key role... once you set it, you need to use the same spacing patterns."*
- **Application**: Standardized all page content layout spacing and gutters. The dashboard metric cards, analytics tabs, ledger rows, and api sandbox sections use exactly matching spacing arrays (`gap-8` and padding boundaries), creating a harmonious flow.

### 14. Visual Hierarchy (Size, Color, Contrast, and Whitespace)
- **Tenet**: *"The visual specifications that a designer can utilize to influence understanding... Size, Color, Contrast, Whitespace."*
- **Application**:
  - **Size**: Title sizes use CSS `clamp()` templates (e.g. `text-[clamp(44px,6.5vw,92px)]`) to stand out relative to body copy.
  - **Color & Contrast**: High contrasting cobalt-blue highlights (`#1863dc`) are only placed on primary actions, while all secondary details inherit muted `#64748b` tones, preventing eye fatigue.
  - **Whitespace**: Generous breathing room (`py-4.5 px-6`) is given to each ledger record row in [ParticipantTable.tsx](file:///Users/aryanlodha/Desktop/2026%20Projects/open-trials-platform/open-trials-platform/frontend/frontend/app/components/ParticipantTable.tsx) to ensure elements draw focal attention naturally.

### 15. Elimination of Visual Noise
- **Tenet**: *"Eliminate all unnecessary elements... to design a screen which is user-friendly."*
- **Application**: Cleaned up the longitudinal [EnrollmentChart.tsx](file:///Users/aryanlodha/Desktop/2026%20Projects/open-trials-platform/open-trials-platform/frontend/frontend/app/components/EnrollmentChart.tsx) grids by converting dense black gridlines into extremely faint, low-opacity dashed lines (`strokeDasharray="3 3"` with `opacity={0.07}`), eliminating distracting visual clutter.

### 16. Iconography Consistency
- **Tenet**: *"Internal consistency: Use the same color scheme and styling attributes (outline vs. solid)."*
- **Application**: Styled all interactive actions (e.g. Ingest, Reconcile, Ingest Sandbox, Webhooks, API keys) exclusively using unified **outline-style Lucide icons** with matching stroke widths (`strokeWidth={2}`), eliminating mismatched outline/solid styling attributes.

### 17. Typography Baselines & Line Heights
- **Tenet**: *"Limit the number of typefaces... Start with two fonts at most. Line Height Formula: Font Size x 1.5 = Line Height."*
- **Application**: The project uses only **two typefaces**: *Outfit* (bold headers/brackets) and *Inter* (monospaced logs/technical details). Followed the typography formula rigorously; for instance, the hero subheader text (`text-[18px] md:text-[20px]`) has an explicit line height parameter (`leading-[1.8]`), ensuring exceptional readability.

### 18. UI Component Engineering
- **Tenet**: *"UI elements must present content in a consistent format: Cards, Tables, Charts, Steppers."*
- **Application**:
  - **Cards**: The main metric widgets are built as independent container modules that display content and key actions in isolation.
  - **Tables**: Built a borderless, stripe-style participant datagrid with specific, color-coordinated status pills (*Gender*, *Segment*, *Cohort*) that are easy to scan.
  - **Charts**: Encapsulated longitudinal Recharts area streams inside independent dashboard widgets, complete with glassmorphic tooltip widgets.
  - **Steppers**: Renders progress via horizontal pipeline flow steps (Ingest $\rightarrow$ Reconcile $\rightarrow$ Secure Ledger), guiding user focus during operational data processing.

---

*This comprehensive operational mapping ensures that every layout, button, and visual element inside OpenTrials is backed by rigorous cognitive psychology and graphic UI design guidelines, creating a best-in-class product experience.*
