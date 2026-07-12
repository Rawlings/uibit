import { css } from 'lit';

export const styles = css`
  :host {
    display: block;
    position: relative;
    font-size: var(--uibit-component-font-size, var(--uibit-font-size-base, 1rem));
    font-weight: var(--uibit-component-font-weight, var(--uibit-font-weight-normal, 400));
    line-height: var(--uibit-component-line-height, var(--uibit-line-height-relaxed, 1.625));
    --uibit-form-wizard-margin: var(--uibit-form-wizard-margin-val, 2rem);
  }

  /* Premium Minimalist Stepper Header (Split Layout) */
  .wizard-header {
    margin-bottom: var(--uibit-form-wizard-margin, 2rem);
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.5rem;
  }

  .wizard-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .wizard-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .wizard-back-btn,
  .wizard-next-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    color: #6b7280;
    border-radius: 999rem;
    transition: color 150ms ease, background-color 150ms ease, transform 150ms ease, opacity 150ms ease;
  }

  .wizard-back-btn:hover,
  .wizard-next-btn:hover {
    color: #111827;
    background-color: #f3f4f6;
  }

  .wizard-back-btn:active,
  .wizard-next-btn:active {
    transform: scale(0.95);
  }

  .wizard-back-btn:focus-visible,
  .wizard-next-btn:focus-visible {
    outline: 0.125rem solid #000000;
  }

  .wizard-step-info {
    font-size: var(--uibit-font-size-xs, 0.75rem);
    font-weight: 500;
    color: #9ca3af;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    user-select: none;
  }

  .wizard-step-num {
    color: #111827;
    font-weight: 600;
  }

  .wizard-step-sep {
    opacity: 0.5;
  }

  .wizard-step-total {
    opacity: 0.8;
  }

  ::slotted([slot^="step-title-"]),
  .wizard-step-title {
    font-family: var(--uibit-font-family, Inter, sans-serif);
    font-size: var(--uibit-font-size-sm, 0.875rem);
    font-weight: 650;
    color: #111827;
    letter-spacing: -0.01em;
    user-select: none;
  }

  /* Stabilized layout hidden state */
  .disabled-control {
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  /* Premium inline error banner */
  .error-banner {
    padding: 1rem 0;
    font-size: var(--uibit-font-size-sm, 0.875rem);
    color: #111827;
    margin-bottom: 0.5rem;
  }

  /* State content wrappers */
  .state-content {
    display: none;
  }

  :host([status="pending"]) .state-content[data-state="pending"] {
    display: block;
  }

  :host([status="success"]) .state-content[data-state="success"] {
    display: block;
  }

  /* Correctly hide the slotted form element on success and pending states */
  :host([status="success"]) ::slotted(form),
  :host([status="pending"]) ::slotted(form) {
    display: none !important;
  }
`;
