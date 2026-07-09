import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
    cursor: none;
    -webkit-user-select: none;
    user-select: none;
    line-height: 0;
  }

  :host([touch]) {
    cursor: default;
  }

  .base {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
  }

  ::slotted(img),
  ::slotted(picture) {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
  }

  .xray-slot {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .xray-slot ::slotted(img),
  .xray-slot ::slotted(picture) {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lens {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    overflow: hidden;
    pointer-events: none;
    box-shadow: var(
      --uibit-image-xray-lens-shadow,
      0 0 0 0.1875rem #ffffff,
      0 0.5rem 2rem rgba(0, 0, 0, 0.35)
    );
    transform: translate(-50%, -50%);
    will-change: transform;
    transition: opacity 0.15s ease;
    opacity: 0;
  }

  :host([active]) .lens {
    opacity: 1;
  }

  .lens-inner {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .lens-img {
    position: absolute;
    pointer-events: none;
  }
`;
