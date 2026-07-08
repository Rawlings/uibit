import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { CarouselConfig } from './types';
import styles from './carousel.css?inline';

@customElement('uibit-carousel')
export class UIBitCarousel extends LitElement {
  static styles = css`${styles}`;

  @property({ type: Boolean }) autoPlay = false;
  @property({ type: Number }) autoPlayInterval = 5000;
  @property({ type: Boolean }) loop = true;
  @property({ type: Number }) itemsPerView = 1;
  @property({ type: Number }) gap = 16;
  @property({ type: Number }) duration = 300;

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
      this.itemsPerView = config.itemsPerView ?? this.itemsPerView;
      this.gap = config.gap ?? this.gap;
      this.duration = config.duration ?? this.duration;
    }
  }

  protected firstUpdated() {
    this.setupCarousel();
    this.setupAutoPlay();
    this.setupKeyboardNavigation();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('itemsPerView') ||
      changedProperties.has('gap') ||
      changedProperties.has('duration')
    ) {
      this.updateCSSVariables();
    }

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

    this.updateCSSVariables();
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

  private updateCSSVariables() {
    this.style.setProperty(
      '--carousel-items-per-view',
      String(this.itemsPerView)
    );
    this.style.setProperty('--carousel-gap', `${this.gap}px`);
    this.style.setProperty('--carousel-duration', `${this.duration}ms`);
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
      this.updateCSSVariables();
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
      <div class="carousel">
        <div class="carousel-viewport" role="region" aria-label="Carousel">
          <div
            class="carousel-content"
            role="listbox"
            aria-label="Carousel items"
          >
            <slot name="item" @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>

        <div class="carousel-controls">
          <div class="carousel-buttons">
            <button
              class="carousel-button"
              aria-label="Previous slide"
              ?disabled=${!this.canPrev}
              @click=${() => this.prev()}
            >
              ← Prev
            </button>
            <button
              class="carousel-button"
              aria-label="Next slide"
              ?disabled=${!this.canNext}
              @click=${() => this.next()}
            >
              Next →
            </button>
          </div>

          <div class="carousel-indicators" role="tablist">
            ${Array.from({ length: this.totalSlides }).map(
              (_, index) => html`
                <button
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

declare global {
  interface HTMLElementTagNameMap {
    'uibit-carousel': UIBitCarousel;
  }
}

export default UIBitCarousel;
