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
    line-height: var(--uibit-text-rotator-line-height, 1.2);
    height: var(--uibit-text-rotator-line-height, 1.2em);
  }

  .stage {
    position: relative;
    display: inline-block;
    white-space: nowrap;
  }

  .word {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 0;
    will-change: transform, opacity;
  }

  .word.entering-slide {
    animation: slide-in var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .word.leaving-slide {
    animation: slide-out var(--uibit-text-rotator-duration, 0.4s) cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
  }

  .word.entering-flip {
    animation: flip-in var(--uibit-text-rotator-duration, 0.5s) cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    transform-origin: 50% 0%;
  }

  .word.leaving-flip {
    animation: flip-out var(--uibit-text-rotator-duration, 0.5s) cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
    transform-origin: 50% 100%;
  }

  @keyframes slide-in {
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
  }

  @keyframes slide-out {
    from { transform: translateY(0);     opacity: 1; }
    to   { transform: translateY(-100%); opacity: 0; }
  }

  @keyframes flip-in {
    from { transform: rotateX(-90deg); opacity: 0; }
    to   { transform: rotateX(0deg);   opacity: 1; }
  }

  @keyframes flip-out {
    from { transform: rotateX(0deg);   opacity: 1; }
    to   { transform: rotateX(90deg);  opacity: 0; }
  }
`;
