import type { ReactiveController, ReactiveControllerHost } from 'lit';

/**
 * A reactive controller that monitors user interaction on form-associated elements.
 * Automatically adds and removes custom interaction states (touched, dirty, user-valid, user-invalid)
 * as CSS states via ElementInternals.states.
 */
export class InteractionController implements ReactiveController {
  /**
   * The host element this controller is attached to.
   */
  host: ReactiveControllerHost & HTMLElement;
  private _internals: ElementInternals;

  private _touched = false;
  private _dirty = false;

  constructor(
    host: ReactiveControllerHost & HTMLElement,
    internals: ElementInternals,
  ) {
    this.host = host;
    this._internals = internals;
    this.host.addController(this);
  }

  hostConnected() {
    this.host.addEventListener('blur', this.handleBlur, { capture: true });
    this.host.addEventListener('input', this.handleInput, { capture: true });
    this.host.addEventListener('change', this.handleChange, { capture: true });
  }

  hostDisconnected() {
    this.host.removeEventListener('blur', this.handleBlur, { capture: true });
    this.host.removeEventListener('input', this.handleInput, { capture: true });
    this.host.removeEventListener('change', this.handleChange, {
      capture: true,
    });
  }

  /**
   * Whether the element has been blurred by the user.
   */
  get touched() {
    return this._touched;
  }

  /**
   * Whether the element has received input or value changes.
   */
  get dirty() {
    return this._dirty;
  }

  /**
   * Resets the interaction state and removes any custom validity states.
   */
  reset() {
    this._touched = false;
    this._dirty = false;
    if (this._internals.states) {
      this._internals.states.delete('touched');
      this._internals.states.delete('dirty');
      this._internals.states.delete('user-invalid');
      this._internals.states.delete('user-valid');
    }
    this.host.requestUpdate();
  }

  private handleBlur = () => {
    const host = this.host as any;
    if (host.disabled || this._touched) return;
    this._touched = true;
    if (this._internals.states) {
      this._internals.states.add('touched');
    }
    this.updateUserValidity();
    this.host.requestUpdate();
  };

  private handleInput = () => {
    const host = this.host as any;
    if (host.disabled || host.readOnly || this._dirty) return;
    this._dirty = true;
    if (this._internals.states) {
      this._internals.states.add('dirty');
    }
    this.updateUserValidity();
    this.host.requestUpdate();
  };

  private handleChange = () => {
    const host = this.host as any;
    if (host.disabled || host.readOnly || this._dirty) return;
    this._dirty = true;
    if (this._internals.states) {
      this._internals.states.add('dirty');
    }
    this.updateUserValidity();
    this.host.requestUpdate();
  };

  /**
   * Evaluates the validation state and applies user-valid or user-invalid states.
   * Only applies states if the control has been interacted with (touched or dirty).
   */
  updateUserValidity() {
    if (!this._internals.states) return;

    if (this._touched || this._dirty) {
      const isValid = this._internals.checkValidity();
      if (isValid) {
        this._internals.states.add('user-valid');
        this._internals.states.delete('user-invalid');
      } else {
        this._internals.states.add('user-invalid');
        this._internals.states.delete('user-valid');
      }
    }
  }
}
