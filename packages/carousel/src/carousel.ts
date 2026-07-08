import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, query, state } from 'lit/decorators.js';
import type { CarouselConfig } from './types';
import { styles } from './styles';

/**
 * Accessible, scroll-driven carousel with keyboard navigation, auto-play,
 * and configurable items-per-view via CSS custom properties.
 *
 * @fires {{ index: number, totalSlides: number }} slide-change - Fired when the active slide changes
 *
 * @slot item - One or more slide elements (add `slot="item"` to each child)
 *
 * @cssprop [--uibit-carousel-gap=16px] - Gap between slides
 * @cssprop [--uibit-carousel-duration=300ms] - Scroll animation duration
 * @cssprop [--uibit-carousel-items-per-view=1] - Number of slides visible at once
 * @cssprop [--uibit-carousel-border-color=#e5e7eb] - Border color of the viewport
 * @cssprop [--uibit-carousel-button-bg=#f3f4f6] - Background of prev/next buttons
 * @cssprop [--uibit-carousel-button-bg-hover=#e5e7eb] - Hover background of prev/next buttons
 * @cssprop [--uibit-carousel-indicator-bg=#e5e7eb] - Background of inactive indicator dots
 * @cssprop [--uibit-carousel-indicator-active-bg=#000000] - Background of the active indicator dot
 * @cssprop [--uibit-carousel-focus-outline-color=#000000] - Color of the focus outline on buttons
 *
 * @csspart carousel - The root carousel container
 * @csspart viewport - The overflow-hidden viewport
 * @csspart content - The scrollable slides row
 * @csspart controls - The control bar below the viewport
 * @csspart buttons - The prev/next button group
 * @csspart button - Each navigation button
 * @csspart button-prev - The previous slide button
 * @csspart button-next - The next slide button
 * @csspart indicators - The indicator dot group
 * @csspart indicator - Each indicator dot
 * @csspart indicator-active - Added to the active indicator dot
 */
@customElement('uibit-carousel')
export class UIBitCarousel extends LitElement {
  static styles = styles;

  /** Automatically advance slides on a timer. */
  @property({ type: Boolean }) autoPlay = false;
  /** Milliseconds between auto-play advances. */
  @property({ type: Number }) autoPlayInterval = 5000;
  /** When `true`, the carousel wraps from the last slide back to the first. */
  @property({ type: Boolean }) loop = true;

  get itemsPerView(): number {
    if (typeof window === 'undefined') return 1;
    const val = getComputedStyle(this).getPropertyValue('--uibit-carousel-items-per-view').trim();
    return val ? parseFloat(val) || 1 : 1;
  }

  get gap(): number {
    if (typeof window === 'undefined') return 16;
    const val = getComputedStyle(this).getPropertyValue('--uibit-carousel-gap').trim();
    return val ? parseFloat(val) ?? 16 : 16;
  }

  get duration(): number {
    if (typeof window === 'undefined') return 300;
    const val = getComputedStyle(this).getPropertyValue('--uibit-carousel-duration').trim();
    if (!val) return 300;
    if (val.endsWith('ms')) return parseFloat(val) || 300;
    if (val.endsWith('s')) return (parseFloat(val) * 1000) || 300;
    return parseFloat(val) || 300;
  }

  @query('.carousel-content') content?: HTMLElement;
  @query('.carousel-viewport') viewport?: HTMLElement;

  @state() currentIndex = 0;
  @state() totalSlides = 0;
  @state() canPrev = false;
  @state() canNext = true;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isProgrammaticScroll = false;
  private programmaticScrollTimeout?: number;

  private handleScroll = () => this.onScroll();
  private handleInteraction = () => this.onInteraction();

  constructor(config?: CarouselConfig) {
    super();
    if (config) {
      this.autoPlay = config.autoPlay ?? this.autoPlay;
      this.autoPlayInterval = config.autoPlayInterval ?? this.autoPlayInterval;
      this.loop = config.loop ?? this.loop;
      if (config.itemsPerView !== undefined) {
        this.style.setProperty('--uibit-carousel-items-per-view', String(config.itemsPerView));
      }
      if (config.gap !== undefined) {
        this.style.setProperty('--uibit-carousel-gap', typeof config.gap === 'number' ? `${config.gap}px` : config.gap);
      }
      if (config.duration !== undefined) {
        this.style.setProperty('--uibit-carousel-duration', typeof config.duration === 'number' ? `${config.duration}ms` : config.duration);
      }
    }
  }

  protected firstUpdated() {
    this.setupCarousel();
    this.setupAutoPlay();
    this.setupKeyboardNavigation();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('autoPlay') ||
      changedProperties.has('autoPlayInterval')
    ) {
      if (this.autoPlay) {
        this.setupAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoPlay();
    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }
    this.resizeObserver?.disconnect();
    this.intersectionObserver?.disconnect();
    if (this.content) {
      this.content.removeEventListener('scroll', this.handleScroll);
      this.content.removeEventListener('touchstart', this.handleInteraction);
      this.content.removeEventListener('mousedown', this.handleInteraction);
    }
  }

  private setupCarousel() {
    if (!this.content) return;

    this.intersectionObserver?.disconnect();
    this.resizeObserver?.disconnect();

    const items = this.getSlides();
    this.totalSlides = items.length;

    this.updateNavigationState();
    this.setupIntersectionObserver();
    this.setupResizeObserver();

    // Prevent duplicate event listeners by removing first
    this.content.removeEventListener('scroll', this.handleScroll);
    this.content.removeEventListener('touchstart', this.handleInteraction);
    this.content.removeEventListener('mousedown', this.handleInteraction);

    this.content.addEventListener('scroll', this.handleScroll);
    this.content.addEventListener('touchstart', this.handleInteraction);
    this.content.addEventListener('mousedown', this.handleInteraction);
  }

  private setupIntersectionObserver() {
    const items = this.getSlides();
    if (items.length === 0) return;

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (this.isProgrammaticScroll) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = items.indexOf(entry.target as HTMLElement);
            if (index !== -1 && index !== this.currentIndex) {
              this.currentIndex = index;
              this.updateNavigationState();
              this.emitSlideChange();
            }
          }
        });
      },
      {
        root: this.content,
        threshold: 0.5
      }
    );

    items.forEach((item) => this.intersectionObserver?.observe(item));
  }

  private setupResizeObserver() {
    if (!this.content) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.updateNavigationState();
    });
    this.resizeObserver.observe(this.content);
  }

  private setupKeyboardNavigation() {
    this.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });
  }

  private setupAutoPlay() {
    this.stopAutoPlay();
    if (!this.autoPlay || !this.content) return;

    this.autoPlayTimer = window.setInterval(() => {
      if (this.currentIndex < this.totalSlides - 1) {
        this.next();
      } else if (this.loop) {
        this.scrollToSlide(0);
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private onInteraction() {
    this.stopAutoPlay();
    if (this.autoPlay) {
      this.setupAutoPlay();
    }
  }

  private onScroll() {
    if (this.isProgrammaticScroll) return;
    
    // Fallback if IntersectionObserver is delayed
    const items = this.getSlides();
    if (this.content && items.length > 0) {
      const scrollLeft = this.content.scrollLeft;
      const width = this.content.clientWidth;
      const newIndex = Math.round(scrollLeft / (width / this.itemsPerView));
      if (newIndex >= 0 && newIndex < items.length && newIndex !== this.currentIndex) {
        this.currentIndex = newIndex;
        this.updateNavigationState();
        this.emitSlideChange();
      }
    }
    
    this.updateNavigationState();
  }

  private getSlides(): HTMLElement[] {
    if (!this.content) return [];
    return Array.from(
      this.content.querySelectorAll('[slot="item"]')
    ) as HTMLElement[];
  }

  private updateNavigationState() {
    this.canPrev = this.currentIndex > 0;
    this.canNext = this.currentIndex < this.totalSlides - 1 || this.loop;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.scrollToSlide(this.currentIndex - 1);
    } else if (this.loop) {
      this.scrollToSlide(this.totalSlides - 1);
    }
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.scrollToSlide(this.currentIndex + 1);
    } else if (this.loop) {
      this.scrollToSlide(0);
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.totalSlides) {
      this.scrollToSlide(index);
    }
  }

  private scrollToSlide(index: number) {
    if (!this.content) return;

    const items = this.getSlides();
    const item = items[index];

    if (item) {
      this.isProgrammaticScroll = true;
      if (this.programmaticScrollTimeout) {
        clearTimeout(this.programmaticScrollTimeout);
      }

      item.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });

      this.currentIndex = index;
      this.updateNavigationState();
      this.emitSlideChange();

      const onScrollEnd = () => {
        this.isProgrammaticScroll = false;
        this.content?.removeEventListener('scrollend', onScrollEnd);
      };

      if ('onscrollend' in window) {
        this.content.addEventListener('scrollend', onScrollEnd);
      }

      this.programmaticScrollTimeout = window.setTimeout(() => {
        this.isProgrammaticScroll = false;
        if (this.content && 'onscrollend' in window) {
          this.content.removeEventListener('scrollend', onScrollEnd);
        }
      }, this.duration + 100);
    }
  }

  private emitSlideChange() {
    this.dispatchEvent(
      new CustomEvent('slide-change', {
        detail: {
          index: this.currentIndex,
          totalSlides: this.totalSlides
        },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleSlotChange() {
    this.setupCarousel();
  }

  render() {
    return html`
      <div part="carousel" class="carousel">
        <div part="viewport" class="carousel-viewport" role="region" aria-label="Carousel">
          <div
            part="content"
            class="carousel-content"
            role="listbox"
            aria-label="Carousel items"
          >
            <slot name="item" @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>

        <div part="controls" class="carousel-controls">
          <div part="buttons" class="carousel-buttons">
            <button
              part="button button-prev"
              class="carousel-button"
              aria-label="Previous slide"
              ?disabled=${!this.canPrev}
              @click=${() => this.prev()}
            >
              ← Prev
            </button>
            <button
              part="button button-next"
              class="carousel-button"
              aria-label="Next slide"
              ?disabled=${!this.canNext}
              @click=${() => this.next()}
            >
              Next →
            </button>
          </div>

          <div part="indicators" class="carousel-indicators" role="tablist">
            ${Array.from({ length: this.totalSlides }).map(
              (_, index) => html`
                <button
                  part="indicator ${index === this.currentIndex ? 'indicator-active' : ''}"
                  class="carousel-indicator ${index === this.currentIndex
                    ? 'active'
                    : ''}"
                  aria-label="Go to slide ${index + 1}"
                  aria-selected=${index === this.currentIndex}
                  @click=${() => this.goToSlide(index)}
                ></button>
              `
            )}
          </div>
        </div>
      </div>
    `;
  }
}

export default UIBitCarousel;
