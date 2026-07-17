import { analyzeSource } from './index.js';

const source = `
import { html } from 'lit';
import { customElement, msg, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Thin progress bar that tracks scroll position — either the page or a
 *
 * @summary A responsive viewport or container scroll progress indicator bar.
 * custom scrollable element — and fills as the user scrolls down.
 *
 * @cssprop [--uibit-scroll-progress-height=0.1875rem] - Height of the progress bar
 * @cssprop [--uibit-scroll-progress-bg=transparent] - Background (track) color
 * @cssprop [--uibit-scroll-progress-color=#000000] - Fill color of the progress indicator
 */
@customElement('uibit-scroll-progress')
export class ScrollProgress extends UIBitElement {
  static styles = styles;

  /** CSS selector of a custom scrollable container to track. Defaults to the page (\`window\`). */
  @property({ type: String, attribute: 'target-selector' }) targetSelector?: string;

  @state() private progressPercent = 0;

  private _scrollUnlisten?: () => void;
  private _cachedTarget?: HTMLElement | Window;
  private _rafId?: number;

  connectedCallback() {
    super.connectedCallback();
    this._attachScrollListener();
    this.updateProgress();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._rafId) cancelAnimationFrame(this._rafId);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('targetSelector')) {
      this._cachedTarget = undefined;
      this._attachScrollListener();
      this.updateProgress();
    }
  }

  private _getTargetElement(): HTMLElement | Window {
    if (typeof window === 'undefined') return window;
    if (!this._cachedTarget) {
      if (this.targetSelector) {
        const el = document.querySelector(this.targetSelector);
        this._cachedTarget = el ? (el as HTMLElement) : window;
      } else {
        this._cachedTarget = window;
      }
    }
    return this._cachedTarget;
  }

  private _attachScrollListener() {
    if (this._scrollUnlisten) this._scrollUnlisten();
    const target = this._getTargetElement();
    const handler = () => {
      if (!this._rafId) {
        this._rafId = requestAnimationFrame(() => {
          this._rafId = undefined;
          this.updateProgress();
        });
      }
    };
    this._scrollUnlisten = this.listen(target, 'scroll', handler, { passive: true });
  }

  private updateProgress() {
    let scrollTop = 0;
    let docHeight = 0;

    const target = this._cachedTarget ?? this._getTargetElement();
    if (target === window) {
      scrollTop = window.scrollY;
      docHeight = document.documentElement.scrollHeight - window.innerHeight;
    } else {
      const el = target as HTMLElement;
      scrollTop = el.scrollTop;
      docHeight = el.scrollHeight - el.clientHeight;
    }

    this.progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  render() {
    return html\`
      <div 
        part="progress"
        class="progress" 
        style="width: \${this.progressPercent}%"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="\${Math.round(this.progressPercent)}"
        aria-label=\${msg('Scroll progress indicator')}
      ></div>
    \`;
  }
}

export default ScrollProgress;
`;

const res = JSON.parse(analyzeSource(source, 'scroll-progress.ts'));
console.log('Result:', JSON.stringify(res, null, 2));
