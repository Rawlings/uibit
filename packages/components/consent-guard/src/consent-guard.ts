import { html, css } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { state } from 'lit/decorators.js';

/**
 * Gate any content behind a consent prompt. Shows the `placeholder` slot until

 * @summary A cookie and privacy consent guard wrapping third-party embedded resources.
 * the user grants consent, then reveals the default slot.
 *
 * Consent is triggered by clicking any element with `[data-consent-accept]`
 * inside the placeholder slot, or by calling the `accept()` method programmatically.
 *
 * Content in the default slot is kept `display:none` until consent is granted,
 * so iframes with `loading="lazy"` will not make network requests beforehand.
 *
 * @fires consent-accepted - Fired when consent is granted
 *
 * @slot placeholder - Shown before consent. Put your prompt UI here. Mark your
 *   accept button with `data-consent-accept`.
 * @slot (default) - The content to reveal after consent (e.g. an iframe).
 *
 * @csspart placeholder - Wrapper around the placeholder slot
 * @csspart content - Wrapper around the default slot
 
 * @cssstate accepted - Active when the user has accepted cookie/tracking terms.*/
@customElement('uibit-consent-guard')
export class ConsentGuard extends UIBitElement {
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
    this.dispatchCustomEvent('consent-accepted');
  }

  private _onPlaceholderClick(e: Event) {
    const path = e.composedPath() as Element[];
    if (path.some(el => el instanceof HTMLElement && el.hasAttribute('data-consent-accept'))) {
      this.accept();
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

export default ConsentGuard;
