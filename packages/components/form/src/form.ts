import { html, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, msg, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * A declarative form wrapper that wraps a native `<form>` and adds wizards,
 * submit lifecycle states, and dirty checking.
 *
 * @slot - Default slot where the native `<form>` element is placed.
 * @slot success - Custom success template displayed upon successful submission.
 * @slot error - Custom error template displayed upon failed submission.
 */
@customElement('uibit-form')
export class Form extends UIBitElement {
  static styles = styles;


  /** Opt-in warning prompt if the user tries to leave the page with unsaved changes. */
  @property({ type: Boolean, attribute: 'warn-unsaved' }) warnUnsaved = false;

  /** Active wizard step (1-indexed). Only active if multiple fieldsets exist. */
  @property({ type: Number, reflect: true }) step = 1;

  /** The total number of steps/fieldsets detected in the form. */
  @property({ type: Number, reflect: true, attribute: 'steps-count' }) stepsCount = 0;

  @state() private _stepTitles: string[] = [];
  @state() private _maxVisitedStep = 1;

  /** Tracks whether the form has unsaved changes. */
  @property({ type: Boolean, reflect: true }) dirty = false;

  /** Submission state: 'idle', 'pending', 'success', or 'error'. */
  @property({ type: String, reflect: true }) status: 'idle' | 'pending' | 'success' | 'error' = 'idle';

  private _slottedFormEl: HTMLFormElement | null = null;
  private _initialValues = new Map<Element, any>();
  private _observer?: MutationObserver;
  private _formListenersCleanups: Array<() => void> = [];

  connectedCallback() {
    super.connectedCallback();
    this.listen(window, 'beforeunload' as any, this._onBeforeUnload.bind(this) as any);
    this.listen(this, 'input', this._onFormInput.bind(this));
    this.listen(this, 'change', this._onFormInput.bind(this));
    this.listen(this, 'click', this._onFormClick.bind(this));

    this._observer = new MutationObserver(() => {
      this._initializeForm();
      this.requestUpdate();
    });
    this._observer.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._observer) {
      this._observer.disconnect();
    }
    this._cleanupFormListeners();
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this._initializeForm();
  }

  private _cleanupFormListeners() {
    for (const cleanup of this._formListenersCleanups) {
      cleanup();
    }
    this._formListenersCleanups = [];
  }

  private _initializeForm() {
    this._detectSlottedForm();
    this._detectSteps();
    this._captureInitialValues();
  }

  private _detectSlottedForm() {
    const form = this.querySelector('form');
    if (form !== this._slottedFormEl) {
      this._cleanupFormListeners();
      this._slottedFormEl = form;
      if (this._slottedFormEl) {
        // Intercept submit and reset on the slotted form element
        const submitCleanup = this.listen(this._slottedFormEl, 'submit', this._onSubmit.bind(this));
        const resetCleanup = this.listen(this._slottedFormEl, 'reset', this.reset.bind(this));
        this._formListenersCleanups.push(submitCleanup, resetCleanup);
      }
    }
  }

  private _detectSteps() {
    if (!this._slottedFormEl) {
      this.stepsCount = 0;
      this._stepTitles = [];
      return;
    }
    const fieldsets = this._slottedFormEl.querySelectorAll('fieldset');
    this.stepsCount = fieldsets.length;
    this._stepTitles = Array.from(fieldsets).map((fieldset, idx) => {
      const legend = fieldset.querySelector('legend');
      let title = fieldset.getAttribute('data-step-title') || '';
      if (!title && legend) {
        title = legend.textContent?.trim() || '';
        title = title.replace(/^step\s+\d+:\s*/i, '');
      }
      return title || `Step ${idx + 1}`;
    });
    this._updateStepVisibility();
  }

  private _updateStepVisibility() {
    if (this.stepsCount <= 1 || !this._slottedFormEl) return;
    const fieldsets = this._slottedFormEl.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset, idx) => {
      if (idx + 1 === this.step) {
        fieldset.style.display = '';
        fieldset.removeAttribute('disabled');
      } else {
        fieldset.style.display = 'none';
        fieldset.setAttribute('disabled', 'true');
      }
    });
  }

  private _getFormElements(): Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
    if (!this._slottedFormEl) return [];
    return Array.from(
      this._slottedFormEl.querySelectorAll('input, select, textarea')
    ) as Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  }

  private _captureInitialValues() {
    const elements = this._getFormElements();
    
    for (const key of this._initialValues.keys()) {
      if (!elements.includes(key as any)) {
        this._initialValues.delete(key);
      }
    }

    for (const el of elements) {
      if (!this._initialValues.has(el)) {
        this._initialValues.set(el, this._getElementValue(el));
      }
    }
  }

  private _getElementValue(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): any {
    if (el instanceof HTMLInputElement) {
      if (el.type === 'checkbox') {
        return el.checked;
      }
      if (el.type === 'radio') {
        return el.checked ? el.value : null;
      }
      return el.value;
    }
    if (el instanceof HTMLSelectElement) {
      if (el.multiple) {
        return Array.from(el.selectedOptions).map(opt => opt.value);
      }
      return el.value;
    }
    return el.value;
  }

  private _onFormInput() {
    this._checkDirty();
  }

  private _checkDirty() {
    const elements = this._getFormElements();
    let isDirty = false;

    for (const el of elements) {
      const initial = this._initialValues.get(el);
      const current = this._getElementValue(el);

      if (Array.isArray(initial) && Array.isArray(current)) {
        if (
          initial.length !== current.length ||
          !initial.every((val, idx) => current[idx] === val)
        ) {
          isDirty = true;
          break;
        }
      } else if (el.type === 'radio') {
        if (initial !== current) {
          isDirty = true;
          break;
        }
      } else if (initial !== current) {
        isDirty = true;
        break;
      }
    }

    this.dirty = isDirty;
  }

  private _onBeforeUnload(e: BeforeUnloadEvent) {
    if (this.warnUnsaved && this.dirty) {
      e.preventDefault();
      e.returnValue = msg('You have unsaved changes. Are you sure you want to leave?');
      return e.returnValue;
    }
  }

  private _onSlotChange() {
    this._initializeForm();
    this.requestUpdate();
  }

  // ── Step Navigation ────────────────────────────────────────────

  nextStep() {
    if (this.step < this.stepsCount && this._slottedFormEl) {
      const currentFieldset = this._slottedFormEl.querySelectorAll('fieldset')[this.step - 1];
      if (currentFieldset) {
        const inputs = currentFieldset.querySelectorAll('input, select, textarea');
        let allValid = true;
        for (const input of Array.from(inputs) as Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
          if (!input.checkValidity()) {
            input.reportValidity();
            allValid = false;
            break;
          }
        }
        if (!allValid) return;
      }

      this.step++;
      if (this.step > this._maxVisitedStep) {
        this._maxVisitedStep = this.step;
      }
      this._updateStepVisibility();
      this.dispatchCustomEvent('uibit-step-change', { step: this.step });
    }
  }

  prevStep() {
    if (this.step > 1) {
      this.step--;
      this._updateStepVisibility();
      this.dispatchCustomEvent('uibit-step-change', { step: this.step });
    }
  }

  goToStep(stepNum: number) {
    if (stepNum >= 1 && stepNum <= this.stepsCount && stepNum <= this._maxVisitedStep) {
      // Validate current step if trying to skip forward
      if (stepNum > this.step && this._slottedFormEl) {
        for (let i = this.step; i < stepNum; i++) {
          const fieldset = this._slottedFormEl.querySelectorAll('fieldset')[i - 1];
          if (fieldset) {
            const inputs = fieldset.querySelectorAll('input, select, textarea');
            let allValid = true;
            for (const input of Array.from(inputs) as Array<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
              if (!input.checkValidity()) {
                input.reportValidity();
                allValid = false;
                break;
              }
            }
            if (!allValid) return;
          }
        }
      }
      this.step = stepNum;
      if (this.step > this._maxVisitedStep) {
        this._maxVisitedStep = this.step;
      }
      this._updateStepVisibility();
      this.dispatchCustomEvent('uibit-step-change', { step: this.step });
    }
  }

  // ── Form Actions ───────────────────────────────────────────────

  private _isResetting = false;

  reset() {
    if (this._isResetting) return;
    this._isResetting = true;

    try {
      if (this._slottedFormEl) {
        this._slottedFormEl.reset();
      }
      const elements = this._getFormElements();
      for (const el of elements) {
        const initial = this._initialValues.get(el);
        if (initial !== undefined) {
          if (el instanceof HTMLInputElement && el.type === 'checkbox') {
            el.checked = !!initial;
          } else if (el instanceof HTMLInputElement && el.type === 'radio') {
            el.checked = el.value === initial;
          } else {
            el.value = initial;
          }
        }
      }

      this.dirty = false;
      this.status = 'idle';
      this.step = 1;
      this._maxVisitedStep = 1;
      this._updateStepVisibility();
      this.dispatchCustomEvent('uibit-reset');
    } finally {
      this._isResetting = false;
    }
  }

  async submit() {
    if (!this._slottedFormEl) return;

    if (!this._slottedFormEl.checkValidity()) {
      this._slottedFormEl.reportValidity();
      return;
    }

    const action = this._slottedFormEl.getAttribute('action');
    const method = this._slottedFormEl.getAttribute('method') || 'POST';

    if (action) {
      this.status = 'pending';
      const formData = new FormData(this._slottedFormEl);

      try {
        const response = await fetch(action, {
          method: method,
          body: method.toUpperCase() === 'GET' ? undefined : formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.status = 'success';
        this.dirty = false;
        this._initialValues.clear();
        this._captureInitialValues();
        this.dispatchCustomEvent('uibit-submit-success', { response });
      } catch (error) {
        this.status = 'error';
        this.dispatchCustomEvent('uibit-submit-error', { error });
      }
    } else {
      this._slottedFormEl.submit();
    }
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    if (this.stepsCount > 1 && this.step < this.stepsCount) {
      this.nextStep();
    } else {
      this.submit();
    }
  }

  private _onFormClick(e: Event) {
    const path = e.composedPath();

    const nextBtn = path.find(
      (el) => el instanceof HTMLElement && el.hasAttribute('data-uibit-form-next')
    );
    if (nextBtn) {
      e.preventDefault();
      this.nextStep();
      return;
    }

    const prevBtn = path.find(
      (el) => el instanceof HTMLElement && el.hasAttribute('data-uibit-form-prev')
    );
    if (prevBtn) {
      e.preventDefault();
      this.prevStep();
      return;
    }
  }

  protected willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('step')) {
      this._updateStepVisibility();
    }
  }

  render() {
    return html`
      ${this.stepsCount > 1
        ? html`
            <div class="wizard-header" part="wizard-header">
              <div class="wizard-meta" part="wizard-meta">
                <slot name="wizard-info">
                  <span class="wizard-step-info" part="wizard-step-info">
                    <span class="wizard-step-num" part="wizard-step-num">${this.step}</span>
                    <span class="wizard-step-sep" part="wizard-step-sep">/</span>
                    <span class="wizard-step-total" part="wizard-step-total">${this.stepsCount}</span>
                  </span>
                </slot>
                <slot name="step-title-${this.step}">
                  <span class="wizard-step-title" part="wizard-step-title">
                    ${this._stepTitles[this.step - 1] || ''}
                  </span>
                </slot>
              </div>
              <slot name="wizard-controls">
                <div class="wizard-controls" part="wizard-controls">
                  <button
                    type="button"
                    class="wizard-back-btn ${this.step === 1 ? 'disabled-control' : ''}"
                    part="wizard-back-btn"
                    ?disabled="${this.step === 1}"
                    @click="${this.prevStep}"
                    aria-label="Go to previous step"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                  </button>
                  <button
                    type="button"
                    class="wizard-next-btn ${this.step === this.stepsCount ? 'disabled-control' : ''}"
                    part="wizard-next-btn"
                    ?disabled="${this.step === this.stepsCount}"
                    @click="${this.nextStep}"
                    aria-label="Go to next step"
                  >
                    <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </button>
                </div>
              </slot>
            </div>
          `
        : nothing}

      <div class="state-content" data-state="pending">
        <slot name="loading"></slot>
      </div>

      <div class="state-content" data-state="success">
        <slot name="success"></slot>
      </div>

      ${this.status === 'error'
        ? html`
            <div class="error-banner" role="alert">
              <slot name="error"></slot>
            </div>
          `
        : nothing}

      <slot @slotchange="${this._onSlotChange}"></slot>
    `;
  }
}
