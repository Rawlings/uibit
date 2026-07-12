import { useState, useEffect, useRef } from 'react';

interface InteractivePatternBackgroundProps {
  className?: string;
}

export default function InteractivePatternBackground({ className = "h-[580px]" }: InteractivePatternBackgroundProps) {
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // Listen for cursor movement over the window to calculate displacement and light intensity
  useEffect(() => {
    if (!canvasRef) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    canvasRef.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvasRef.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [canvasRef]);

  useEffect(() => {
    if (!canvasRef) return;

    const ctx = typeof canvasRef.getContext === 'function' ? canvasRef.getContext('2d') : null;
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = window.devicePixelRatio || 1;
    let width = canvasRef.offsetWidth || window.innerWidth;
    let height = canvasRef.offsetHeight || 580;

    canvasRef.width = width * dpr;
    canvasRef.height = height * dpr;
    ctx.scale(dpr, dpr);

    const handleResize = () => {
      if (!canvasRef) return;
      width = canvasRef.offsetWidth || window.innerWidth;
      height = canvasRef.offsetHeight || 580;
      canvasRef.width = width * dpr;
      canvasRef.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', handleResize);
    let time = 0;

    // High quality, subtle organic nodes layout
    const cols = 42;
    const rows = 9;
    const focalLength = 340; // 3D Perspective focal length

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.007; // Slow, majestic oceanic swell speed

      const isDark = document.documentElement.classList.contains('dark');
      const points: { x: number; y: number; z: number }[][] = [];
      const centerY = height * 0.15; // Low horizon line for high-angle perspective

      // Calculate deformed grid points in 3D perspective space using Gerstner ocean waves
      for (let r = 0; r < rows; r++) {
        points[r] = [];
        const zBase = 140 + (rows - 1 - r) * 24;

        for (let c = 0; c < cols; c++) {
          // Widen horizontal coordinates to overflow off-screen slightly
          const xBase = (c - cols / 2) * 36;

          // Multi-layered ocean swells traveling diagonally
          const phase1 = xBase * 0.006 + zBase * 0.015 - time * 2.0;
          const y1 = Math.sin(phase1) * 15;
          const dx1 = Math.cos(phase1) * 6;
          const dz1 = Math.cos(phase1) * 6;

          const phase2 = xBase * 0.015 - zBase * 0.01 + time * 3.0;
          const y2 = Math.sin(phase2) * 4;

          const x3d = xBase + dx1;
          const z3d = zBase + dz1;
          const y3d = 90 + y1 + y2; // Shift plane down below screen camera

          // Project to 2D
          let screenX = (x3d * focalLength) / z3d + width / 2;
          let screenY = (y3d * focalLength) / z3d + centerY;

          // Gentle cursor-interactive magnetic push
          if (mouseRef.current.active) {
            const dx = screenX - mouseRef.current.x;
            const dy = screenY - mouseRef.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 150;
            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 10;
              const angle = Math.atan2(dy, dx);
              screenX += Math.cos(angle) * force;
              screenY += Math.sin(angle) * force;
            }
          }

          points[r].push({ x: screenX, y: screenY, z: z3d });
        }
      }

      // Generate a premium subtle gray gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      if (isDark) {
        gradient.addColorStop(0, '#4b5563');   // Slate Gray
        gradient.addColorStop(0.5, '#9ca3af');  // Cool Gray
        gradient.addColorStop(1, '#4b5563');   // Slate Gray
      } else {
        gradient.addColorStop(0, '#9ca3af');   // Cool Gray
        gradient.addColorStop(0.5, '#4b5563');  // Slate Gray
        gradient.addColorStop(1, '#9ca3af');   // Cool Gray
      }

      ctx.strokeStyle = gradient;

      // Draw horizontal waves using smooth quadratic curves (Ultra-thin lines)
      for (let r = 0; r < rows; r++) {
        const samplePoint = points[r][0];
        const depthFactor = Math.max(0, Math.min(1, (520 - samplePoint.z) / 380));
        
        ctx.lineWidth = 0.25 + depthFactor * 0.65;
        
        ctx.beginPath();
        ctx.moveTo(points[r][0].x, points[r][0].y);

        for (let c = 0; c < cols - 1; c++) {
          const pCurrent = points[r][c];
          const pNext = points[r][c + 1];
          const xc = (pCurrent.x + pNext.x) / 2;
          const yc = (pCurrent.y + pNext.y) / 2;

          ctx.quadraticCurveTo(pCurrent.x, pCurrent.y, xc, yc);
        }
        
        ctx.lineTo(points[r][cols - 1].x, points[r][cols - 1].y);

        // Modulate opacity for realistic depth fog (even more subtle gray)
        const baseOpacity = isDark ? 0.32 : 0.16;
        ctx.globalAlpha = baseOpacity * (0.15 + depthFactor * 0.85);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);

  return (
    <canvas
      ref={setCanvasRef}
      className={`absolute -top-20 left-0 w-full pointer-events-none z-0 [mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black_45%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_60%_80%_at_50%_0%,black_45%,transparent_100%)] ${className}`}
    />
  );
}
