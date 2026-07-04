import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function TypographyLayer({ onExploreClick }) {
  const containerRef = useRef(null);
  
  // Editorial blocks
  const block1Ref = useRef(null); // Hero
  const block2Ref = useRef(null); // Craftsmanship
  const block3Ref = useRef(null); // Ingredients
  const block4Ref = useRef(null); // CTA

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text (0% to 25%) - Aligned Left
      gsap.to(block1Ref.current, {
        scrollTrigger: { trigger: document.body, start: '0%', end: '20%', scrub: true },
        opacity: 0, x: -100, ease: 'power1.inOut',
      });

      // 2. Craftsmanship (20% to 45%) - Aligned Right
      gsap.fromTo(block2Ref.current, 
        { opacity: 0, x: 100 },
        { scrollTrigger: { trigger: document.body, start: '15%', end: '25%', scrub: true }, opacity: 1, x: 0, ease: 'power1.out' }
      );
      gsap.to(block2Ref.current, {
        scrollTrigger: { trigger: document.body, start: '35%', end: '45%', scrub: true }, opacity: 0, x: 100, ease: 'power1.in'
      });

      // 3. Ingredients (45% to 75%) - Aligned Left
      gsap.fromTo(block3Ref.current, 
        { opacity: 0, x: -100 },
        { scrollTrigger: { trigger: document.body, start: '40%', end: '50%', scrub: true }, opacity: 1, x: 0, ease: 'power1.out' }
      );
      gsap.to(block3Ref.current, {
        scrollTrigger: { trigger: document.body, start: '65%', end: '75%', scrub: true }, opacity: 0, x: -100, ease: 'power1.in'
      });

      // 4. Final CTA (75% to 100%) - Centered
      gsap.fromTo(block4Ref.current,
        { opacity: 0, y: 50 },
        { scrollTrigger: { trigger: document.body, start: '75%', end: '90%', scrub: true }, opacity: 1, y: 0, ease: 'power2.out' }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none w-full h-full">
      
      {/* 1. Hero - Center */}
      <div ref={block1Ref} className="absolute top-[30%] left-1/2 -translate-x-1/2 w-full px-4 text-center">
        <h1 className="font-serif text-5xl md:text-8xl text-rayyan-white tracking-wider opacity-90 text-glow">
          RAYYAN
        </h1>
        <p className="font-sans text-sm md:text-lg text-rayyan-gold mt-6 uppercase tracking-[0.4em] opacity-80">
          Ultra-Luxury Artisan Chocolate
        </p>
      </div>

      {/* 2. Craftsmanship - Center */}
      <div ref={block2Ref} className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 text-center opacity-0">
        <h2 className="font-serif text-3xl md:text-5xl text-rayyan-white tracking-wide">
          The Art of Purity
        </h2>
        <p className="font-sans text-md text-rayyan-cream mt-6 font-light leading-relaxed opacity-80">
          Hand-selected from the rarest cocoa harvests. Every bar is tempered to a flawless mirror finish, delivering a snap that resonates with pure craftsmanship.
        </p>
      </div>

      {/* 3. Ingredients - Center */}
      <div ref={block3Ref} className="absolute top-[50%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 text-center opacity-0">
        <h2 className="font-serif text-4xl md:text-6xl text-rayyan-gold tracking-wide">
          A Symphony of Elements
        </h2>
        <p className="font-sans text-md text-rayyan-cream mt-6 font-light leading-relaxed opacity-80">
          Madagascar vanilla, roasted cocoa beans, and pure gold leaf. We don't just blend ingredients; we orchestrate an explosion of flavor.
        </p>
      </div>

      {/* 4. Final CTA - Center */}
      <div ref={block4Ref} className="absolute top-[60%] left-1/2 -translate-x-1/2 w-full px-4 text-center opacity-0 pointer-events-auto">
        <h2 className="font-serif text-4xl md:text-7xl text-rayyan-white mb-4">
          Crafted Beyond Chocolate.
        </h2>
        <button 
          onClick={onExploreClick}
          className="mt-8 bg-transparent border border-rayyan-gold text-rayyan-gold px-12 py-4 font-sans tracking-[0.2em] uppercase text-xs hover:bg-rayyan-gold hover:text-rayyan-black transition-all duration-700 ease-out"
        >
          Explore the Collection
        </button>
      </div>

    </div>
  );
}
