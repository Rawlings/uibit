import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    width: 100%;
    font-size: var(--uibit-video-font-size, var(--uibit-font-size-sm, 0.875rem));
    font-family: var(--uibit-video-font-family, inherit);
    --uibit-video-radius: 0;
    --uibit-video-bg: #000000;
    --uibit-video-focus-color: #ffffff;
    --uibit-video-control-color: #ffffff;
  }

  .player-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    background-color: var(--uibit-video-bg);
    border-radius: var(--uibit-video-radius);
    aspect-ratio: 16 / 9;
    user-select: none;
    outline: none;
  }

  .player-container:focus-visible {
    outline: 0.125rem solid var(--uibit-video-focus-color);
    outline-offset: 0.125rem;
  }

  ::slotted(video) {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  ::slotted(iframe) {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  .iframe-container {
    width: 100%;
    height: 100%;
  }

  /* ── Overlay / Poster ────────────────────────────────────────── */

  .poster-overlay {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: opacity 0.3s ease;
  }

  /* Premium play button - circular, translucent white background with blur and cut-out see-through play icon */
  .center-play-btn {
    position: relative;
    z-index: 11;
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(0.5rem);
    -webkit-backdrop-filter: blur(0.5rem);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    opacity: 0.9;
    transition: opacity 0.2s ease, background-color 0.2s ease;
    
    /* Mask out the play icon so it is see-through */
    mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><mask id='m'><rect x='0' y='0' width='100' height='100' fill='white'/><polygon points='38,28 75,50 38,72' fill='black'/></mask><circle cx='50' cy='50' r='50' fill='white' mask='url(%23m)'/></svg>") no-repeat center / contain;
    -webkit-mask: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><mask id='m'><rect x='0' y='0' width='100' height='100' fill='white'/><polygon points='38,28 75,50 38,72' fill='black'/></mask><circle cx='50' cy='50' r='50' fill='white' mask='url(%23m)'/></svg>") no-repeat center / contain;
  }

  .center-play-btn:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.9);
  }

  .center-play-btn:active {
    opacity: 0.8;
  }

  /* ── Minimal Single-Row Controls Bar ────────────────────────── */

  .controls-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.5), transparent); /* Vignette gradient */
    padding: 1.25rem 1.5rem;
    color: var(--uibit-video-control-color);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* Show controls on hover, focus, or when paused */
  .player-container:hover .controls-bar,
  .player-container:focus-within .controls-bar,
  .player-container.paused .controls-bar,
  .player-container.seeking .controls-bar {
    opacity: 1;
  }

  .control-btn {
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem; /* Larger hit target (40px) */
    height: 2.5rem; /* Larger hit target (40px) */
    padding: 0;
    opacity: 0.8;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .control-btn:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  .control-btn:active {
    transform: scale(0.95);
  }

  .control-btn:focus-visible {
    outline: 0.125rem solid #ffffff;
  }

  .control-btn svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  .time-display {
    font-size: 0.75rem;
    font-variant-numeric: tabular-nums;
    font-weight: 500;
    opacity: 0.9;
    white-space: nowrap;
  }

  /* ── Timeline (Flex-Grow) ────────────────────────────────────── */

  .timeline-container {
    flex-grow: 1;
    height: 2rem; /* Larger hit target (32px height) */
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
  }

  .timeline-bar {
    width: 100%;
    height: 0.125rem; /* Ultra thin line */
    background: rgba(255, 255, 255, 0.25);
    position: relative;
    transition: height 0.15s ease;
  }

  .timeline-container:hover .timeline-bar {
    height: 0.25rem;
  }

  .timeline-progress {
    height: 100%;
    background: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
  }

  /* Handle is circular, borderless, shadowless */
  .timeline-handle {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.15s ease;
    box-shadow: none;
    border: none;
  }

  .timeline-container:hover .timeline-handle,
  .timeline-container:active .timeline-handle {
    transform: translate(-50%, -50%) scale(1);
  }

  /* ── Volume Slider ───────────────────────────────────────────── */

  .volume-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .volume-slider-wrap {
    width: 0;
    overflow: hidden;
    height: 2rem; /* Matches button height for hit alignment */
    display: flex;
    align-items: center;
    transition: width 0.2s ease;
  }

  .volume-container:hover .volume-slider-wrap {
    width: 3.5rem;
  }

  .volume-slider-container {
    width: 100%;
    height: 2rem; /* Larger hit target (32px height) */
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    outline: none;
    padding: 0 0.3125rem; /* Inset track slightly so the handle does not clip on the edges */
    box-sizing: border-box;
  }

  .volume-slider-bar {
    width: 100%;
    height: 0.125rem; /* Ultra thin line */
    background: rgba(255, 255, 255, 0.25);
    position: relative;
    transition: height 0.15s ease;
  }

  .volume-container:hover .volume-slider-bar,
  .volume-slider-container:hover .volume-slider-bar {
    height: 0.25rem;
  }

  .volume-slider-progress {
    height: 100%;
    background: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
  }

  .volume-slider-handle {
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 9999px;
    background: #ffffff;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.15s ease;
    box-shadow: none;
    border: none;
  }

  .volume-container:hover .volume-slider-handle {
    transform: translate(-50%, -50%) scale(1);
  }

  /* Hide raw slots */
  .hidden-slot-wrap {
    display: none;
  }
`;
