# Deep Sea Portfolio & Blog (Next.js Overhaul)

This project is a complete overhaul of the previous Jekyll-based portfolio, transformed into a high-end interactive "Deep Sea" experience using **Next.js**, **Three.js (React Three Fiber)**, and **GSAP**.

## 🌊 Worldview Concept
- **Intro:** A serene beach scene with a 3D boat and ambient wave sounds.
- **Scroll Journey:** As you scroll, the background color interpolates from sand to shallow water, teal, mid-sea, and finally the deep ocean.
- **Continuous Experience:** Background audio and 3D canvas persist across page transitions (e.g., from Home to Blog).

## 🛠 Tech Stack
- **Framework:** Next.js (App Router)
- **3D Engine:** Three.js via `@react-three/fiber` and `@react-three/drei`
- **Animation:** GSAP (ScrollTrigger)
- **Styling:** Vanilla CSS & CSS Modules (Following the provided style guide)
- **Blog:** Markdown-based engine migrating legacy `_posts` from the `_legacy` folder.

## 🚀 How to Complete the Assets
The code is set up with placeholders. To fully realize the vision, place your assets in the following locations:

- **3D Models:**
  - `public/assets/media/models/boat.glb` (Stylized boat model)
  - `public/assets/media/models/bubbles.glb` (Bubble particle system or model)
- **Audio:**
  - `public/assets/media/audio/waves.mp3` (Shallow water/beach sounds)
  - `public/assets/media/audio/deep_ambient.mp3` (Deep sea ambient sounds)
- **Textures:**
  - `public/assets/media/textures/` (Any additional textures for the ocean/sand)

## 📦 Deployment
The project is configured for **Static Site Generation (SSG)**.
- **GitHub Actions:** A workflow is provided in `.github/workflows/deploy.yml` which automatically builds and deploys the site to GitHub Pages on every push to the `master` branch.
- **Manual Build:** Run `npm run build` to generate the `out/` directory locally.

## 📁 Migration
- Your original files are safely stored in the `_legacy/` directory.
- The blog engine in `src/lib/posts.ts` automatically parses posts from `_legacy/_posts/`.
