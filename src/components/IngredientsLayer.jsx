import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IngredientsLayer() {
  const containerRef = useRef(null);
  const cocoaRef = useRef(null);
  const vanillaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Cocoa Bean Animation
      gsap.fromTo(cocoaRef.current,
        { opacity: 0, scale: 0.5, x: -600, y: 300, rotation: -45 },
        {
          scrollTrigger: {
            trigger: document.body,
            start: '40%',
            end: '65%',
            scrub: 1,
          },
          opacity: 0.9,
          scale: 1,
          x: -200,
          y: -100,
          rotation: 20,
          ease: 'power1.out',
        }
      );
      
      // Fade out at end
      gsap.to(cocoaRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: '65%',
          end: '75%',
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        y: -300
      });

      // Vanilla Animation
      gsap.fromTo(vanillaRef.current,
        { opacity: 0, scale: 0.6, x: 600, y: -200, rotation: 60 },
        {
          scrollTrigger: {
            trigger: document.body,
            start: '45%',
            end: '70%',
            scrub: 1.5,
          },
          opacity: 0.9,
          scale: 1,
          x: 250,
          y: 150,
          rotation: -10,
          ease: 'power1.out',
        }
      );
      
      // Fade out at end
      gsap.to(vanillaRef.current, {
        scrollTrigger: {
          trigger: document.body,
          start: '70%',
          end: '80%',
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        y: 300
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
      
      {/* Cocoa Bean */}
      <img 
        ref={cocoaRef}
        src="/ingredients/cocoa.png" 
        alt="Roasted Cocoa Bean" 
        className="absolute top-1/2 left-1/2 w-64 md:w-[28rem] object-contain opacity-0 mix-blend-screen"
        style={{ transform: 'translate(-50%, -50%)', transformOrigin: 'center' }}
      />

      {/* Madagascar Vanilla */}
      <img 
        ref={vanillaRef}
        src="/ingredients/vanilla.png" 
        alt="Madagascar Vanilla" 
        className="absolute top-1/2 left-1/2 w-72 md:w-[32rem] object-contain opacity-0 mix-blend-screen"
        style={{ transform: 'translate(-50%, -50%)', transformOrigin: 'center' }}
      />
      
    </div>
  );
}
