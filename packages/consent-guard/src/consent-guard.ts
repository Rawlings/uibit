import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { state } from 'lit/decorators.js';

/**
 * Gate any content behind a consent prompt. Shows the `placeholder` slot until
 * the user grants consent, then reveals the default slot.
 *
 * Consent is triggered by clicking any element with `[data-consent-accept]`
 * or `[data-consent-decline]` inside the placeholder slot, or by calling
 * the `accept()` / `decline()` methods programmatically.
 *
 * Content in the default slot is kept `display:none` until consent is granted,
 * so iframes with `loading="lazy"` will not make network requests beforehand.
 *
 * @fires consent-accepted - Fired when consent is granted
 * @fires consent-declined - Fired when consent is declined
 *
 * @slot placeholder - Shown before consent. Put your prompt UI here. Mark your
 *   accept button with `data-consent-accept` and decline with `data-consent-decline`.
 * @slot (default) - The content to reveal after consent (e.g. an iframe).
 *
 * @csspart placeholder - Wrapper around the placeholder slot
 * @csspart content - Wrapper around the default slot
 */
@customElement('uibit-consent-guard')
export class ConsentGuard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .placeholder {
      width: 100%;
    }

    .content {
      display: none;
      width: 100%;
    }

    :host([consented]) .placeholder {
      display: none;
    }

    :host([consented]) .content {
      display: block;
    }
  `;

  @state() private _consented = false;

  /** Programmatically grant consent. */
  accept() {
    if (this._consented) return;
    this._consented = true;
    this.setAttribute('consented', '');
    this.dispatchEvent(new CustomEvent('consent-accepted', { bubbles: true, composed: true }));
  }

  /** Programmatically decline consent. */
  decline() {
    this.dispatchEvent(new CustomEvent('consent-declined', { bubbles: true, composed: true }));
  }

  private _onPlaceholderClick(e: Event) {
    const path = e.composedPath() as Element[];
    if (path.some(el => el instanceof HTMLElement && el.hasAttribute('data-consent-accept'))) {
      this.accept();
    } else if (path.some(el => el instanceof HTMLElement && el.hasAttribute('data-consent-decline'))) {
      this.decline();
    }
  }

  render() {
    return html`
      <div class="placeholder" part="placeholder" @click=${this._onPlaceholderClick}>
        <slot name="placeholder"></slot>
      </div>
      <div class="content" part="content">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-consent-guard': ConsentGuard;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-consent-guard': ConsentGuard;
    }
  }
}

export default ConsentGuard;
