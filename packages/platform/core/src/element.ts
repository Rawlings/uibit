import { LitElement, css } from 'lit';
import type { CSSResultGroup, PropertyDeclaration } from 'lit';
import { property } from 'lit/decorators.js';

/**
 * Utility to convert camelCase to kebab-case.
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * A foundational base class for all UIBit web components.
 * Provides custom event helpers, default kebab-case attribute mapping,
 * automatic cleanup/disposable tracking, and auto-injected reset styles.
 */
export class UIBitElement extends LitElement {
  /** BCP 47 locale string for formatting and localization. Defaults to inherited document language. */
  @property({ type: String }) locale = '';

  /**
   * Resolves the active locale for formatting and localization.
   * Checks the `locale` property first, then traverses up the DOM to find
   * the nearest ancestor with a `lang` attribute, and finally falls back
   * to undefined (which defaults to browser locale).
   */
  get resolvedLocale(): string | undefined {
    return (
      this.locale || this.closest('[lang]')?.getAttribute('lang') || undefined
    );
  }

  private _disposables: Set<() => void> = new Set();

  /**
   * Overrides createProperty to automatically map camelCase property names
   * to kebab-case attribute names by default.
   */
  static createProperty(name: PropertyKey, options?: PropertyDeclaration) {
    const keyStr = String(name);
    // Only map string keys (skip Symbol keys)
    if (typeof name === 'string') {
      const kebabName = camelToKebab(keyStr);
      const mutableOptions = options ? { ...options } : {};
      if (
        mutableOptions.attribute === undefined ||
        mutableOptions.attribute === true
      ) {
        mutableOptions.attribute = kebabName;
      }
      super.createProperty(name, mutableOptions);
    } else {
      super.createProperty(name, options);
    }
  }

  /**
   * Automatically prepends basic layout resets (border-box) to the
   * component's final styles.
   */
  static finalizeStyles(styles?: CSSResultGroup): Array<any> {
    const baseStyles = css`
      :host {
        box-sizing: border-box;
        font-family: var(--uibit-font-sans, inherit);
        color: var(--uibit-text-primary, inherit);
      }
      *,
      *::before,
      *::after {
        box-sizing: inherit;
      }
    `;
    const superStyles = super.finalizeStyles(styles);
    return [baseStyles, ...superStyles];
  }

  /**
   * Helper to dispatch a custom event with standard bubbles and composed options.
   */
  dispatchCustomEvent<T = any>(
    name: string,
    detail?: T,
    options?: Omit<CustomEventInit<T>, 'detail'>,
  ): boolean {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      ...options,
    });
    return this.dispatchEvent(event);
  }

  /**
   * Helper to retrieve a computed CSS custom property value from the element.
   */
  getCssPropertyValue(propertyName: string): string {
    return getComputedStyle(this).getPropertyValue(propertyName).trim();
  }

  /**
   * Register a cleanup function to be executed when the element is disconnected from the DOM.
   */
  registerDisposable(cleanup: () => void) {
    this._disposables.add(cleanup);
  }

  /**
   * Utility to add an event listener that is automatically cleaned up when the element is disconnected.
   */
  listen<K extends keyof HTMLElementEventMap>(
    target: EventTarget,
    type: K,
    listener: (this: EventTarget, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): () => void;
  listen(
    target: EventTarget,
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): () => void {
    target.addEventListener(type, listener, options);
    const cleanup = () => target.removeEventListener(type, listener, options);
    this.registerDisposable(cleanup);
    return cleanup;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const cleanup of this._disposables) {
      try {
        cleanup();
      } catch (e) {
        console.error('Error during disposable cleanup:', e);
      }
    }
    this._disposables.clear();
  }
}
