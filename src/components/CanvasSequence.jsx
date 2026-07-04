import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CanvasSequence({ frameCount = 87 }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const renderObj = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Preload images
    const images = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Pad to 3 digits e.g., 001, 042, 087
      const paddedNum = i.toString().padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${paddedNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === 1) {
          // Draw first frame immediately when it loads
          renderFrame(1);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    const renderFrame = (index) => {
      if (!canvas || !ctx || !imagesRef.current[index - 1]) return;
      const img = imagesRef.current[index - 1];

      // Handle resize drawing (cover style)
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Handle resize drawing (contain style as base)
      const baseScale = Math.min(canvas.width / img.width, canvas.height / img.height);
      
      // Enable high-quality anti-aliasing/smoothing to prevent pixel splitting on zoom
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Cinematic 3D Camera Push-In Effect
      // Reduced the max zoom multiplier to 1.5x. This still gives a beautiful 3D pop-out effect, 
      // but prevents the original JPEG frames from stretching so far that they pixelate.
      let dynamicScaleMultiplier = 1;
      if (renderObj.current.progress !== undefined) {
        dynamicScaleMultiplier = 1 + Math.pow(renderObj.current.progress, 2) * 0.5; 
      }
      
      const scale = baseScale * dynamicScaleMultiplier;

      // Keep it perfectly centered so the explosion rushes past the viewer's face
      const x = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

      // Create a cinematic elliptical mask to erase the floor/walls while showing the FULL chocolate bar
      const centerX = x + (img.width * scale) / 2;
      const centerY = y + (img.height * scale) / 2;
      
      ctx.save();
      ctx.globalCompositeOperation = 'destination-in';
      
      // Move to center, scale to make a tall oval (since chocolate is vertical)
      // As progress increases (zoom happens), we make the mask wider to allow particles to scatter
      const maskWidthProgress = renderObj.current.progress !== undefined ? renderObj.current.progress : 0;
      const maskScaleX = 0.6 + (maskWidthProgress * 0.4); // Starts narrow, gets wide
      const maskScaleY = 1.0; // Always tall enough for the chocolate
      
      ctx.translate(centerX, centerY);
      ctx.scale(maskScaleX, maskScaleY);
      
      const gradient = ctx.createRadialGradient(
        0, 0, 0,
        0, 0, (img.height * scale) * 0.48 // Covers nearly the full height of the image frame softly
      );
      
      gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(0.65, 'rgba(0, 0, 0, 1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(-canvas.width * 2, -canvas.height * 2, canvas.width * 4, canvas.height * 4);
      ctx.restore();
    };

    // Resize listener
    const onResize = () => {
      renderFrame(Math.floor(renderObj.current.frame) || 1);
    };
    window.addEventListener('resize', onResize);

    // Setup GSAP ScrollTrigger to animate the 'frame' value
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.5, // Smooth scrubbing
      onUpdate: (self) => {
        // Map progress (0 to 1) to frame (1 to 87)
        const targetFrame = 1 + self.progress * (frameCount - 1);
        renderObj.current.frame = targetFrame;
        renderObj.current.progress = self.progress; // Save progress for panning
        renderFrame(Math.round(targetFrame));
      },
    });

    return () => {
      window.removeEventListener('resize', onResize);
      trigger.kill();
    };
  }, [frameCount]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
    />
  );
}
