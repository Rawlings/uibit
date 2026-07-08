export interface CarouselConfig {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  itemsPerView?: number;
  gap?: number;
  duration?: number;
}

export interface SlideChangeEvent extends CustomEvent {
  detail: {
    index: number;
    totalSlides: number;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-carousel': import('./carousel').UIBitCarousel;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-carousel': import('./carousel').UIBitCarousel;
    }
  }
}
