import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';

/**
 * Client-side A/B testing component. Randomly assigns a variant on first visit
 * and persists the assignment in `localStorage`. Variant can be overridden via
 * URL query parameter.
 *
 * @fires {{ variant: string, isNewUser: boolean }} variant-rendered - Fired after a variant is selected and rendered
 *
 * @slot variant-{key} - Content to render for the named variant (e.g. `slot="variant-a"`)
 */
@customElement('uibit-ab-test')
export class ABTest extends LitElement {
  /** `localStorage` key used to persist the assigned variant across sessions. */
  @property({ type: String }) storageKey = 'uibit-ab-test-variant';
  /** Map of variant names to their relative traffic weights (e.g. `{ a: 70, b: 30 }`). */
  @property({ type: Object }) variantDistribution: Record<string, number> = { 'a': 50, 'b': 50 };

  @state() private selectedVariant: string | null = null;
  @state() private isNewUser = true;

  connectedCallback() {
    super.connectedCallback();
    this.selectVariant();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('storageKey') ||
      changedProperties.has('variantDistribution')
    ) {
      this.selectVariant();
    }
  }

  private selectVariant() {
    const hasWindow = typeof window !== 'undefined';
    
    // 1. Check for URL parameter overrides (e.g. ?variant=a or ?uibit-ab-test-variant=a)
    if (hasWindow) {
      const urlParams = new URLSearchParams(window.location.search);
      const override = urlParams.get(this.storageKey) || urlParams.get('variant');
      if (override && this.variantDistribution[override] !== undefined) {
        this.selectedVariant = override;
        this.isNewUser = false;
        this.emitVariantRendered();
        return;
      }
    }

    // 2. Check for stored variant in localStorage
    let stored: string | null = null;
    if (hasWindow) {
      try {
        stored = localStorage.getItem(this.storageKey);
      } catch (e) {
        console.warn('uibit-ab-test: localStorage is not accessible', e);
      }
    }

    if (stored && this.variantDistribution[stored] !== undefined) {
      this.selectedVariant = stored;
      this.isNewUser = false;
    } else {
      this.selectedVariant = this.getRandomVariant();
      this.isNewUser = true;
      if (hasWindow) {
        try {
          localStorage.setItem(this.storageKey, this.selectedVariant);
        } catch (e) {
          console.warn('uibit-ab-test: localStorage is not writable', e);
        }
      }
    }

    this.emitVariantRendered();
  }

  private getRandomVariant(): string {
    const variants = Object.entries(this.variantDistribution);
    if (variants.length === 0) return 'a'; // Fallback
    
    const totalWeight = variants.reduce((sum, [, weight]) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (const [variant, weight] of variants) {
      random -= weight;
      if (random <= 0) return variant;
    }

    return variants[0]![0];
  }

  private emitVariantRendered() {
    this.dispatchEvent(
      new CustomEvent('variant-rendered', {
        detail: {
          variant: this.selectedVariant,
          isNewUser: this.isNewUser
        },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    if (!this.selectedVariant) return html``;
    return html`<slot name="variant-${this.selectedVariant}"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-ab-test': ABTest;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-ab-test': any;
    }
  }
}

export default ABTest;
