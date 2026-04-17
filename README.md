# 🌊 Deep Sea Portfolio & Blog

**Security Researcher · Developer**

A high-end, interactive "Deep Sea" digital experience built with **Next.js**, **Three.js (React Three Fiber)**, and **GSAP**. This project transforms the traditional portfolio into a vertical dive through the ocean's depth zones.

> "Every post is a recovered transmission from the depths."

---

## 🌊 Design Philosophy: The Deep Sea Redesign

This site employs an interactive "dive" mechanic where scroll progress directly controls the atmospheric depth:

1.  **Depth zones (0m → 6000m+):** The background interpolates through five distinct zones (Surface, Sunlight, Twilight, Midnight, Abyss, Hadal) based on scroll depth.
2.  **Glass-Panel Layout:** Content is housed in translucent glass panels with hairline borders, maintaining legibility while allowing the 3D ocean scene to remain visible.
3.  **Bioluminescent UI:** Accents use a "bioluminescent" teal (`#2DD4BF`), creating a high-contrast, editorial feel against the deep ocean hues.
4.  **Recovered Transmissions:** Blog posts are treated as "transmissions," with metadata displayed in mono-fonts to evoke a log/transmission aesthetic.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **3D Engine:** Three.js / React Three Fiber
- **Animations:** GSAP (ScrollTrigger)
- **Styling:** Vanilla CSS (Modern CSS variables + Glassmorphism)
- **Typography:** 
    - **Display:** Playfair Display (Editorial headers)
    - **Body:** Inter (Clean, modern sans)
    - **Meta:** JetBrains Mono (Log/Technical feel)

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### Installation
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

### Build & Deploy
The project is configured for **Static Site Generation (SSG)** and automatically deploys via GitHub Actions.

```bash
# Generate static export
npm run build
```

## 📂 Project Structure

- `src/app`: Next.js App Router and page components.
- `src/components`: UI components including the `Experience` (3D scene).
- `src/lib`: Logic for blog parsing and constants.
- `public/assets`: 3D models (`boat.glb`), textures, and audio.
- `_legacy/`: Archive of the original Jekyll-based portfolio.

---

Designed with ⚓ by [whysocscs](https://github.com/whysocscs)
