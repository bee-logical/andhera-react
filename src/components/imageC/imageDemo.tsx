'use client';

import React, { useState } from 'react';
import ImageCarousel from './imageC';

// ============================================
// 📸 SAMPLE IMAGE DATA
// ============================================

interface CarouselImage {
  src: string;
  alt?: string;
  caption?: string;
  thumbnail?: string;
}

const sampleImages: CarouselImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    alt: 'Mountain landscape with snow-capped peaks',
    caption: 'Majestic Mountain Peaks at Sunrise',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop',
    alt: 'Tropical beach with crystal clear water',
    caption: 'Paradise Beach - Crystal Clear Waters',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&h=800&fit=crop',
    alt: 'Desert landscape with sand dunes',
    caption: 'Golden Desert Dunes at Sunset',
    thumbnail: 'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop',
    alt: 'Forest path through tall trees',
    caption: 'Enchanted Forest Trail',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop',
    alt: 'Serene lake reflecting mountains',
    caption: 'Mirror Lake Reflections',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=150&h=100&fit=crop',
  },
];

const cityImages: CarouselImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop',
    alt: 'New York City skyline at night',
    caption: 'New York City - The City That Never Sleeps',
    thumbnail: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
    alt: 'Paris Eiffel Tower at sunset',
    caption: 'Paris - The City of Light',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
    alt: 'London with Big Ben',
    caption: 'London - Historic Charm',
    thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=150&h=100&fit=crop',
  },
  {
    src: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=1200&h=800&fit=crop',
    alt: 'Tokyo city lights',
    caption: 'Tokyo - Modern Metropolis',
    thumbnail: 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625?w=150&h=100&fit=crop',
  },
];

// ============================================
// 🎨 DEMO COMPONENT
// ============================================

const ImageCarouselDemo: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customInterval, setCustomInterval] = useState(3000);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
            🖼️ Enterprise Image Carousel
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A fully-featured, accessible, and customizable carousel component built with React & Tailwind CSS
          </p>
          <div className="flex justify-center gap-4 flex-wrap text-sm text-gray-500">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">✓ TypeScript</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">✓ Responsive</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">✓ Accessible</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">✓ Touch Enabled</span>
            <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full">✓ Keyboard Nav</span>
          </div>
        </div>

        {/* Demo 1: Default Slide Variant */}
        <DemoSection
          title="1. Default Slide Variant"
          description="Classic horizontal slide transition with autoplay and all controls"
        >
          <ImageCarousel
            images={sampleImages}
            variant="slide"
            height="500px"
            showSlideCounter={false}
            autoPlay={true}
            interval={3000}
            showArrows={true}
            showIndicators={true}
            showCaptions={true}
            captionPosition="bottom"
            rounded="xl"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 2: Fade Variant */}
        <DemoSection
          title="2. Fade Transition"
          description="Smooth opacity fade between images with overlay captions"
        >
          <ImageCarousel
            images={cityImages}
            variant="fade"
            height="450px"
            autoPlay={true}
            interval={4000}
            showArrows={true}
            showIndicators={true}
            showCaptions={true}
            captionPosition="overlay"
            rounded="2xl"
            indicatorVariant="bars"
            indicatorColor="#ec4899"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 3: Zoom Variant */}
        <DemoSection
          title="3. Zoom Animation"
          description="Dynamic zoom effect with thumbnail navigation"
        >
          <ImageCarousel
            images={sampleImages}
            variant="zoom"
            height="500px"
            autoPlay={true}
            interval={3500}
            showArrows={true}
            showIndicators={false}
            showThumbnails={true}
            showCaptions={true}
            captionPosition="bottom"
            rounded="xl"
            indicatorColor="#8b5cf6"
            transitionDuration={700}
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 4: Cards Variant */}
        <DemoSection
          title="4. Cards Layout"
          description="Stacked card view showing multiple slides at once"
        >
          <ImageCarousel
            images={cityImages}
            variant="cards"
            height="400px"
            autoPlay={true}
            interval={3000}

            showArrows={true}
            showIndicators={true}
            showCaptions={false}
            rounded="lg"
            indicatorColor="#10b981"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 5: Outside Arrows */}
        <DemoSection
          title="5. External Arrow Controls"
          description="Arrows positioned outside the carousel container"
        >
          <ImageCarousel
            images={sampleImages.slice(0, 3)}
            variant="slide"
            height="300px"
            width='100%'
            autoPlay={false}
            showArrows={true}
            arrowVariant="outside"
            showIndicators={true}
            indicatorVariant="dots"
            showCaptions={true}
            captionPosition="overlay"
            rounded="xl"
            indicatorColor="#f59e0b"
            // className="shadow-2xl"
          />
        </DemoSection>

  
        {/* Demo 6: Thumbnail Indicators */}
        <DemoSection
          title="6. Thumbnail Navigation"
          description="Click thumbnails to navigate between slides"
        >
          <ImageCarousel
            images={cityImages}
            variant="fade"
            height="500px"
            autoPlay={true}
            interval={4000}
            showArrows={true}
            arrowVariant="outside"
            showIndicators={false}
            indicatorVariant="thumbnails"
            showCaptions={true}
            captionPosition="bottom"
            rounded="2xl"
            indicatorColor="#3b82f6"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 7: No Autoplay, Manual Control */}
        <DemoSection
          title="7. Manual Navigation Only"
          description="Autoplay disabled - use arrows, dots, or keyboard to navigate"
        >
          <ImageCarousel
            images={sampleImages}
            variant="slide"
            height="450px"
            autoPlay={false}
            showArrows={true}
            showIndicators={true}
            showCaptions={true}
            captionPosition="bottom"
            rounded="xl"
            indicatorColor="#ef4444"
            keyboardNavigation={true}
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 8: Custom Interval Control */}
        <DemoSection
          title="8. Customizable Interval"
          description="Adjust autoplay speed dynamically"
        >
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Autoplay Interval: {customInterval}ms
              </label>
              <input
                type="range"
                min="1000"
                max="10000"
                step="500"
                value={customInterval}
                onChange={(e) => setCustomInterval(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1s</span>
                <span>5.5s</span>
                <span>10s</span>
              </div>
            </div>
            <ImageCarousel
              images={sampleImages.slice(0, 4)}
              variant="slide"
              height="400px"
              autoPlay={true}
              interval={customInterval}
              showArrows={true}
              showIndicators={true}
              showCaptions={true}
              captionPosition="overlay"
              rounded="xl"
              indicatorColor="#06b6d4"
            //   className="shadow-2xl"
            />
          </div>
        </DemoSection>

        {/* Demo 9: Callback Function */}
        <DemoSection
          title="9. Slide Change Callback"
          description="Track slide changes with onSlideChange callback"
        >
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-lg text-center">
              <p className="text-sm text-gray-600">Current Slide Index:</p>
              <p className="text-4xl font-bold text-blue-600">{currentSlide + 1}</p>
            </div>
            <ImageCarousel
              images={cityImages.slice(0, 4)}
              variant="zoom"
              height="400px"
              autoPlay={true}
              interval={3000}
              showArrows={true}
              showIndicators={true}
              showCaptions={true}
              captionPosition="bottom"
              rounded="xl"
              indicatorColor="#7c3aed"
              onSlideChange={(index) => setCurrentSlide(index)}
            //   className="shadow-2xl"
            />
          </div>
        </DemoSection>

        {/* Demo 10: Compact Mini Carousel */}
        <DemoSection
          title="10. Compact Mini Carousel"
          description="Smaller height with minimal controls for tight spaces"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageCarousel
              images={sampleImages.slice(0, 3)}
              variant="fade"
              height="250px"
              autoPlay={true}
              interval={2500}
              showArrows={false}
              showIndicators={true}
              showCaptions={false}
              rounded="lg"
              indicatorColor="#f97316"
            //   className="shadow-lg"
            />
            <ImageCarousel
              images={cityImages.slice(0, 3)}
              variant="slide"
              height="250px"
              autoPlay={true}
              interval={2500}
              showArrows={false}
              showIndicators={true}
              showCaptions={false}
              rounded="lg"
              indicatorColor="#06b6d4"
            //   className="shadow-lg"
            />
          </div>
        </DemoSection>

        {/* Demo 11: Full-Width Hero Carousel */}
        <DemoSection
          title="11. Full-Width Hero Carousel"
          description="Large hero-style carousel perfect for landing pages"
        >
          <ImageCarousel
            images={sampleImages}
            variant="slide"
            height="600px"
            width="100%"
            autoPlay={true}
            interval={4000}
            showArrows={true}
            arrowVariant="inside"
            showIndicators={true}
            indicatorVariant="bars"
            showCaptions={true}
            captionPosition="overlay"
            rounded="2xl"
            indicatorColor="#f59e0b" // Amber color for visibility
            pauseOnHover={true}
            transitionDuration={800}
            animation="ease-in-out"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Demo 12: No Loop */}
        <DemoSection
          title="12. Non-Looping Carousel"
          description="Stops at the last slide instead of looping back"
        >
          <ImageCarousel
            images={cityImages.slice(0, 3)}
            variant="slide"
            height="400px"
            autoPlay={false}
            loop={false}
            showArrows={true}
            showIndicators={true}
            showCaptions={true}
            captionPosition="bottom"
            rounded="xl"
            indicatorColor="#14b8a6"
            // className="shadow-2xl"
          />
        </DemoSection>

        {/* Feature List */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="🎨"
              title="Multiple Variants"
              description="Slide, Fade, Zoom, and Cards transitions"
            />
            <FeatureCard
              icon="⏱️"
              title="Autoplay Control"
              description="Customizable intervals with pause on hover"
            />
            <FeatureCard
              icon="⌨️"
              title="Keyboard Navigation"
              description="Arrow keys for easy slide control"
            />
            <FeatureCard
              icon="📱"
              title="Touch Gestures"
              description="Swipe support for mobile devices"
            />
            <FeatureCard
              icon="🖼️"
              title="Multiple Indicators"
              description="Dots, bars, or thumbnail navigation"
            />
            <FeatureCard
              icon="♿"
              title="Accessible"
              description="ARIA labels and semantic HTML"
            />
            <FeatureCard
              icon="🎯"
              title="Customizable"
              description="Extensive props for full control"
            />
            <FeatureCard
              icon="📐"
              title="Responsive"
              description="Works on all screen sizes"
            />
            <FeatureCard
              icon="⚡"
              title="TypeScript"
              description="Full type safety and IntelliSense"
            />
          </div>
        </div>

        {/* Usage Code Example */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 text-gray-100">
          <h2 className="text-3xl font-bold mb-6">💻 Usage Example</h2>
          <pre className="bg-gray-800 p-6 rounded-xl overflow-x-auto text-sm">
            <code>{`import ImageCarousel from '@/components/ui/imageC/imageC';

const images = [
  {
    src: '/images/slide1.jpg',
    alt: 'Beautiful landscape',
    caption: 'Mountain Sunrise',
    thumbnail: '/images/slide1-thumb.jpg'
  },
  // ... more images
];

export default function MyPage() {
  return (
    <ImageCarousel
      images={images}
      variant="slide"
      height="500px"
      autoPlay={true}
      interval={3000}
      showArrows={true}
      showIndicators={true}
      showThumbnails={true}
      showCaptions={true}
      captionPosition="bottom"
      rounded="xl"
      indicatorColor="#f59e0b"
      onSlideChange={(index) => console.log(index)}
    />
  );
}`}</code>
          </pre>
        </div>

        {/* Props Documentation */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">📋 Props Documentation</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Default</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-sm">
                <PropRow prop="images" type="CarouselImage[]" default="—" description="Array of image objects (required)" />
                <PropRow prop="variant" type="'slide' | 'fade' | 'zoom' | 'cards'" default="'slide'" description="Transition style" />
                <PropRow prop="autoPlay" type="boolean" default="true" description="Enable automatic rotation" />
                <PropRow prop="interval" type="number" default="3000" description="Autoplay interval in ms" />
                <PropRow prop="loop" type="boolean" default="true" description="Loop back to start" />
                <PropRow prop="showArrows" type="boolean" default="true" description="Display navigation arrows" />
                <PropRow prop="showIndicators" type="boolean" default="true" description="Display dot/bar indicators" />
                <PropRow prop="showThumbnails" type="boolean" default="false" description="Display thumbnail navigation" />
                <PropRow prop="showCaptions" type="boolean" default="true" description="Display image captions" />
                <PropRow prop="captionPosition" type="'bottom' | 'overlay'" default="'bottom'" description="Caption placement" />
                <PropRow prop="height" type="string" default="'400px'" description="Carousel height" />
                <PropRow prop="rounded" type="string" default="'lg'" description="Border radius (Tailwind)" />
                <PropRow prop="pauseOnHover" type="boolean" default="true" description="Pause autoplay on hover" />
                <PropRow prop="keyboardNavigation" type="boolean" default="true" description="Enable arrow key navigation" />
                <PropRow prop="indicatorColor" type="string" default="'#f59e0b'" description="Active indicator color" />
                <PropRow prop="onSlideChange" type="(index) => void" default="—" description="Callback on slide change" />
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 text-gray-600">
          <p className="text-lg">Built with ❤️ using React, TypeScript, and Tailwind CSS</p>
          <p className="mt-2 text-sm">Enterprise-grade • Production-ready • Fully customizable</p>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 🎨 HELPER COMPONENTS
// ============================================

interface DemoSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const DemoSection: React.FC<DemoSectionProps> = ({ title, description, children }) => (
  <section className="space-y-4">
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      {children}
    </div>
  </section>
);

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
    <span className="text-3xl">{icon}</span>
    <div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

interface PropRowProps {
  prop: string;
  type: string;
  default: string;
  description: string;
}

const PropRow: React.FC<PropRowProps> = ({ prop, type, default: defaultValue, description }) => (
  <tr>
    <td className="px-6 py-4 whitespace-nowrap font-mono text-blue-600">{prop}</td>
    <td className="px-6 py-4 whitespace-nowrap font-mono text-purple-600">{type}</td>
    <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-500">{defaultValue}</td>
    <td className="px-6 py-4 text-gray-600">{description}</td>
  </tr>
);

export default ImageCarouselDemo;
