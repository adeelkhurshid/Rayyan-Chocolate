import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Collection({ onClose }) {
  const containerRef = useRef(null);

  const chocolates = [
    {
      id: 1,
      name: 'Signature Dark',
      description: '70% Ecuadorian Cacao with a flawless mirror finish.',
      image: '/collection/rayyan_dark_chocolate_1783161539118.png',
      color: 'rayyan-navy'
    },
    {
      id: 2,
      name: 'Roasted Hazelnut',
      description: 'Velvety espresso infusion with hand-roasted hazelnuts.',
      image: '/collection/rayyan_hazelnut_chocolate_1783161548617.png',
      color: '#2A1610' // Espresso Brown
    },
    {
      id: 3,
      name: 'Madagascar Vanilla',
      description: 'Silky white chocolate speckled with pure vanilla bean.',
      image: '/collection/rayyan_vanilla_chocolate_1783161559026.png',
      color: '#F3E5D8' // Cream
    }
  ];

  useEffect(() => {
    // Fade in animation
    gsap.fromTo(containerRef.current, 
      { opacity: 0, backdropFilter: 'blur(0px)' },
      { opacity: 1, backdropFilter: 'blur(20px)', duration: 1, ease: 'power2.out' }
    );
    
    // Stagger in the items
    gsap.fromTo('.collection-item',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.3, ease: 'power3.out' }
    );
  }, []);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: onClose
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-50 bg-rayyan-black/90 flex flex-col items-center justify-center p-8 overflow-y-auto"
    >
      <button 
        onClick={handleClose}
        className="absolute top-8 right-8 text-rayyan-gold text-sm tracking-[0.2em] uppercase hover:text-rayyan-white transition-colors"
      >
        Close [X]
      </button>

      <h2 className="font-serif text-4xl md:text-6xl text-rayyan-white mb-16 text-center">
        The Heritage Collection
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl w-full">
        {chocolates.map((choc) => (
          <div key={choc.id} className="collection-item group cursor-pointer flex flex-col items-center text-center">
            <div className="relative w-full aspect-[3/4] overflow-hidden mb-6 border border-white/5 group-hover:border-rayyan-gold/30 transition-all duration-500">
              <img 
                src={choc.image} 
                alt={choc.name}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                <button className="bg-transparent border border-rayyan-gold text-rayyan-gold px-8 py-3 font-sans tracking-[0.2em] uppercase text-xs hover:bg-rayyan-gold hover:text-rayyan-black transition-all">
                  Pre-Order
                </button>
              </div>
            </div>
            <h3 className="font-serif text-2xl text-rayyan-white mb-2 group-hover:text-rayyan-gold transition-colors">{choc.name}</h3>
            <p className="font-sans text-sm text-rayyan-cream/60 font-light max-w-xs">{choc.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
