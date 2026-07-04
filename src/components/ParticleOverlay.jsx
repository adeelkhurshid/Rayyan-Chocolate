import React, { useEffect, useRef } from 'react';

export default function ParticleOverlay() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const particleCount = 70; // Subtle, elegant amount

    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 0.02;
        
        // Either gold or cocoa dust
        this.color = Math.random() > 0.5 
          ? 'rgba(200, 167, 90, 0.6)' // Gold
          : 'rgba(109, 59, 32, 0.4)'; // Cocoa
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add a tiny glow to gold particles
        if (this.color.includes('200')) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#C8A75A';
        } else {
          ctx.shadowBlur = 0;
        }
      }

      update() {
        // Slow vertical drift
        this.y -= this.size * 0.15;
        this.x += Math.sin(this.angle) * 0.2;
        this.angle += this.spin;

        if (this.y < -10) {
          this.y = height + 10;
          this.x = Math.random() * width;
          this.baseX = this.x;
        }

        // Mouse interaction (elegant avoidance)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let maxDistance = mouse.radius;
          let force = (maxDistance - distance) / maxDistance;
          let directionX = forceDirectionX * force * this.density * 0.05;
          let directionY = forceDirectionY * force * this.density * 0.05;
          
          if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Slowly return to base horizontal drift
            if (this.x !== this.baseX) {
              let dx2 = this.x - this.baseX;
              this.x -= dx2 / 100;
            }
          }
        }
        
        this.draw();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
