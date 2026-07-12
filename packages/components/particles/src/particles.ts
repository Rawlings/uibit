import { html } from 'lit';
import { customElement, UIBitElement, ResizeController, LoopController } from '@uibit/core';
import { property, query } from 'lit/decorators.js';
import { styles } from './styles';
import type { Particle, ParticleHoverEffect, ParticleMode, NetworkPulse } from './types';

/**
 * An interactive canvas effect element. Creates dynamic background visuals

 * @summary A lightweight canvas-based interactive particle background effect.
 * across many modes: particles, abstract art, grids, flow fields, and more.
 *
 * @cssprop [--uibit-particles-color=#6b7280] - Space or comma-separated list of colors
 * @cssprop [--uibit-particles-line-color=#e5e7eb] - Color of connecting lines
 * @cssprop [--uibit-particles-opacity=1] - Opacity of the canvas overlay
 * @cssprop [--uibit-particles-min-size=0.0625rem] - Minimum particle size
 * @cssprop [--uibit-particles-max-size=0.1875rem] - Maximum particle size
 
 * @cssstate paused - Active when particle animations are suspended.*/
@customElement('uibit-particles')
export class Particles extends UIBitElement {
  static styles = styles;

  /** Number of particles / elements in the field */
  @property({ type: Number }) count = 50;

  /** Speed multiplier */
  @property({ type: Number }) speed = 1;

  /**
   * Animation mode.
   * 'float' | 'snow' | 'rain' | 'neural' | 'matrix' |
   * 'wave' | 'vortex' | 'smoke' | 'bubbles' | 'grid' | 'aurora' | 'noise' | 'rings'
   */
  @property({ type: String }) mode: ParticleMode = 'float';

  /** Draw constellation lines between nearby particles */
  @property({ type: Boolean }) connect = false;

  /** Max distance for connecting lines */
  @property({ type: Number, attribute: 'connect-distance' }) connectDistance = 100;

  /** Hover interaction: 'repel' | 'attract' | 'grab' | 'none' */
  @property({ type: String, attribute: 'hover-effect' }) hoverEffect: ParticleHoverEffect = 'repel';

  /** Radius of the mouse hover interaction zone */
  @property({ type: Number, attribute: 'interactive-radius' }) interactiveRadius = 100;

  @query('canvas') private _canvas!: HTMLCanvasElement;

  private _particles: Particle[] = [];
  private _pulses: NetworkPulse[] = [];
  private _mouse: { x: number | null; y: number | null } = { x: null, y: null };
  private _ctx: CanvasRenderingContext2D | null = null;
  private _lineColor = '#e5e7eb';
  private _colorCheckTick = 0;
  private _matrixChars: string[] = [];
  private _time = 0;

  protected _resize = new ResizeController(this, {
    callback: (entry) => {
      const { width, height } = entry.contentRect;
      this._resizeCanvas(width, height);
    }
  });

  protected _loop = new LoopController(this, {
    autoStart: false,
    callback: () => this._updateAndDraw()
  });

  firstUpdated() {
    if (this._canvas && typeof this._canvas.getContext === 'function') {
      this._ctx = this._canvas.getContext('2d');
    }
    this._setupMouseListeners();
    this._initParticles();
    this._loop.start();
  }

  updated(changedProperties: Map<PropertyKey, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('count') || changedProperties.has('mode')) {
      this._initParticles();
    }
  }

  private _resizeCanvas(width: number, height: number) {
    if (!this._canvas) return;
    const dpr = window.devicePixelRatio || 1;
    this._canvas.width = width * dpr;
    this._canvas.height = height * dpr;
    this._canvas.style.width = `${width}px`;
    this._canvas.style.height = `${height}px`;
    if (this._ctx) {
      this._ctx.scale(dpr, dpr);
    }
    this._initParticles();
  }

  private _setupMouseListeners() {
    this.listen(this, 'pointermove', (e: PointerEvent) => {
      const rect = this.getBoundingClientRect();
      this._mouse.x = e.clientX - rect.left;
      this._mouse.y = e.clientY - rect.top;
    });
    this.listen(this, 'pointerleave', () => {
      this._mouse.x = null;
      this._mouse.y = null;
    });
  }

  private _parseColors(): string[] {
    const raw = this.getCssPropertyValue('--uibit-particles-color') || '#6b7280';
    const colors = raw.split(/[\s,]+/).map(c => c.trim()).filter(c => c.length > 0);
    return colors.length > 0 ? colors : ['#6b7280'];
  }

  private _parseSize(prop: string, defaultValue: number): number {
    const val = this.getCssPropertyValue(prop);
    if (!val) return defaultValue;
    const num = parseFloat(val);
    if (isNaN(num)) return defaultValue;
    if (val.includes('rem')) return num * 16;
    return num;
  }

  private _initParticles() {
    if (!this._canvas) return;
    const width = this._canvas.clientWidth || this.clientWidth || 300;
    const height = this._canvas.clientHeight || this.clientHeight || 150;

    const minSize = this._parseSize('--uibit-particles-min-size', 1);
    const maxSize = this._parseSize('--uibit-particles-max-size', 3);
    const colors = this._parseColors();

    this._particles = [];
    this._pulses = [];
    this._matrixChars = [];
    this._time = 0;

    for (let i = 0; i < this.count; i++) {
      // Aurora only needs a few bands regardless of count
      if (this.mode === 'aurora' && i >= 8) break;

      const baseRadius = Math.random() * (maxSize - minSize) + minSize;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const baseSpeed = Math.random() * 0.5 + 0.5;

      let x = Math.random() * width;
      let y = Math.random() * height;
      let vx = 0, vy = 0;
      let radius = baseRadius;
      let originX: number | undefined;
      let originY: number | undefined;
      let angle: number | undefined;
      let angularVelocity: number | undefined;
      let orbitRadius: number | undefined;
      let amplitude: number | undefined;
      let opacity: number | undefined;
      let life: number | undefined;
      let maxLife: number | undefined;
      let phase: number | undefined;
      let prevX: number | undefined;
      let prevY: number | undefined;

      if (this.mode === 'float') {
        vx = (Math.random() - 0.5) * 1.5;
        vy = (Math.random() - 0.5) * 1.5;

      } else if (this.mode === 'snow') {
        vx = (Math.random() - 0.5) * 0.4;
        vy = Math.random() * 0.8 + 0.4;

      } else if (this.mode === 'rain') {
        vx = -0.5 - Math.random() * 0.5;
        vy = Math.random() * 4 + 4;

      } else if (this.mode === 'neural') {
        originX = Math.random() * width;
        originY = Math.random() * height;
        x = originX;
        y = originY;
        vx = (Math.random() - 0.5) * 0.3;
        vy = (Math.random() - 0.5) * 0.3;

      } else if (this.mode === 'matrix') {
        vy = Math.random() * 1.5 + 1.5;
        this._matrixChars.push(Math.random() < 0.5 ? '0' : '1');

      } else if (this.mode === 'wave') {
        const numRows = Math.max(2, Math.min(8, Math.floor(this.count / 8) + 2));
        const rowIdx = i % numRows;
        const rowHeight = height / numRows;
        originY = (rowIdx + 0.5) * rowHeight;
        amplitude = rowHeight * 0.35;
        angle = Math.random() * Math.PI * 2;
        vx = Math.random() * 0.8 + 0.3;
        vy = Math.random() * 0.008 + 0.004;
        y = originY;

      } else if (this.mode === 'vortex') {
        const maxOrbit = Math.min(width, height) * 0.44;
        orbitRadius = Math.sqrt(Math.random()) * maxOrbit + 5;
        angle = Math.random() * Math.PI * 2;
        const dir = Math.random() < 0.75 ? 1 : -1;
        angularVelocity = dir * (30 / Math.max(orbitRadius, 5));
        const cx = width / 2, cy = height / 2;
        x = cx + orbitRadius * Math.cos(angle);
        y = cy + orbitRadius * Math.sin(angle);

      } else if (this.mode === 'smoke') {
        const smokeRadius = 4 + Math.random() * 10;
        radius = smokeRadius;
        amplitude = smokeRadius; // remember initial radius for reset
        maxLife = 220 + Math.random() * 160;
        life = Math.random() * maxLife;
        opacity = life / maxLife;
        vx = (Math.random() - 0.5) * 0.35;
        vy = -(Math.random() * 0.4 + 0.15);
        x = width * 0.2 + Math.random() * width * 0.6;
        y = height - (life * Math.abs(vy));

      } else if (this.mode === 'bubbles') {
        radius = 6 + Math.random() * 22;
        vx = (Math.random() - 0.5) * 0.4;
        vy = -(Math.random() * 0.5 + 0.2);
        opacity = 0.3 + Math.random() * 0.4;
        y = height + Math.random() * height;

      } else if (this.mode === 'grid') {
        const cols = Math.max(2, Math.round(Math.sqrt(this.count * (width / height))));
        const rows = Math.max(2, Math.ceil(this.count / cols));
        const cellW = width / cols;
        const cellH = height / rows;
        const col = i % cols;
        const row = Math.floor(i / cols);
        originX = (col + 0.5) * cellW;
        originY = (row + 0.5) * cellH;
        x = originX;
        y = originY;
        phase = Math.random() * Math.PI * 2;

      } else if (this.mode === 'aurora') {
        const bandCount = Math.min(this.count, 8);
        originY = height * 0.08 + (i / bandCount) * height * 0.78;
        amplitude = 22 + Math.random() * 55;
        angle = Math.random() * Math.PI * 2;
        vy = Math.random() * 0.007 + 0.003;
        vx = Math.random() * 0.002 + 0.001;
        y = originY;
        x = 0;

      } else if (this.mode === 'noise') {
        prevX = x;
        prevY = y;

      } else if (this.mode === 'rings') {
        maxLife = 45 + Math.random() * 85;
        radius = Math.random() * maxLife;
        vx = 0.5 + Math.random() * 1.3;
      }

      this._particles.push({
        x, y, vx, vy, radius, color, baseSpeed,
        originX, originY, angle, angularVelocity, orbitRadius,
        amplitude, opacity, life, maxLife, phase, prevX, prevY,
      });
    }
  }



  private _updateAndDraw() {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const t = ++this._time;

    ctx.clearRect(0, 0, width, height);

    if (this._colorCheckTick % 30 === 0) {
      this._lineColor = this.getCssPropertyValue('--uibit-particles-line-color') || '#e5e7eb';
      const colors = this._parseColors();
      for (const p of this._particles) {
        if (p && p.color && !colors.includes(p.color)) {
          p.color = colors[Math.floor(Math.random() * colors.length)];
        }
      }
    }
    this._colorCheckTick++;

    const particles = this._particles;
    const mouse = this._mouse;
    const speed = this.speed;
    const hoverEffect = this.hoverEffect;
    const interactiveRadius = this.interactiveRadius;
    const connectDist = this.connectDistance;

    // ── Neural: draw lines + pulses before dots ──────────────────────────────
    if (this.mode === 'neural') {
      ctx.strokeStyle = this._lineColor;

      if (Math.random() < 0.03 * speed && particles.length > 1) {
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        if (p1) {
          const neighbors: Particle[] = [];
          for (const p2 of particles) {
            if (p2 && p2 !== p1) {
              const dx = p1.x - p2.x, dy = p1.y - p2.y;
              if (Math.sqrt(dx * dx + dy * dy) < connectDist) neighbors.push(p2);
            }
          }
          if (neighbors.length > 0) {
            const p2 = neighbors[Math.floor(Math.random() * neighbors.length)];
            if (p2) {
              this._pulses.push({ startX: p1.x, startY: p1.y, endX: p2.x, endY: p2.y, progress: 0, speed: 0.02 + Math.random() * 0.03 });
            }
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2) continue;
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = alpha * 0.7;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      ctx.fillStyle = this._lineColor;
      for (let j = this._pulses.length - 1; j >= 0; j--) {
        const pulse = this._pulses[j];
        if (!pulse) continue;
        pulse.progress += pulse.speed * speed;
        if (pulse.progress >= 1) { this._pulses.splice(j, 1); continue; }
        const px = pulse.startX + (pulse.endX - pulse.startX) * pulse.progress;
        const py = pulse.startY + (pulse.endY - pulse.startY) * pulse.progress;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // ── Aurora: draw banded curtains, no individual dots ─────────────────────
    if (this.mode === 'aurora') {
      for (const p of particles) {
        if (!p) continue;
        p.angle = (p.angle || 0) + (p.vy || 0.005) * speed;
        if (p.originY !== undefined) {
          p.y = p.originY + Math.sin((p.angle || 0) * 0.4) * 18;
        }
        const amp = p.amplitude || 30;
        const ph = p.angle || 0;
        const steps = Math.max(20, Math.ceil(width / 12));
        const stepW = width / steps;

        ctx.save();
        ctx.filter = 'blur(20px)';
        ctx.globalAlpha = 0.38;
        ctx.fillStyle = p.color || '#6b7280';
        ctx.beginPath();
        ctx.moveTo(0, p.y + amp * Math.sin(ph));
        for (let s = 1; s <= steps; s++) {
          const sx = s * stepW;
          ctx.lineTo(sx, p.y + amp * Math.sin(sx * 0.009 + ph));
        }
        for (let s = steps; s >= 0; s--) {
          const sx = s * stepW;
          ctx.lineTo(sx, p.y + amp * 1.7 * Math.sin(sx * 0.007 + ph + 1.1));
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      return;
    }

    // ── Per-particle update + draw ────────────────────────────────────────────
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (!p) continue;

      // ── Update ──
      if (this.mode === 'neural') {
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.originX !== undefined && p.originY !== undefined) {
          const dx = p.x - p.originX, dy = p.y - p.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 30) { p.vx -= dx * 0.002; p.vy -= dy * 0.002; }
        }
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;

      } else if (this.mode === 'wave') {
        p.x += (p.vx || 1) * speed;
        p.angle = (p.angle || 0) + (p.vy || 0.005) * speed;
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;
        if (p.originY !== undefined) {
          p.y = p.originY + (p.amplitude || 20) * Math.sin(p.x * 0.018 + (p.angle || 0));
        }

      } else if (this.mode === 'vortex') {
        if (p.orbitRadius !== undefined && p.angularVelocity !== undefined) {
          p.angle = (p.angle || 0) + p.angularVelocity * speed * 0.02;
          const cx = width / 2, cy = height / 2;
          p.x = cx + p.orbitRadius * Math.cos(p.angle || 0);
          p.y = cy + p.orbitRadius * Math.sin(p.angle || 0);
        }

      } else if (this.mode === 'smoke') {
        p.life = (p.life || 0) - speed;
        if ((p.life || 0) <= 0) {
          p.life = p.maxLife || 220;
          p.x = width * 0.2 + Math.random() * width * 0.6;
          p.y = height;
          p.radius = p.amplitude || 5;
          p.vx = (Math.random() - 0.5) * 0.35;
          p.vy = -(Math.random() * 0.4 + 0.15);
        }
        p.opacity = Math.max(0, (p.life || 0) / (p.maxLife || 220));
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vx *= 0.97;
        p.x += p.vx * speed;
        p.y += (p.vy || -0.3) * speed;
        p.radius += 0.07 * speed;

      } else if (this.mode === 'bubbles') {
        p.y += (p.vy || -0.4) * speed;
        p.x += (p.vx || 0) * speed;
        if (p.y < -(p.radius + 20)) {
          p.y = height + p.radius + Math.random() * 80;
          p.x = Math.random() * width;
        }

      } else if (this.mode === 'grid') {
        if (p.originX !== undefined && p.originY !== undefined) {
          p.x += (p.originX - p.x) * 0.12;
          p.y += (p.originY - p.y) * 0.12;
        }

      } else if (this.mode === 'noise') {
        p.prevX = p.x;
        p.prevY = p.y;
        const flowAngle =
          Math.sin(p.x * 0.008 + t * 0.008) * Math.PI * 2 +
          Math.cos(p.y * 0.008 + t * 0.006) * Math.PI;
        p.vx = Math.cos(flowAngle) * 1.6;
        p.vy = Math.sin(flowAngle) * 1.6;
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          p.x = Math.random() * width;
          p.y = Math.random() * height;
          p.prevX = p.x;
          p.prevY = p.y;
        }

      } else if (this.mode === 'rings') {
        p.radius += (p.vx || 1) * speed;
        if (p.radius > (p.maxLife || 80)) {
          p.radius = 0;
          p.x = Math.random() * width;
          p.y = Math.random() * height;
        }

      } else {
        // float, snow, rain, matrix
        p.x += p.vx * speed;
        p.y += p.vy * speed;
        if (this.mode === 'snow') {
          if (p.y > height) { p.y = 0; p.x = Math.random() * width; }
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
        } else if (this.mode === 'rain') {
          if (p.y > height || p.x < 0) { p.y = 0; p.x = Math.random() * width; }
        } else if (this.mode === 'matrix') {
          if (p.y > height) { p.y = 0; p.x = Math.random() * width; }
          if (Math.random() < 0.05) this._matrixChars[i] = Math.random() < 0.5 ? '0' : '1';
        } else {
          if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        }
      }

      // ── Mouse interaction ──
      if (mouse.x !== null && mouse.y !== null && hoverEffect !== 'none') {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < interactiveRadius && dist > 0.01) {
          const force = (interactiveRadius - dist) / interactiveRadius;
          if (hoverEffect === 'repel') {
            p.x += (dx / dist) * force * (this.mode === 'grid' ? interactiveRadius * 0.35 : 1.8);
            p.y += (dy / dist) * force * (this.mode === 'grid' ? interactiveRadius * 0.35 : 1.8);
          } else if (hoverEffect === 'attract') {
            p.x -= (dx / dist) * force * (this.mode === 'grid' ? interactiveRadius * 0.35 : 1.8);
            p.y -= (dy / dist) * force * (this.mode === 'grid' ? interactiveRadius * 0.35 : 1.8);
          } else if (hoverEffect === 'grab') {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = this._lineColor;
            ctx.lineWidth = force * 0.8;
            ctx.stroke();
          }
        }
      }

      // ── Draw ──
      if (this.mode === 'rain') {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 1.5, p.y - p.vy * 1.5);
        ctx.strokeStyle = p.color || '#6b7280';
        ctx.lineWidth = p.radius * 0.6;
        ctx.stroke();

      } else if (this.mode === 'matrix') {
        const char = this._matrixChars[i] || '0';
        ctx.font = `bold ${p.radius * 6 + 7}px monospace`;
        ctx.fillStyle = p.color || '#6b7280';
        ctx.fillText(char, p.x, p.y);

      } else if (this.mode === 'smoke') {
        ctx.save();
        ctx.globalAlpha = (p.opacity || 0) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color || '#6b7280';
        ctx.fill();
        ctx.restore();

      } else if (this.mode === 'bubbles') {
        const yFade = Math.max(0, Math.min(1, p.y / height));
        ctx.save();
        ctx.globalAlpha = yFade * (p.opacity || 0.5);
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.radius), 0, Math.PI * 2);
        ctx.strokeStyle = p.color || '#6b7280';
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.globalAlpha = yFade * (p.opacity || 0.5) * 0.07;
        ctx.fillStyle = p.color || '#6b7280';
        ctx.fill();
        ctx.restore();

      } else if (this.mode === 'grid') {
        const cx = width / 2, cy = height / 2;
        const dx = (p.originX || p.x) - cx;
        const dy = (p.originY || p.y) - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pulse = Math.sin(dist * 0.04 - t * 0.03 * speed + (p.phase || 0)) * 0.5 + 0.5;
        const drawR = p.radius * (0.4 + pulse * 1.3);
        ctx.save();
        ctx.globalAlpha = 0.2 + pulse * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, drawR), 0, Math.PI * 2);
        ctx.fillStyle = p.color || '#6b7280';
        ctx.fill();
        ctx.restore();

      } else if (this.mode === 'noise') {
        ctx.beginPath();
        ctx.moveTo(p.prevX !== undefined ? p.prevX : p.x, p.prevY !== undefined ? p.prevY : p.y);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color || '#6b7280';
        ctx.lineWidth = 0.9;
        ctx.globalAlpha = 0.38;
        ctx.stroke();
        ctx.globalAlpha = 1;

      } else if (this.mode === 'rings') {
        const maxR = p.maxLife || 80;
        const alpha = Math.max(0, 1 - p.radius / maxR);
        ctx.save();
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.radius), 0, Math.PI * 2);
        ctx.strokeStyle = p.color || '#6b7280';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

      } else {
        // float, snow, neural, wave, vortex → standard dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color || '#6b7280';
        ctx.fill();
      }
    }

    // ── Constellation lines (float + generic) ────────────────────────────────
    if (this.connect && this.mode !== 'neural') {
      ctx.strokeStyle = this._lineColor;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        if (!p1) continue;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (!p2) continue;
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            const alpha = 1 - dist / connectDist;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = alpha * 0.5;
            ctx.globalAlpha = alpha;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
    }
  }

  render() {
    return html`
      <div class="container" part="container">
        <canvas part="canvas"></canvas>
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-particles': Particles;
  }
}

export default Particles;
