# RashtraLink: Next-Generation Interactive & Viral Upgrades

Elevate RashtraLink from a static overview into a hands-on, viral experience with three high-impact additions: **Live Draggable Feed Priority Sliders** on the Homepage, an **Interactive Charcha Arena Consensus Voter**, and a **Downloadable Sovereign Founding Citizen Pass** upon Early Access registration.

## User Review & Critical Decisions

> [!IMPORTANT]
> Since the preference prompt was skipped, this plan adopts the recommended high-conversion defaults below. You can approve to build immediately or request adjustments.

- **Upgrade 1 (Recommended)**: **Live Homepage Feed Sliders** — Convert the static visual reality-check bars on the homepage into real, draggable range sliders that dynamically re-rank and filter live preview posts right on the landing page.
- **Upgrade 2 (Recommended)**: **Interactive Charcha Arena Consensus Voter** — Add a live national policy debate card in the Charcha Arena section where visitors can inspect primary citations (ISRO / PIB / RBI reports) and cast a live vote to watch consensus ratios update.
- **Upgrade 3 (Recommended)**: **Downloadable Founding Citizen Pass (Sovereign Navy & Gold Edition)** — Generate a personalized, high-resolution HTML5 Canvas digital passport card when users apply for Early Access, complete with their name, city, citizen serial ID, and 1-click PNG download for WhatsApp/Instagram/X sharing.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces remaining static mockups on the homepage with working interactive micro-simulations, and rewards Early Access applicants with a shareable sovereign identity badge.
- **Target Audience / Persona**: Citizens, creators, and tech enthusiasts visiting RashtraLink who want immediate proof of how user-controlled algorithms and evidence-backed debates work.
- **Key Value**: Drives organic word-of-mouth growth via downloadable Founding Citizen cards while proving functional product differentiation within 10 seconds of landing on the site.

---

## 2. User Experience & Visual Design

### A. Live Homepage Feed Priority Sliders
- **Interactive Controls**: Visitors drag 4 live sliders (*Science & ISRO*, *Startups & Economy*, *Culture & Heritage*, and *Toxic Outrage*).
- **Real-Time Feed Re-Ranking**: A live preview stack next to the sliders smoothly animates and re-orders sample dispatches based on the user's exact slider weights, muting clickbait when *Toxic Outrage* is dialed to `0%`.

### B. Interactive Charcha Arena Consensus Widget
- **Dual-Column Evidence Ledger**: Displays a flagship national topic (*"Should India mandate 100% on-soil sovereign hosting for AI & social data?"*) with verified supporting and counter-arguments linked to primary citations.
- **Live Consensus Bar**: Users click to endorse an evidence-backed stance and watch the mathematical consensus ratio and participant counter update with tactile feedback.

### C. Sovereign Founding Citizen Pass (Navy & Gold Passport Style)
- **Visual Identity**: Deep Sovereign Navy (`#001A33`) canvas with metallic gold borders, tricolor emblem header, tabular monospace citizen ID (`RL-CITIZEN-2026-XXXX`), applicant's name, city, role, and verification stamp.
- **Instant Export**: Rendered via high-DPI HTML5 Canvas (`scale: 2`) with a 1-click **"Download Citizen Pass (PNG)"** button and native mobile Web Share API support.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side HTML5 Canvas Rendering for Citizen Passes**
  - *Chosen Approach*: Generate the Founding Citizen Pass directly in the browser using the HTML5 2D Canvas API.
  - *Why*: Zero server latency, 100% privacy-preserving, crisp Retina resolution, and works offline without external image dependencies.
- **Decision 2: Zero-Latency Homepage Micro-Simulations**
  - *Chosen Approach*: Embed lightweight reactive state directly into the Homepage Reality Check and Charcha Arena sections rather than forcing users to navigate away to `/preview`.
  - *Why*: Lets casual visitors experience RashtraLink's core value proposition immediately on the main page.

---

## 4. Technical Architecture & Component Mapping

```
┌────────────────────────────────────────────────────────────────┐
│                     RashtraLink Client Runtime                 │
├────────────────────┬─────────────────────┬─────────────────────┤
│ Homepage Feed      │ Charcha Consensus   │ Founding Citizen    │
│ Sandbox            │ Live Voter          │ Pass Generator      │
│ - Range inputs     │ - Citation switcher │ - HTML5 2D Canvas   │
│ - Weight math      │ - Consensus bar     │ - Navy/Gold theme   │
│ - Animated post    │ - LocalStorage vote │ - PNG Blob export   │
│   re-ordering      │   persistence       │   & Web Share API   │
└────────────────────┴─────────────────────┴─────────────────────┘
```

### Interactive Component & State Mapping
1. **Homepage Feed Priority Controller**: Listens to `input` events on the 4 topic sliders, recalculates post relevance scores (`baseScore * topicWeight`), and animates the DOM order of preview cards.
2. **Charcha Consensus Controller**: Manages active tab selection (`All Citations`, `Supporting Proof`, `Counter-Evidence`), records user votes, and updates percentage bars with `tabular-nums` precision.
3. **Citizen Pass Canvas Engine**: Triggered upon Early Access form submission (and accessible via a "Preview Sample Pass" button), drawing the bespoke Navy & Gold pass and providing instant PNG download.
