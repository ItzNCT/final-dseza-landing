import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BannerSlide = {
  id: string | number;
  title: string;
  description?: string;
  href?: string;
  imageUrl?: string;
};

type BannerProps = {
  slides: BannerSlide[];
  autoPlayMs?: number;
  className?: string;
  showDots?: boolean;
  showArrows?: boolean;
  autoHeight?: boolean; // Tự canh chiều cao theo nội dung để không cắt chữ
  imageFit?: 'cover' | 'contain'; // Cách fit ảnh trong khung
  objectPosition?: string; // Vị trí focus của ảnh, ví dụ: 'center', 'top', 'center top'
  useImageAspectRatio?: boolean; // Tự lấy ratio theo từng ảnh
};

const Banner: React.FC<BannerProps> = ({
  slides,
  autoPlayMs = 5000,
  className,
  showDots = true,
  showArrows = true,
  autoHeight = true,
  imageFit = 'cover',
  objectPosition = 'center',
  useImageAspectRatio = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerDeltaXRef = useRef<number>(0);
  const [activeHeight, setActiveHeight] = useState<number | undefined>(undefined);

  const lastIndex = slides.length - 1;

  const goTo = useCallback((index: number) => {
    if (slides.length === 0) return;
    const next = (index + slides.length) % slides.length;
    setCurrentIndex(next);
  }, [slides.length]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((idx) => (idx + 1) % slides.length);
    }, autoPlayMs);
    return () => clearInterval(timer);
  }, [autoPlayMs, isPaused, slides.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
  }, [goNext, goPrev]);

  // Pointer/Touch swipe
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStartXRef.current = e.clientX;
    pointerDeltaXRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerStartXRef.current == null) return;
    pointerDeltaXRef.current = e.clientX - pointerStartXRef.current;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStartXRef.current == null) return;
    const delta = pointerDeltaXRef.current;
    pointerStartXRef.current = null;
    pointerDeltaXRef.current = 0;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  const slidesStyle = useMemo(() => ({
    transform: `translateX(-${currentIndex * 100}%)`,
  }), [currentIndex]);

  // Tính lại chiều cao dựa trên slide đang active (để không cắt chữ)
  const recalcHeight = useCallback(() => {
    if (!autoHeight) return;
    const el = slideRefs.current[currentIndex];
    if (el) {
      // Lấy chiều cao thực tế của nội dung slide
      const h = el.offsetHeight;
      if (h && Number.isFinite(h)) {
        setActiveHeight(h);
      }
    }
  }, [currentIndex, autoHeight]);

  useEffect(() => {
    recalcHeight();
  }, [recalcHeight, currentIndex, slides.length]);

  useEffect(() => {
    if (!autoHeight) return;
    const onResize = () => recalcHeight();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [autoHeight, recalcHeight]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full select-none",
        className
      )}
      style={{ backgroundColor: '#2c3640' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      role="region"
      aria-roledescription="carousel"
      aria-label="Banner carousel"
      tabIndex={0}
    >
      {/* Slides viewport */}
      <div
        className="overflow-hidden bg-transparent"
        style={autoHeight && activeHeight && !useImageAspectRatio ? { height: activeHeight } : undefined}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={slidesStyle}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-full"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}`}
              ref={(el) => { slideRefs.current[index] = el; }}
            >
              <BannerSlideContent
                slide={slide}
                isActive={index === currentIndex}
                autoHeight={autoHeight}
                imageFit={imageFit}
                objectPosition={objectPosition}
                useImageAspectRatio={useImageAspectRatio}
                onContentLoaded={recalcHeight}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Previous slide"
            onClick={goPrev}
          >
            <span aria-hidden>‹</span>
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-background/80 p-2 shadow hover:bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Next slide"
            onClick={goNext}
          >
            <span aria-hidden>›</span>
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && slides.length > 1 && (
        <div className="mt-2 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={cn(
                "h-2 w-2 rounded-full",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentIndex}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const BannerSlideContent: React.FC<{
  slide: BannerSlide;
  isActive: boolean;
  autoHeight?: boolean;
  imageFit?: 'cover' | 'contain';
  objectPosition?: string;
  useImageAspectRatio?: boolean;
  onContentLoaded?: () => void;
}> = ({ slide, autoHeight, imageFit = 'cover', objectPosition = 'center', useImageAspectRatio = true, onContentLoaded }) => {
  const hasImage = Boolean(slide.imageUrl);
  // Gọi callback khi ảnh/nội dung tải xong để recalculation chiều cao
  const [naturalRatio, setNaturalRatio] = useState<number | undefined>(undefined);
  const handleImgLoad = useCallback((e?: React.SyntheticEvent<HTMLImageElement>) => {
    if (useImageAspectRatio && e?.currentTarget?.naturalWidth && e?.currentTarget?.naturalHeight) {
      const w = e.currentTarget.naturalWidth;
      const h = e.currentTarget.naturalHeight;
      if (w > 0 && h > 0) {
        setNaturalRatio(w / h);
      }
    }
    onContentLoaded?.();
  }, [onContentLoaded, useImageAspectRatio]);
  return (
    <div
      className={cn(
        "relative",
        autoHeight || useImageAspectRatio ? "h-auto" : "h-28 sm:h-32 md:h-36 lg:h-40 xl:h-44"
      )}
      style={useImageAspectRatio && naturalRatio ? { aspectRatio: String(naturalRatio) } : undefined}
    >
      {hasImage ? (
        <img
          src={slide.imageUrl}
          alt={slide.title}
          className={cn(
            "w-full",
            autoHeight || useImageAspectRatio ? "h-auto" : "h-full",
            imageFit === 'cover' ? 'object-cover' : 'object-contain'
          )}
          style={{ objectPosition }}
          loading="lazy"
          onLoad={handleImgLoad}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400 text-white">
          <div className="px-4 text-center">
            <p className="text-sm font-medium sm:text-base">{slide.title}</p>
            {slide.description && (
              <p className="mt-1 text-xs opacity-90 sm:text-sm">{slide.description}</p>
            )}
          </div>
        </div>
      )}
      {slide.href && (
        <a
          href={slide.href}
          className="absolute inset-0"
          aria-label={slide.title}
        />
      )}
    </div>
  );
};

export default Banner;


