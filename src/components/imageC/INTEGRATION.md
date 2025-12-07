# 🚀 Quick Integration Guide - Image Carousel

## Import Options

### Option 1: Direct Import (Recommended)
```tsx
import ImageCarousel from '@/components/ui/imageC/imageC';
```

### Option 2: Named Import from Index
```tsx
import { ImageCarousel } from '@/components/ui/imageC';
```

### Option 3: Main UI Barrel Export
```tsx
import { ImageCarousel } from '@/components/ui';
```

## Basic Implementation

### 1. Prepare Your Images

```tsx
const images = [
  {
    src: '/images/landscape1.jpg',
    alt: 'Mountain landscape',
    caption: 'Beautiful Mountains',
    thumbnail: '/images/landscape1-thumb.jpg'
  },
  {
    src: '/images/landscape2.jpg',
    alt: 'Ocean view',
    caption: 'Tropical Paradise',
    thumbnail: '/images/landscape2-thumb.jpg'
  },
  // Add more images...
];
```

### 2. Add to Your Component

```tsx
export default function MyPage() {
  return (
    <div className="container mx-auto py-8">
      <ImageCarousel
        images={images}
        variant="slide"
        height="500px"
        autoPlay={true}
        interval={3000}
      />
    </div>
  );
}
```

## Common Use Cases

### Landing Page Hero
```tsx
<ImageCarousel
  images={heroImages}
  variant="fade"
  height="600px"
  width="100%"
  autoPlay={true}
  interval={4000}
  showCaptions={true}
  captionPosition="overlay"
  rounded="none"
  arrowVariant="inside"
/>
```

### Product Gallery
```tsx
<ImageCarousel
  images={productImages}
  variant="slide"
  height="500px"
  autoPlay={false}
  showThumbnails={true}
  showIndicators={false}
  loop={false}
/>
```

### Testimonials with Images
```tsx
<ImageCarousel
  images={testimonialImages}
  variant="zoom"
  height="400px"
  autoPlay={true}
  interval={5000}
  showCaptions={true}
  captionPosition="bottom"
  indicatorVariant="bars"
/>
```

### Portfolio Showcase
```tsx
<ImageCarousel
  images={portfolioImages}
  variant="cards"
  height="450px"
  autoPlay={true}
  interval={3500}
  showArrows={true}
  arrowVariant="outside"
  indicatorColor="#ec4899"
/>
```

### News/Blog Feature
```tsx
<ImageCarousel
  images={newsImages}
  variant="slide"
  height="350px"
  autoPlay={true}
  interval={4000}
  showCaptions={true}
  captionPosition="overlay"
  pauseOnHover={true}
/>
```

## Testing the Component

Run the demo page to see all variants:

```tsx
import ImageCarouselDemo from '@/components/ui/imageC/imageDemo';

export default function DemoPage() {
  return <ImageCarouselDemo />;
}
```

## Next Steps

1. ✅ Replace placeholder images with your actual images
2. ✅ Customize colors to match your brand
3. ✅ Adjust timing and animations
4. ✅ Add tracking/analytics if needed
5. ✅ Test on mobile devices

## Need Help?

- 📖 Full documentation: `imageC/README.md`
- 🎨 See all examples: `imageC/imageDemo.tsx`
- 💻 Type definitions: Hover over props in your IDE

---

**Ready to use! 🎉**
