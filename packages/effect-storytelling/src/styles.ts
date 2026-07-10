import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;

    /* Internal layout tokens */
    --_stage-height: var(--uibit-effect-storytelling-stage-height, 100vh);
    --_gap: var(--uibit-effect-storytelling-gap, 0rem);
    --_track-width: var(--uibit-effect-storytelling-track-width, 1fr);
    --_stage-width: var(--uibit-effect-storytelling-stage-width, 1fr);
    --_transition: var(--uibit-effect-storytelling-transition, 0.45s cubic-bezier(0.4, 0, 0.2, 1));
  }

  /* ── Outer container ──────────────────────────────────────────────────────── */

  .outer {
    display: flex;
    align-items: flex-start;
    gap: var(--_gap);
  }

  /* ── Stage wrapper (sticky) ───────────────────────────────────────────────── */

  .stage-wrapper {
    position: sticky;
    top: 0;
    height: var(--_stage-height);
    overflow: hidden;
    flex-shrink: 0;
    flex: 1 1 0;
  }

  .stage-inner {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  /* ── Overlay wrapper ──────────────────────────────────────────────────────── */

  .overlay-wrapper {
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
  }

  .overlay-wrapper ::slotted(*) {
    pointer-events: auto;
  }

  /* ── Track wrapper ────────────────────────────────────────────────────────── */

  .track-wrapper {
    flex: 1 1 0;
    min-height: var(--_stage-height);
  }

  /* ── track-alignment: right (default) — stage left, track right ──────────── */

  :host([track-alignment="right"]) .outer,
  :host(:not([track-alignment])) .outer {
    flex-direction: row;
  }

  :host([track-alignment="right"]) .stage-wrapper,
  :host(:not([track-alignment])) .stage-wrapper {
    order: 0;
  }

  :host([track-alignment="right"]) .track-wrapper,
  :host(:not([track-alignment])) .track-wrapper {
    order: 1;
  }

  /* ── track-alignment: left — track left, stage right ─────────────────────── */

  :host([track-alignment="left"]) .outer {
    flex-direction: row;
  }

  :host([track-alignment="left"]) .stage-wrapper {
    order: 1;
  }

  :host([track-alignment="left"]) .track-wrapper {
    order: 0;
  }

  /* ── track-alignment: center / overlap — stage full-width, track on top ──── */

  :host([track-alignment="center"]) .outer,
  :host([track-alignment="overlap"]) .outer {
    display: block;
    position: relative;
  }

  :host([track-alignment="center"]) .stage-wrapper,
  :host([track-alignment="overlap"]) .stage-wrapper {
    width: 100%;
    flex: none;
  }

  :host([track-alignment="center"]) .track-wrapper,
  :host([track-alignment="overlap"]) .track-wrapper {
    position: relative;
    z-index: 2;
    /* Pull track up to visually start at the same position as the stage */
    margin-top: calc(-1 * var(--_stage-height));
    min-height: var(--_stage-height);
    /* Track items need a transparent or semi-transparent background */
    pointer-events: none;
    flex: none;
    width: 100%;
  }

  :host([track-alignment="center"]) .track-wrapper ::slotted(*),
  :host([track-alignment="overlap"]) .track-wrapper ::slotted(*) {
    pointer-events: auto;
  }

  /* Center variant: constrain track width to a readable column */
  :host([track-alignment="center"]) .track-wrapper {
    max-width: 36rem;
    margin-inline: auto;
  }

  /* ── Snap points ──────────────────────────────────────────────────────────── */

  :host([snap-points]) .track-wrapper {
    scroll-snap-type: y mandatory;
  }

  /* ── Reduced motion ───────────────────────────────────────────────────────── */

  @media (prefers-reduced-motion: reduce) {
    .stage-inner * {
      transition: none !important;
      animation: none !important;
    }
  }
`;
