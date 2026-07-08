import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uibit-ab-test')
export class ABTest extends LitElement {
  @property({ type: String }) storageKey = 'uibit-ab-test-variant';
  @property({ type: Object }) variantDistribution: Record<string, number> = { 'a': 50, 'b': 50 };

  private selectedVariant: string | null = null;
  private isNewUser = true;

  connectedCallback() {
    super.connectedCallback();
    this.selectVariant();
  }

  private selectVariant() {
    const stored = localStorage.getItem(this.storageKey);
    if (stored) {
      this.selectedVariant = stored;
      this.isNewUser = false;
    } else {
      this.selectedVariant = this.getRandomVariant();
      localStorage.setItem(this.storageKey, this.selectedVariant);
    }

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

  private getRandomVariant(): string {
    const variants = Object.entries(this.variantDistribution);
    const totalWeight = variants.reduce((sum, [, weight]) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (const [variant, weight] of variants) {
      random -= weight;
      if (random <= 0) return variant;
    }

    return variants[0][0];
  }

  render() {
    return html`<slot name="variant-${this.selectedVariant}"></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-ab-test': ABTest;
  }
}

export default ABTest;
