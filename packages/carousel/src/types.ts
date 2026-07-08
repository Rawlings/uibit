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
