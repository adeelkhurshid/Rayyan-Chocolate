import React, { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CanvasSequence from './components/CanvasSequence';
import TypographyLayer from './components/TypographyLayer';
import ParticleOverlay from './components/ParticleOverlay';
import Collection from './components/Collection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showCollection, setShowCollection] = useState(false);

  useEffect(() => {
    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-[500vh] bg-rayyan-black">
        {/* Sticky container that holds the canvas and overlays */}
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          
          {/* Background Image Sequence */}
          <CanvasSequence frameCount={87} />

          {/* Interactive Particles */}
          <ParticleOverlay />

          {/* Text overlays that trigger on scroll */}
          <TypographyLayer onExploreClick={() => setShowCollection(true)} />

        </div>
      </div>

      {/* Full-screen Collection Overlay */}
      {showCollection && <Collection onClose={() => setShowCollection(false)} />}
    </>
  );
}

export default App;
