# 🖼️ Enterprise Image Carousel Component

A fully-featured, accessible, and customizable image carousel/slider component built with React, TypeScript, and Tailwind CSS. No external carousel libraries required!

## ✨ Features

- 🎨 **Multiple Variants**: Slide, Fade, Zoom, and Cards transitions
- ⏱️ **Autoplay Control**: Customizable intervals with pause on hover
- 🖱️ **Multiple Navigation**: Arrows, indicators (dots/bars), thumbnails, and keyboard
- 📱 **Touch Gestures**: Swipe support for mobile devices
- ♿ **Accessible**: ARIA labels, semantic HTML, and keyboard navigation
- 🎯 **Highly Customizable**: Extensive props for complete control
- 📐 **Responsive**: Works beautifully on all screen sizes
- ⚡ **TypeScript**: Full type safety and IntelliSense support
- 🎭 **Captions**: Support for bottom or overlay captions
- 🔄 **Loop Control**: Optional infinite looping
- 📊 **Callbacks**: Track slide changes with callbacks

## 📦 Installation

The component is already part of your UI library. Simply import it:

```tsx
import ImageCarousel from '@/components/ui/imageC';
// or
import { ImageCarousel } from '@/components/ui/imageC';
```

## 🚀 Quick Start

```tsx
import ImageCarousel from '@/components/ui/imageC/imageC';

const images = [
  {
    src: '/images/slide1.jpg',
    alt: 'Beautiful landscape',
    caption: 'Mountain Sunrise',
    thumbnail: '/images/slide1-thumb.jpg'
  },
  {
    src: '/images/slide2.jpg',
    alt: 'Ocean view',
    caption: 'Ocean Paradise',
    thumbnail: '/images/slide2-thumb.jpg'
  },
];

export default function MyPage() {
  return (
    <ImageCarousel
      images={images}
      variant="slide"
      height="500px"
      autoPlay={true}
      interval={3000}
    />
  );
}
```

## 📋 Props API

### Required Props

| Prop | Type | Description |
|------|------|-------------|
| `images` | `CarouselImage[]` | Array of image objects with src, alt, caption, and thumbnail |

### CarouselImage Interface

```typescript
interface CarouselImage {
  src: string;           // Image URL (required)
  alt?: string;          // Alt text for accessibility
  caption?: string;      // Caption text
  thumbnail?: string;    // Thumbnail URL (falls back to src)
}
```

### Visual & Style Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'slide' \| 'fade' \| 'zoom' \| 'cards'` | `'slide'` | Transition animation style |
| `height` | `string` | `'400px'` | Carousel height (any CSS unit) |
| `width` | `string` | `'100%'` | Carousel width (any CSS unit) |
| `rounded` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Border radius |
| `className` | `string` | `''` | Additional CSS classes |

### Autoplay Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `autoPlay` | `boolean` | `true` | Enable automatic slide rotation |
| `interval` | `number` | `3000` | Time between slides (ms) |
| `pauseOnHover` | `boolean` | `true` | Pause autoplay on mouse hover |
| `loop` | `boolean` | `true` | Loop back to first slide after last |

### Navigation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showArrows` | `boolean` | `true` | Display previous/next arrows |
| `showIndicators` | `boolean` | `true` | Display navigation indicators |
| `showThumbnails` | `boolean` | `false` | Display thumbnail navigation |
| `arrowVariant` | `'inside' \| 'outside'` | `'inside'` | Arrow position relative to carousel |
| `indicatorVariant` | `'dots' \| 'bars' \| 'thumbnails'` | `'dots'` | Style of navigation indicators |
| `indicatorColor` | `string` | `'#f59e0b'` | Active indicator color (hex/rgb/hsl) |
| `keyboardNavigation` | `boolean` | `true` | Enable arrow key navigation |

### Caption Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showCaptions` | `boolean` | `true` | Display image captions |
| `captionPosition` | `'bottom' \| 'overlay'` | `'bottom'` | Caption placement |

### Animation Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `transitionDuration` | `number` | `500` | Transition duration (ms) |
| `animation` | `'ease' \| 'ease-in' \| 'ease-out' \| 'ease-in-out' \| 'linear'` | `'ease-in-out'` | CSS timing function |

### Callback Props

| Prop | Type | Description |
|------|------|-------------|
| `onSlideChange` | `(index: number) => void` | Called when slide changes |

## 🎨 Variants

### 1. Slide (Default)
Classic horizontal slide transition.
```tsx
<ImageCarousel images={images} variant="slide" />
```

### 2. Fade
Smooth opacity crossfade between images.
```tsx
<ImageCarousel images={images} variant="fade" />
```

### 3. Zoom
Dynamic zoom in/out animation.
```tsx
<ImageCarousel images={images} variant="zoom" />
```

### 4. Cards
Stacked card layout showing multiple slides.
```tsx
<ImageCarousel images={images} variant="cards" />
```

## 💡 Usage Examples

### Basic Carousel with Autoplay

```tsx
<ImageCarousel
  images={images}
  variant="slide"
  height="500px"
  autoPlay={true}
  interval={3000}
/>
```

### Fade Carousel with Overlay Captions

```tsx
<ImageCarousel
  images={images}
  variant="fade"
  height="450px"
  captionPosition="overlay"
  showCaptions={true}
/>
```

### Manual Navigation (No Autoplay)

```tsx
<ImageCarousel
  images={images}
  autoPlay={false}
  showArrows={true}
  showIndicators={true}
  keyboardNavigation={true}
/>
```

### Thumbnail Navigation

```tsx
<ImageCarousel
  images={images}
  showThumbnails={true}
  indicatorVariant="thumbnails"
  height="500px"
/>
```

### External Arrows with Custom Colors

```tsx
<ImageCarousel
  images={images}
  arrowVariant="outside"
  indicatorColor="#ec4899"
  indicatorVariant="bars"
/>
```

### Carousel with Callback

```tsx
const [currentSlide, setCurrentSlide] = useState(0);

<ImageCarousel
  images={images}
  onSlideChange={(index) => setCurrentSlide(index)}
/>
```

### Non-Looping Carousel

```tsx
<ImageCarousel
  images={images}
  loop={false}
  autoPlay={false}
/>
```

## 📱 Responsive Design

The carousel is fully responsive by default:

- **Desktop**: Full-size with all controls
- **Tablet**: Touch-enabled swipe gestures
- **Mobile**: Optimized touch targets, swipe navigation

## ⌨️ Keyboard Navigation

When `keyboardNavigation` is enabled:

- `←` (Left Arrow): Previous slide
- `→` (Right Arrow): Next slide

## 📱 Touch Gestures

On touch devices:

- **Swipe Left**: Next slide
- **Swipe Right**: Previous slide

## ♿ Accessibility Features

- ✅ Semantic HTML with proper `role` attributes
- ✅ ARIA labels for screen readers
- ✅ `aria-live` regions for dynamic content
- ✅ Keyboard navigation support
- ✅ Focus management
- ✅ Alt text support for images
- ✅ Proper contrast ratios

## 🎯 Best Practices

1. **Image Optimization**: Use optimized images with appropriate dimensions
2. **Alt Text**: Always provide meaningful alt text for accessibility
3. **Thumbnails**: Provide smaller thumbnail images for better performance
4. **Caption Length**: Keep captions concise for better UX
5. **Autoplay Interval**: Use reasonable intervals (3-5 seconds recommended)
6. **Height**: Set explicit height for consistent layout

## 🔧 Advanced Customization

### Custom Styling

```tsx
<ImageCarousel
  images={images}
  className="my-custom-carousel shadow-2xl"
  height="600px"
  rounded="2xl"
  indicatorColor="#8b5cf6"
/>
```

### Dynamic Interval Control

```tsx
const [interval, setInterval] = useState(3000);

<ImageCarousel
  images={images}
  interval={interval}
  autoPlay={true}
/>
```

## 🐛 Troubleshooting

### Images not displaying
- Verify image URLs are correct and accessible
- Check CORS settings if loading from external sources
- Ensure images are properly optimized

### Autoplay not working
- Verify `autoPlay={true}` is set
- Check if `pauseOnHover` is causing unexpected behavior
- Ensure browser allows autoplay (some browsers restrict it)

### Touch gestures not responsive
- Verify the component is not nested in elements that prevent touch events
- Check if parent containers have conflicting touch handlers

## 📦 Component Structure

```
imageC/
├── imageC.tsx          # Main carousel component
├── imageDemo.tsx       # Comprehensive demo examples
├── index.ts            # Exports
└── README.md           # Documentation
```

## 🚀 Performance Tips

1. **Lazy Loading**: Consider lazy loading images not currently visible
2. **Optimize Images**: Use appropriate image formats (WebP, AVIF)
3. **Limit Slides**: Too many slides can impact performance
4. **Preload**: Preload adjacent slides for smoother transitions

## 📄 License

This component is part of the NextBusters project.

## 🤝 Contributing

Feel free to enhance this component! Key areas for contribution:
- Additional transition variants
- Performance optimizations
- New indicator styles
- Enhanced accessibility features

## 📞 Support

For issues or questions, please refer to the demo file (`imageDemo.tsx`) which showcases all available features and configurations.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**
