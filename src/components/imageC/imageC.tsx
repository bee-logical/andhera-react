'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

// ============================================
// 📦 TYPE DEFINITIONS
// ============================================

export interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}

export type CarouselVariant = 'fade' | 'slide' | 'zoom' | 'cards';
export type CaptionPosition = 'bottom' | 'overlay';
export type ArrowVariant = 'inside' | 'outside';
export type IndicatorVariant = 'dots' | 'bars' | 'thumbnails';
export type AnimationTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

export interface ImageCarouselProps {
  // Required
  images: CarouselImage[];
  
  // Variant & Style
  variant?: CarouselVariant;
  height?: string;
  width?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  
  // Autoplay
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  
  // Navigation
  showArrows?: boolean;
  showIndicators?: boolean;
  showThumbnails?: boolean;
  arrowVariant?: ArrowVariant;
  indicatorVariant?: IndicatorVariant;
  indicatorColor?: string;
  keyboardNavigation?: boolean;
  
  // Captions
  showCaptions?: boolean;
  captionPosition?: CaptionPosition;
  
  // Animation
  transitionDuration?: number;
  animation?: AnimationTiming;
  
  // Callbacks
  onSlideChange?: (index: number) => void;

  // Slide Counter
  showSlideCounter?: boolean;
}

// ============================================
// 🎨 MAIN COMPONENT
// ============================================

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  variant = 'slide',
  height = '400px',
  width = '100%',
  rounded = 'lg',
  className = '',
  autoPlay = true,
  interval = 3000,
  pauseOnHover = true,
  loop = true,
  showArrows = true,
  showIndicators = true,
  showThumbnails = false,
  arrowVariant = 'inside',
  indicatorVariant = 'dots',
  indicatorColor = '#f59e0b',
  keyboardNavigation = true,
  showCaptions = true,
  captionPosition = 'bottom',
  transitionDuration = 500,
  animation = 'ease-in-out',
  onSlideChange,
  showSlideCounter = true,
}) => {
  // ============================================
  // 🔧 STATE & REFS
  // ============================================
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // ============================================
  // 🎯 NAVIGATION HANDLERS
  // ============================================
  
  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const nextIndex = prev === images.length - 1 ? (loop ? 0 : prev) : prev + 1;
      onSlideChange?.(nextIndex);
      return nextIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [images.length, loop, isTransitioning, transitionDuration, onSlideChange]);
  
  const handlePrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const prevIndex = prev === 0 ? (loop ? images.length - 1 : 0) : prev - 1;
      onSlideChange?.(prevIndex);
      return prevIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [images.length, loop, isTransitioning, transitionDuration, onSlideChange]);
  
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    onSlideChange?.(index);
    
    setTimeout(() => setIsTransitioning(false), transitionDuration);
  }, [currentIndex, isTransitioning, transitionDuration, onSlideChange]);
  
  // ============================================
  // ⏱️ AUTOPLAY EFFECT
  // ============================================
  
  useEffect(() => {
    if (!autoPlay || isPaused || images.length <= 1) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    
    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, handleNext, images.length]);
  
  // ============================================
  // ⌨️ KEYBOARD NAVIGATION
  // ============================================
  
  useEffect(() => {
    if (!keyboardNavigation) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, handleNext, handlePrev]);
  
  // ============================================
  // 📱 TOUCH/SWIPE HANDLERS
  // ============================================
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };
  
  // ============================================
  // 🎨 RENDER HELPERS
  // ============================================
  
  const getSlideStyles = (index: number) => {
    const baseStyles: React.CSSProperties = {
      transitionDuration: `${transitionDuration}ms`,
      transitionTimingFunction: animation,
    };
    
    switch (variant) {
      case 'slide':
        return {
          ...baseStyles,
          transform: `translateX(${(index - currentIndex) * 100}%)`,
          opacity: 1,
        };
      
      case 'fade':
        return {
          ...baseStyles,
          opacity: index === currentIndex ? 1 : 0,
          transform: 'none',
          pointerEvents: index === currentIndex ? 'auto' : 'none',
        } as React.CSSProperties;
      
      case 'zoom':
        return {
          ...baseStyles,
          opacity: index === currentIndex ? 1 : 0,
          transform: index === currentIndex ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: index === currentIndex ? 'auto' : 'none',
        } as React.CSSProperties;
      
      case 'cards':
        const offset = index - currentIndex;
        return {
          ...baseStyles,
          transform: `translateX(${offset * 85}%) scale(${index === currentIndex ? 1 : 0.85})`,
          opacity: Math.abs(offset) > 1 ? 0 : 1,
          zIndex: index === currentIndex ? 10 : 5 - Math.abs(offset),
        };
      
      default:
        return baseStyles;
    }
  };
  
  const roundedClass = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  }[rounded];
  
  // ============================================
  // 🖼️ RENDER
  // ============================================
  
  if (!images || images.length === 0) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${roundedClass} ${className}`} style={{ height, width }}>
        <p className="text-gray-500">No images to display</p>
      </div>
    );
  }
  
  return (
    <div
      className={`image-carousel-container ${className}`}
      style={{ width }}
      ref={carouselRef}
    >
      {/* Main Carousel Wrapper */}
      <div
        className={`relative overflow-hidden bg-transparent ${roundedClass} ${arrowVariant === 'outside' ? 'mx-12' : ''}`}
        style={{ height }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Image carousel"
        aria-live="polite"
      >
        {/* Slides */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 transition-all"
              style={getSlideStyles(index)}
            >
              <img
                src={image.src}
                alt={image.alt || `Slide ${index + 1}`}
                className={`w-full h-full object-cover ${roundedClass} transition-transform duration-300 hover:scale-105`}
                draggable={false}
              />
              
              {/* Gradient Overlay for Better Text Readability */}
              {showCaptions && captionPosition === 'overlay' && image.caption && index === currentIndex && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              )}
              
              {/* Caption Overlay */}
              {showCaptions && captionPosition === 'overlay' && image.caption && index === currentIndex && (
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-opacity duration-500">
                  <p className="text-lg font-medium drop-shadow-lg">{image.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        {showArrows && images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
                arrowVariant === 'inside' ? 'left-4' : '-left-12'
              } bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg z-20`}
              aria-label="Previous slide"
              disabled={!loop && currentIndex === 0}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={handleNext}
              className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${
                arrowVariant === 'inside' ? 'right-4' : '-right-12'
              } bg-black/40 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg z-20`}
              aria-label="Next slide"
              disabled={!loop && currentIndex === images.length - 1}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
        
        {/* Slide Counter */}
        {showSlideCounter && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium z-20">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Caption Below */}
      {showCaptions && captionPosition === 'bottom' && images[currentIndex]?.caption && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 text-base font-medium transition-opacity duration-500">
            {images[currentIndex].caption}
          </p>
        </div>
      )}
      
      {/* Indicators */}
      {showIndicators && images.length > 1 && indicatorVariant !== 'thumbnails' && (
        <div className="flex justify-center mt-4 gap-2" role="tablist">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                indicatorVariant === 'dots'
                  ? `w-3 h-3 rounded-full ${
                      index === currentIndex ? 'scale-110' : 'opacity-50 hover:opacity-75'
                    }`
                  : `h-1 rounded-full ${
                      index === currentIndex ? 'w-8' : 'w-4 opacity-50 hover:opacity-75'
                    }`
              }`}
              style={{
                backgroundColor: index === currentIndex ? indicatorColor : '#d1d5db',
              }}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === currentIndex}
            />
          ))}
        </div>
      )}
      
      {/* Thumbnails */}
      {(showThumbnails || indicatorVariant === 'thumbnails') && images.length > 1 && (
        <div className="flex justify-center mt-4 p-2 gap-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                index === currentIndex
                  ? 'ring-2 scale-110 opacity-100'
                  : 'opacity-50 hover:opacity-75'
              }`}
              style={{
                borderColor: index === currentIndex ? indicatorColor : 'transparent',
              }}
              aria-label={`Go to slide ${index + 1}`}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// 🎨 ICON COMPONENTS
// ============================================

const ChevronLeft: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const ChevronRight: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
  </svg>
);

// ============================================
// 📤 EXPORTS
// ============================================

export default ImageCarousel;
export { ImageCarousel };
