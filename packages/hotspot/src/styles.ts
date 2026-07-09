import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    width: 100%;
  }

  .hotspot-container {
    position: relative;
    width: 100%;
  }

  .hotspot-wrapper {
    position: absolute;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  .hotspot-trigger {
    width: var(--uibit-hotspot-trigger-size, 2rem);
    height: var(--uibit-hotspot-trigger-size, 2rem);
    background: var(--uibit-hotspot-trigger-bg, rgba(0, 0, 0, 0.65));
    border: var(--uibit-hotspot-trigger-border, 0.125rem solid #ffffff);
    border-radius: 9999rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.25);
    position: relative;
    transition: transform 150ms ease, background-color 150ms ease;
    outline: none;
    padding: 0;
  }

  .hotspot-trigger::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 9999rem;
    background: inherit;
    animation: pulse 2s infinite;
    z-index: -1;
    opacity: 0.5;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(2.2);
      opacity: 0;
    }
  }

  .hotspot-trigger:hover,
  .hotspot-trigger.active {
    background: var(--uibit-hotspot-trigger-bg-hover, rgba(0, 0, 0, 0.9));
    transform: scale(1.1);
  }

  .hotspot-trigger:focus-visible {
    box-shadow:
      0 0 0 0.125rem #000000,
      0 0.25rem 0.75rem rgba(0, 0, 0, 0.25);
  }

  .hotspot-trigger svg {
    color: var(--uibit-hotspot-trigger-color, #ffffff);
    pointer-events: none;
  }

  .hotspot-popover {
    position: absolute;
    width: 15rem;
    background: var(--uibit-hotspot-popover-bg, rgba(255, 255, 255, 0.96));
    backdrop-filter: blur(0.75rem);
    -webkit-backdrop-filter: blur(0.75rem);
    color: var(--uibit-hotspot-popover-color, #111827);
    padding: 0.875rem 1rem;
    border-radius: var(--uibit-hotspot-popover-border-radius, 0.75rem);
    box-shadow: var(
      --uibit-hotspot-popover-shadow,
      0 0.625rem 1.5rem rgba(0, 0, 0, 0.1),
      0 0.25rem 0.5rem rgba(0, 0, 0, 0.06)
    );
    border: var(--uibit-hotspot-popover-border, 0.0625rem solid rgba(0, 0, 0, 0.08));
    z-index: 20;
    display: flex;
    flex-direction: column;
    animation: fadeIn 200ms ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, 0.5rem);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  .hotspot-popover.position-above {
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .hotspot-popover.position-below {
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .hotspot-popover::after {
    content: '';
    position: absolute;
    border-style: solid;
    left: 50%;
    transform: translateX(-50%);
  }

  .hotspot-popover.position-above::after {
    top: 100%;
    border-width: 0.375rem 0.375rem 0 0.375rem;
    border-color: var(--uibit-hotspot-popover-bg, rgba(255, 255, 255, 0.96)) transparent transparent transparent;
  }

  .hotspot-popover.position-below::after {
    bottom: 100%;
    border-width: 0 0.375rem 0.375rem 0.375rem;
    border-color: transparent transparent var(--uibit-hotspot-popover-bg, rgba(255, 255, 255, 0.96)) transparent;
  }

  .popover-content h3 {
    margin: 0 0 0.375rem 0;
    font-size: var(--uibit-font-size-base, 0.9375rem);
    font-weight: var(--uibit-font-weight-semibold, 600);
    letter-spacing: var(--uibit-letter-spacing-tight, -0.01em);
    color: var(--uibit-hotspot-popover-color, #111827);
  }

  .popover-content p {
    margin: 0;
    font-size: var(--uibit-font-size-sm, 0.8125rem);
    line-height: var(--uibit-line-height-relaxed, 1.625);
    color: var(--uibit-hotspot-popover-content-color, #4b5563);
  }

  .popover-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    background: transparent;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
    line-height: 1;
    width: 1.25rem;
    height: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 9999rem;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .popover-close:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  .popover-close:focus-visible {
    outline: 0.125rem solid #000000;
    outline-offset: 0.125rem;
  }
`;
