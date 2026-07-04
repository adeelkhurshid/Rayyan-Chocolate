# Rayyan Premium Chocolate - Cinematic Web Experience

An award-winning, scroll-driven cinematic website for **Rayyan Premium Chocolate**, an ultra-luxury artisan chocolate brand. 

This project uses advanced Canvas compositing, mathematical scroll-synced scaling, and hardware-accelerated animations to create a flawless, seamless, and "infinite black void" 3D camera experience out of a sequence of flat JPEG images.

## Features

- **Infinite Black Void Masking:** Uses dynamic HTML5 Canvas `globalCompositeOperation` (`destination-in`) and elliptical radial gradients to mathematically erase backgrounds, stone floors, and studio walls from pre-rendered video frames, suspending the product in an infinite, seamless black void.
- **Cinematic 3D Camera Push-In:** As the user scrolls, the Canvas engine exponentially multiplies the image scale, causing the chocolate explosion to rapidly zoom and scatter beautifully outside the edges of the screen in true 3D space.
- **Scroll-Driven Storytelling:** Driven by GSAP ScrollTrigger, the animation is tied perfectly to the user's scroll position, creating a flawless interactive storytelling timeline.
- **Buttery Smooth Easing:** Uses `@studio-freight/lenis` to hijack native scrolling and apply Apple-like ease-out physics to the viewport.
- **Floating Atmospherics:** A custom React `ParticleOverlay` generates slowly floating gold flakes and cocoa dust, adding incredible depth to the foreground.
- **The Heritage Collection Overlay:** An elegant, frosted-glass product gallery that fades in on command, showcasing AI-generated photorealistic luxury chocolate packaging.

## Tech Stack

- **Framework:** React + Vite
- **Styling:** TailwindCSS
- **Animation:** GSAP (GreenSock) + ScrollTrigger
- **Smooth Scroll:** Lenis
- **Rendering Engine:** HTML5 Canvas API

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone or download the repository.
2. Navigate into the project directory:
   ```bash
   cd ezgif-3601d960763a2bb4-jpg
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the Vite development server to view the experience locally:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. Scroll down the page to trigger the cinematic camera push-in!

## Project Structure

- `src/App.jsx`: The main layout container that manages the Lenis scroll hijacking, sticky pinning, and the Collection overlay state.
- `src/components/CanvasSequence.jsx`: The core rendering engine. Pre-loads 87 JPEG frames, dynamically masks out their backgrounds using elliptical gradients, and applies the exponential 3D zoom math based on GSAP scroll progress.
- `src/components/TypographyLayer.jsx`: A perfectly centered, staggered editorial timeline that fades text blocks in and out as the explosion plays.
- `src/components/Collection.jsx`: A full-screen frosted glass overlay displaying the luxury product grid.
- `public/sequence/`: Contains the 87 pre-rendered explosion JPEGs.
- `public/collection/`: Contains the generated high-resolution premium product shots.

## Author

Antigravity IDE & the DeepMind Agentic Coding Team
