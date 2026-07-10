import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    overflow: hidden;
    vertical-align: bottom;
    font-size: var(--uibit-text-rotator-font-size, inherit);
    font-weight: var(--uibit-text-rotator-font-weight, inherit);
    color: var(--uibit-text-rotator-color, inherit);
    font-family: var(--uibit-text-rotator-font-family, inherit);
    line-height: var(--uibit-text-rotator-line-height, var(--uibit-line-height-tight, 1.2));
    /* Height = one line */
    height: 1.2em;
  }

  .stage {
    display: inline-block;
    position: relative;
    width: max-content;
    min-width: 1ch;
    height: 100%;
    perspective: 20rem;
    transform-style: preserve-3d;
  }

  .word {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    white-space: nowrap;
    transform-style: preserve-3d;
  }

  .word.active {
    position: relative;
  }

  /* No animation on first render */
  .word.initial {
    position: static;
    opacity: 1;
  }

  /* Slide */
  .word.entering-slide {
    animation: slide-in var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0, 0, 0.2, 1) forwards;
  }

  .word.leaving-slide {
    animation: slide-out var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 1, 1) forwards;
  }

  /* Flip */
  .word.entering-flip {
    animation: flip-in var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0, 0, 0.2, 1) forwards;
    transform-origin: 50% 0;
  }

  .word.leaving-flip {
    animation: flip-out var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 1, 1) forwards;
    transform-origin: 50% 100%;
  }

  @keyframes slide-in {
    from { transform: translateY(50%); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }

  @keyframes slide-out {
    from { transform: translateY(0);    opacity: 1; }
    to   { transform: translateY(-50%); opacity: 0; }
  }

  @keyframes flip-in {
    from { transform: rotateX(-80deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }

  @keyframes flip-out {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(80deg);  opacity: 0; }
  }
`;
