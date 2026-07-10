import { css } from 'lit';

export const styles = css`
  :host {
    display: inline-block;
    vertical-align: text-bottom;
    font-size: var(--uibit-text-rotator-font-size, inherit);
    font-weight: var(--uibit-text-rotator-font-weight, inherit);
    color: var(--uibit-text-rotator-color, inherit);
    font-family: var(--uibit-text-rotator-font-family, inherit);
    line-height: var(--uibit-text-rotator-line-height, inherit);

    /* Pad the host horizontally to prevent clipping of long words, pull back with margin */
    padding: 0 4rem;
    margin: 0 -4rem;
  }

  .stage {
    display: inline-block;
    position: relative;
    width: max-content;
    min-width: 1ch;
    perspective: 20rem;
    transform-style: preserve-3d;

    /* Pad stage vertically to allow fade mask space above/below line box */
    padding: 1em 0;
    margin: -1em 0;

    /* Mask only the rotating words inside the stage */
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 1em, #000 calc(100% - 1em), transparent 100%);
    mask-image: linear-gradient(to bottom, transparent 0%, #000 1em, #000 calc(100% - 1em), transparent 100%);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
  }

  .word {
    display: inline-block;
    position: absolute;
    top: 1em; /* Align absolute words to stage content-box */
    left: 0;
    white-space: nowrap;
    transform-style: preserve-3d;
  }

  .word.active {
    position: relative;
    top: 0;
  }

  /* No animation on first render */
  .word.initial {
    position: static;
    opacity: 1;
  }

  /* Slide */
  .word.entering-slide {
    animation: slide-in var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  .word.leaving-slide {
    animation: slide-out var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  /* Flip */
  .word.entering-flip {
    animation: flip-in var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform-origin: 50% 0;
  }

  .word.leaving-flip {
    animation: flip-out var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.4, 0, 0.2, 1) forwards;
    transform-origin: 50% 100%;
  }

  @keyframes slide-in {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);   opacity: 1; }
  }

  @keyframes slide-out {
    from { transform: translateY(0);    opacity: 1; }
    to   { transform: translateY(-100%); opacity: 0; }
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
