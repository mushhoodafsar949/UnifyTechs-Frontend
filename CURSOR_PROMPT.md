# 🏥 CURSOR PROMPT — UnifyTechs Healthcare Software House Website
## React JS Single-Page Application with Scroll-Spy Navbar

---

## 🎯 PROJECT OVERVIEW

Build a **stunning, production-ready single-page React JS website** for **UnifyTechs** — a premium software house whose core niche is the **Healthcare sector**, specifically delivering an **AI-powered automation solution for medical claim reimbursement forms**. The website must feel like it belongs to a world-class tech company — not a generic template. Every pixel, animation, and interaction should radiate trust, intelligence, and innovation.

---

## 🛠️ TECH STACK & DEPENDENCIES

```bash
# Create the project
npx create-react-app unifytechs --template cra-template
cd unifytechs

# Install required packages
npm install framer-motion          # smooth animations & scroll-driven effects
npm install react-scroll           # smooth scroll to sections
npm install react-intersection-observer  # detect when sections enter viewport
npm install react-countup          # animated number counters
npm install react-type-animation   # typewriter text effect
npm install lucide-react           # clean icon set
npm install @headlessui/react      # accessible UI primitives
npm install clsx                   # conditional classNames
```

---

## 🎨 DESIGN PHILOSOPHY & VISUAL LANGUAGE

The design must feel **premium, clinical, and futuristic** — inspired by the intersection of healthcare trust and Silicon Valley innovation. Think: Apple meets a next-gen hospital management system.

### Color Palette
```css
/* Define these as CSS custom properties in index.css */
:root {
  --clr-primary:       #0A6EBD;   /* deep medical blue — trust & authority */
  --clr-primary-light: #3B9EE8;   /* lighter blue for hover states */
  --clr-accent:        #00C9A7;   /* teal/mint — innovation, health, clarity */
  --clr-accent-warm:   #FF6B6B;   /* soft coral — human warmth, alerts */
  --clr-bg-dark:       #060D1F;   /* near-black navy for hero/dark sections */
  --clr-bg-mid:        #0D1B3E;   /* mid-dark navy for alternating sections */
  --clr-bg-light:      #F4F8FF;   /* off-white blue-tinted light sections */
  --clr-surface:       #111E40;   /* card/panel backgrounds on dark sections */
  --clr-border:        rgba(59,158,232,0.15); /* subtle glowing borders */
  --clr-text-primary:  #FFFFFF;
  --clr-text-muted:    #94A3B8;
  --clr-text-dark:     #1E293B;   /* dark text for light sections */
  --clr-glow:          rgba(0,201,167,0.25); /* teal glow for accents */
}
```

### Typography
Use **Google Fonts** — import in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- **Headings**: `Space Grotesk` — geometric, modern, technical authority
- **Body**: `Plus Jakarta Sans` — warm, highly legible, professional
- **Monospace accents** (for tech labels, tags): `font-family: 'Courier New', monospace`

### Global Styles in `index.css`
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Plus Jakarta Sans', sans-serif;
  background: var(--clr-bg-dark);
  color: var(--clr-text-primary);
  overflow-x: hidden;
}
h1, h2, h3, h4 { font-family: 'Space Grotesk', sans-serif; }

/* Reusable section padding */
.section-pad { padding: 100px 0; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
```

---

## 🧭 NAVBAR — SCROLL-SPY BEHAVIOR (CRITICAL FEATURE)

The navbar is **fixed at the top** and must use **IntersectionObserver** (via `react-intersection-observer`) to detect which section is currently in the viewport. The corresponding nav link must automatically receive an `active` class that triggers a visual indicator.

### Implementation Architecture

Create `src/hooks/useScrollSpy.js`:
```javascript
// Custom hook: watches multiple section refs and returns which is active
import { useState, useEffect } from 'react';

export function useScrollSpy(sectionIds, offset = 0) {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: `-${offset}px 0px -60% 0px`, // fires when section hits upper 40% of viewport
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sectionIds, offset]);

  return activeSection;
}
```

### Navbar Component (`src/components/Navbar.jsx`)

The navbar must:
1. Start **transparent** and transition to a **frosted-glass dark** background after scrolling 80px
2. Show the **UnifyTechs logo** on the left (text-based logo with icon)
3. Show nav links: **Home · About · Services · How It Works · Technology · Testimonials · Contact**
4. Highlight the **active section** with a glowing teal underline that slides between links (use CSS transition, not just color change)
5. Include a **"Get a Demo"** CTA button on the right (teal gradient, pill-shaped)
6. Collapse into a **hamburger menu** on mobile with a slide-down drawer

```jsx
// Navbar visual behavior
const navStyle = scrolled
  ? 'backdrop-blur-xl bg-[rgba(6,13,31,0.85)] border-b border-[var(--clr-border)] shadow-lg'
  : 'bg-transparent';

// Active link indicator: a small glowing teal dot + bottom border
// Use `clsx` to combine classes conditionally
const linkClass = (id) => clsx(
  'relative text-sm font-medium transition-colors duration-300 pb-1',
  activeSection === id
    ? 'text-[var(--clr-accent)]'
    : 'text-[var(--clr-text-muted)] hover:text-white'
);

// Animated underline via ::after pseudo-element that scales from 0→1 when active
```

---

## 📄 PAGE SECTIONS — COMPLETE BREAKDOWN

Each section must have a unique `id` matching the nav link. Each section alternates between dark (navy) and slightly lighter backgrounds. Add generous `padding: 100px 0` to all sections.

---

### SECTION 1: HERO — `id="home"`

**Full-viewport height hero.** This is the first impression — make it breathtaking.

**Layout**: Split 50/50 — left: text content; right: 3D-looking animated dashboard mockup

**Background**: 
- Base: `var(--clr-bg-dark)` navy
- Add an **animated mesh gradient** using CSS: radial gradients in teal and blue that slowly pulse/move using `@keyframes`
- Overlay: a subtle **dot grid pattern** (SVG background-image of a repeating dot)
- Add 3-4 **floating blurred orbs** (absolutely positioned divs with `blur(80px)` teal/blue glows that animate with `framer-motion` floating animation)

**Left Content**:
- Small pill/badge above headline: `[AI-POWERED]` tag in teal with a pulsing dot and text: `"Claim Automation Platform"`
- Main **H1** (large, bold, 64–72px): 
  ```
  Automate Your
  Healthcare Claims.
  Eliminate the Wait.
  ```
  Use `react-type-animation` to typewrite the word "Claims" cycling through: "Claims" → "Reimbursements" → "Approvals" → back
- Subheadline (18px, muted): `"UnifyTechs transforms complex reimbursement form workflows into intelligent, self-processing pipelines — reducing claim processing time by up to 87%."`
- Two CTA buttons side by side:
  - Primary: `"Request a Live Demo"` — teal gradient, arrow icon, pulse animation on hover
  - Secondary: `"Watch 2-min Video"` — outlined, with a play circle icon
- Below buttons: three small trust indicators in a row with icons: `✓ HIPAA Compliant  ·  ✓ HL7 FHIR Ready  ·  ✓ 99.9% Uptime SLA`

**Right Content — Animated Dashboard Mockup**:
Build this **entirely in JSX/CSS** (no images needed for the mockup):
- A dark card (`border: 1px solid var(--clr-border)`, `border-radius: 16px`, backdrop blur)
- Inside: a simulated claim processing interface with:
  - A header bar with three colored dots (like a browser window)
  - A title: `"Claim #RX-20482 — Processing"`
  - A green progress bar at 78% that animates on load using framer-motion
  - A list of 4 status steps with checkmarks:
    - ✅ Form Data Extracted
    - ✅ ICD-10 Codes Verified
    - ✅ Patient Eligibility Confirmed
    - ⏳ Reimbursement Submitted (pulsing spinner)
  - Bottom row: `"Estimated Time: 4.2 seconds"` vs `"Manual Process: ~3 days"`
- The entire card floats gently using `framer-motion`'s `animate={{ y: [0, -12, 0] }}` on infinite loop

**Hero Background Image from Pexels** (behind everything, very low opacity ~0.08):
Use this high-quality Pexels image (free to use):
```
https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg
```
(Doctor using a tablet in a modern hospital — set as CSS `background-image` with `opacity: 0.08`)

---

### SECTION 2: SOCIAL PROOF BAR (between Hero and About)

A **full-width dark strip** (no section padding, just 48px vertical padding) — not a full section but a trust band.

Content: `"Trusted by healthcare institutions across 12+ countries"`

Then a row of **6 placeholder hospital/insurance logos** made entirely with styled text in muted gray:
`MedCore Health · BlueCross Digital · HealthBridge Systems · CarePath Inc. · MediSync · Apex Insurance`

Each on hover: brightens to white. Add a subtle left-to-right CSS marquee animation for mobile.

Below logos: **4 animated stat counters** (use `react-countup` triggered when section enters viewport):
- `87%` — Reduction in Processing Time
- `2.4M+` — Claims Processed
- `99.9%` — Accuracy Rate
- `$12M+` — Savings Generated for Clients

---

### SECTION 3: ABOUT — `id="about"`

**Background**: `var(--clr-bg-light)` — light section for contrast

**Layout**: Two-column grid, image left, text right

**Left — Image**:
Use this Pexels image displayed in a creative container:
```
https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg
```
(Healthcare professional at computer)

Display it in a **asymmetric frame**: a rounded-corner image with a teal border accent strip on the left side, and a floating badge overlay in the bottom-right corner of the image that reads: `"Est. 2019 · 200+ Deployments"` in a dark pill.

**Right — Text Content**:
- Small eyebrow label: `WHO WE ARE` in teal uppercase spaced tracking
- Headline (40px, dark): `"Built by Healthcare Tech Veterans. Designed for Real-World Claims."`
- Two paragraphs of body text (dark gray, 17px line-height 1.8):
  - Para 1: Introduce UnifyTechs as a specialized software house that emerged from frustrations with legacy claim processing, founded by a team of health informatics engineers and former insurance operations specialists.
  - Para 2: Describe the mission — to eliminate the $262 billion annual waste in US healthcare administrative costs by making claim reimbursement intelligent, automated, and auditable.
- A 2×2 grid of **value pillars** with icons (use lucide-react):
  - `🔒 HIPAA & SOC2 Compliant`
  - `⚡ Sub-5 Second Processing`
  - `🧠 AI-Powered Form Intelligence`
  - `🔗 EHR & PMS Integrations`
- A link: `"Meet our founding team →"` (teal, underlined on hover)

---

### SECTION 4: SERVICES — `id="services"`

**Background**: `var(--clr-bg-dark)` (dark again)

**Header** (centered):
- Eyebrow: `WHAT WE BUILD`
- Headline: `"End-to-End Solutions for Healthcare Claim Automation"`
- Subtext: `"From intake to reimbursement — every step is covered."`

**Layout**: A **Bento-Grid** (CSS Grid with `grid-template-areas`) — 6 service cards in a 3-column grid with varying sizes. The first two cards are larger (span 2 rows). This creates an editorial, magazine-like feel.

**Service Cards** (each has: icon, title, description, a "Learn More →" link):

1. **Intelligent Form OCR & Extraction** (Large card) — Automatically reads and extracts data from CMS-1500, UB-04, and ADA dental claim forms using vision AI. Icon: `ScanLine`
2. **Real-Time Eligibility Verification** (Large card) — Pings payer databases in real-time to verify patient coverage before submission. Icon: `ShieldCheck`
3. **ICD-10 / CPT Code Validator** — Flags mismatches and upcoding issues before submission to prevent denials. Icon: `FileSearch`
4. **Automated Denial Management** — When claims are denied, AI generates appeal letters with appropriate supporting documentation. Icon: `RefreshCw`
5. **Payer API Integration Hub** — Pre-built connectors to 200+ insurance payers and clearinghouses. Icon: `Network`
6. **Analytics & Audit Dashboard** — Real-time tracking of claim status, denial rates, revenue leakage, and compliance metrics. Icon: `BarChart3`

**Card Styling**:
- Dark glass card: `background: var(--clr-surface)`, `border: 1px solid var(--clr-border)`, `border-radius: 20px`
- On hover: border color transitions to teal, a very subtle teal glow appears with `box-shadow`
- Icon sits inside a teal-tinted rounded square (`background: rgba(0,201,167,0.1)`)
- Cards animate in staggered from bottom using `framer-motion` `variants` + `staggerChildren`

---

### SECTION 5: HOW IT WORKS — `id="how-it-works"`

**Background**: A **gradient dark section** — `background: linear-gradient(180deg, var(--clr-bg-dark) 0%, var(--clr-bg-mid) 100%)`

**Header** (centered):
- Eyebrow: `THE PROCESS`
- Headline: `"From Paper Chaos to Paid Claims in Seconds"`

**Layout**: A **horizontal timeline** on desktop, **vertical stepper** on mobile.

The timeline shows 5 steps connected by a dashed line (SVG or CSS border-dashed) with a teal dot at each node. Each step has:
- A step number in a teal circle
- An icon above the number
- A bold title
- A short 2-line description

**Steps**:
1. **Ingest** — Claim forms arrive via upload, fax-to-digital, or EHR export. `Icon: Upload`
2. **Extract** — AI reads every field, handwriting recognized, codes validated. `Icon: Brain`
3. **Verify** — Eligibility, deductibles, and prior authorizations confirmed in real-time. `Icon: CheckCircle`
4. **Submit** — Clean claim routed to the correct payer via EDI 837 or API. `Icon: Send`
5. **Reimburse** — Payment tracked, ERA matched, and reconciled automatically. `Icon: DollarSign`

Below the timeline, add a **"Before vs. After" comparison** in two side-by-side cards:
- **Before UnifyTechs** (red-tinted card): Manual data entry · 3–5 day processing · 24% denial rate · Full-time billing staff
- **After UnifyTechs** (teal-tinted card): Automated extraction · Sub-5 second processing · 3.1% denial rate · Staff focused on exceptions only

---

### SECTION 6: TECHNOLOGY — `id="technology"`

**Background**: `var(--clr-bg-light)` (light section)

**Header** (centered, dark text):
- Eyebrow: `UNDER THE HOOD`
- Headline: `"Built on a Foundation of Clinical Intelligence"`

**Left column** (text):
- Describe the tech stack philosophy: HIPAA-compliant cloud infrastructure, FHIR R4-ready APIs, multi-tenant architecture, zero-trust security model
- Add a code-style snippet block (styled like a terminal/IDE) showing a sample API call:
```javascript
// Submit a claim via UnifyTechs API
const response = await unifytechs.submit({
  claimType: 'CMS-1500',
  patientId: 'PT-48291',
  providerId: 'NPI-1234567890',
  diagnoses: ['Z00.00', 'J06.9'],
  autoVerify: true,
  notifyOnDenial: true
});
// Response: { claimId: 'CE-928471', status: 'SUBMITTED', eta: '4.2s' }
```
Style this block with a dark background, syntax highlighting using colored spans (strings in teal, keywords in blue, comments in gray).

**Right column** — A **tech stack visual grid**:
Pill/badge-style tags arranged in a flowing layout, each with a small icon or emoji:
`🧠 Custom NLP Models` · `☁️ AWS GovCloud` · `🔐 AES-256 Encryption` · `📋 HL7 FHIR R4` · `🔗 X12 EDI 837/835` · `📊 Real-time Kafka Streams` · `🐳 Kubernetes Orchestration` · `🤖 GPT-4 Vision OCR` · `🔁 Webhook Event Bus` · `📱 REST & GraphQL APIs`

Each tag: `background: white`, `border: 1px solid #E2E8F0`, rounded-full, small font, subtle shadow. On hover: border turns teal.

**Pexels Image** — Use as a background with overlay for this section or as an accent:
```
https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg
```
(Modern healthcare data/tech visual)

---

### SECTION 7: TESTIMONIALS — `id="testimonials"`

**Background**: `var(--clr-bg-dark)`

**Header** (centered):
- Eyebrow: `CLIENT VOICES`
- Headline: `"Heard from the Billing Departments That Got Their Lives Back"`

**Layout**: An **auto-sliding carousel** (build custom with framer-motion, no carousel library needed). 3 testimonials visible on desktop, 1 on mobile. Auto-advances every 5 seconds. Manual dots indicator at the bottom.

**Testimonial Cards** (glassmorphism style):
- `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(12px)`, `border: 1px solid var(--clr-border)`, `border-radius: 20px`, `padding: 40px`
- Large opening quote mark `"` in teal (4rem, font-weight 900, opacity 0.4)
- Quote text in white, 18px, line-height 1.7
- Bottom: avatar (colored initials circle), name, title, and a 5-star rating in teal

**3 Testimonials**:
1. *"Before UnifyTechs, our billing team spent 60% of their time on data entry alone. Now they focus exclusively on exception handling. Our denial rate dropped from 28% to just 2.9%."* — **Dr. Sarah K.**, Revenue Cycle Director, MedCore Health Group
2. *"The ICD-10 validator alone saved us from $1.4M in potential audit exposure last year. This platform is not a luxury — it's essential infrastructure."* — **James W.**, CFO, BlueCross Digital Partners
3. *"Integration with our existing EHR took less than a week. The API documentation is exceptional and the support team treats you like a partner, not a ticket."* — **Priya M.**, Health IT Lead, CarePath Systems

**Below carousel**: A single row of 3 **case study preview cards**:
`"MedCore: 87% Faster Claims"` · `"BlueCross: $1.4M Saved"` · `"CarePath: 14-day ROI"`
Each with a teal arrow link: `"Read Case Study →"`

---

### SECTION 8: CONTACT / CTA — `id="contact"`

**Background**: A **dramatic dark gradient** — `background: linear-gradient(135deg, #060D1F 0%, #0A6EBD 50%, #00C9A7 100%)` at very low saturation, overlaid with a dark tint. Alternatively: a full-bleed Pexels background image with dark overlay:
```
https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg
```
(Hands typing on keyboard in a modern office — suggests action/technology)

**Two columns**:

**Left — CTA Text**:
- Large headline (52px white): `"Ready to Eliminate Claim Denials?"`
- Subtext: `"Book a personalized 30-minute demo. See how UnifyTechs processes your specific claim types, payers, and workflows — live."`
- Three bullet points with checkmarks:
  - ✓ No credit card required
  - ✓ White-glove onboarding
  - ✓ ROI guaranteed or money back

**Right — Contact Form** (glassmorphism card):
A floating form card with:
- `First Name` + `Last Name` (2 columns)
- `Work Email`
- `Organization Name`
- `Monthly Claim Volume` (dropdown: `<500` / `500–5K` / `5K–50K` / `50K+`)
- `What's your biggest challenge?` (textarea)
- Submit button: `"Book My Free Demo →"` — full-width, teal gradient, bold

Form fields styling: `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.12)`, rounded-lg, white text, white placeholder at 50% opacity. On focus: teal border glow.

Add a note below the form: `"🔒 Your data is encrypted and never shared. HIPAA-compliant inquiry form."`

---

### FOOTER

**Background**: `#030913` (near-black, slightly darker than hero)

**4-column grid**:
1. **Brand column**: UnifyTechs logo + tagline: `"Intelligent Claims. Zero Friction."` + social icons (Twitter, LinkedIn, GitHub)
2. **Solutions**: List of 5 service links
3. **Company**: About, Careers, Blog, Press, Partners
4. **Legal & Compliance**: Privacy Policy, Terms, HIPAA Notice, SOC2 Report, Cookie Settings

**Bottom bar**: `© 2025 UnifyTechs Technologies Inc. · All rights reserved · Built for Healthcare, by Healthcare.`

A subtle **teal line** (1px, 20% opacity) separates footer top from bottom bar.

---

## ⚡ ANIMATIONS & INTERACTIONS

Implement these animations using **framer-motion**:

1. **Section reveal**: Every section's content fades in and slides up 30px when it enters the viewport. Use `useInView` + `motion.div` with `initial={{ opacity: 0, y: 30 }}` and `whileInView={{ opacity: 1, y: 0 }}`.

2. **Staggered children**: Service cards, timeline steps, and testimonials animate in sequence with a 0.1s delay between each child.

3. **Hero orbs**: 3 absolutely-positioned blurred circles float continuously:
```javascript
animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
```

4. **Navbar link indicator**: The active nav link shows a `motion.span` underline that `layoutId="nav-underline"` — so it smoothly slides between links as sections change.

5. **Stats counters**: `react-countup` with `enableScrollSpy` prop for auto-triggering.

6. **Dashboard card hover**: Service cards scale to `1.02` on hover with a slight `y: -4` lift.

7. **CTA button pulse**: The "Request Demo" button has a subtle `box-shadow` pulse animation (`@keyframes pulse-glow`).

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile first approach */
/* sm: 640px, md: 768px, lg: 1024px, xl: 1280px */
```

- **Mobile**: Single column everything. Hamburger nav with slide-down drawer. Hero image hidden. Horizontal timeline becomes vertical.
- **Tablet**: 2-column grid for About and Services. Testimonials show 2.
- **Desktop**: Full multi-column layouts as described above.

Use CSS Grid and Flexbox throughout. Avoid any CSS frameworks — pure CSS-in-JS or CSS Modules.

---

## 📁 FILE STRUCTURE

```
src/
├── App.jsx                  # Main app, imports all sections
├── index.css                # Global CSS variables and resets
├── hooks/
│   └── useScrollSpy.js      # Custom scroll-spy hook
├── components/
│   ├── Navbar.jsx           # Fixed top nav with scroll-spy active states
│   └── Footer.jsx           # Footer component
├── sections/
│   ├── Hero.jsx
│   ├── SocialProof.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── HowItWorks.jsx
│   ├── Technology.jsx
│   ├── Testimonials.jsx
│   └── Contact.jsx
└── assets/
    └── (no local images — all images via Pexels CDN URLs)
```

In `App.jsx`:
```jsx
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import SocialProof from './sections/SocialProof';
import About from './sections/About';
import Services from './sections/Services';
import HowItWorks from './sections/HowItWorks';
import Technology from './sections/Technology';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <About />
        <Services />
        <HowItWorks />
        <Technology />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

---

## 🖼️ PEXELS IMAGE URLS (Free, High-Quality, No Attribution Required)

Use these specific URLs. Append `?auto=compress&cs=tinysrgb&w=1200` to each for optimized loading:

```javascript
const IMAGES = {
  heroBg: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg',
  // Hero background: doctor with tablet in modern hospital
  
  aboutTeam: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg',
  // About: healthcare professional at computer workstation
  
  techBg: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg',
  // Technology: modern healthcare data visual
  
  contactBg: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
  // Contact: hands on keyboard, office setting
  
  teamMember1: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg',
  // Doctor headshot for testimonials
  
  teamMember2: 'https://images.pexels.com/photos/6129507/pexels-photo-6129507.jpeg',
  // Professional headshot
};
```

All images must use:
```jsx
<img
  src={`${url}?auto=compress&cs=tinysrgb&w=1200`}
  alt="descriptive alt text"
  loading="lazy"
/>
```

---

## ✅ QUALITY CHECKLIST FOR CURSOR

Before considering the build complete, verify:

- [ ] Navbar `active` class updates correctly as user scrolls through each section
- [ ] Navbar transitions from transparent to frosted glass after 80px scroll
- [ ] Hamburger menu works on mobile and closes when a link is tapped
- [ ] All framer-motion animations play once per viewport entry (not on every scroll)
- [ ] Stats counters animate when the SocialProof section enters viewport
- [ ] Typewriter animation cycles correctly in the Hero H1
- [ ] Hero dashboard mockup floats smoothly in infinite loop
- [ ] Bento grid services layout renders correctly without breaking on tablet
- [ ] Contact form inputs have visible focus states with teal glow
- [ ] All Pexels images load with lazy loading and correct alt text
- [ ] No horizontal scrollbar on any viewport size
- [ ] Footer links are organized in 4 columns on desktop, 2 on tablet, 1 on mobile
- [ ] Page loads under 3 seconds (images optimized via Pexels CDN params)
- [ ] All color contrast ratios meet WCAG AA (especially text on dark backgrounds)
- [ ] Smooth scroll works when clicking nav links

---

## 💡 FINAL NOTES FOR CURSOR

- **Do not use Tailwind CSS** — write all styles using CSS custom properties and CSS-in-JS (or CSS Modules if preferred). This keeps the design fully customized and not "template-looking."
- **Do not use any UI kit** (MUI, Chakra, etc.) — build all components from scratch.
- The dashboard mockup in the Hero **must be built in JSX**, not an image.
- The testimonial slider must be **hand-coded with framer-motion** — no Swiper or Slick.
- Keep the **component hierarchy clean** — no prop drilling beyond 2 levels. Use local state per section.
- Every section must have its `id` attribute matching the nav links exactly.
- Add `aria-label` attributes to all interactive elements for accessibility.
- The overall design should feel like it cost **$50,000+ to build** — not a free template.
