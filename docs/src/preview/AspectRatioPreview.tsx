import { useState } from "react";
import { AspectRatio } from "../../../src/components/aspect-ratio/AspectRatio";
import { Dialog } from "../../../src/components/dialog/BeeDialog";
import { PreviewCard } from "../components/PreviewCard";

/**
 * FocusBlurDemo - Interactive demo for focus/blur event handling
 */
function FocusBlurDemo() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [focusHistory, setFocusHistory] = useState<string[]>([]);

  const handleFocus = (index: number, label: string) => {
    setFocusedIndex(index);
    setFocusHistory(prev => [...prev.slice(-4), `Focus: ${label}`]);
  };

  const handleBlur = (label: string) => {
    setFocusedIndex(null);
    setFocusHistory(prev => [...prev.slice(-4), `Blur: ${label}`]);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {['First', 'Second', 'Third'].map((label, index) => (
          <AspectRatio
            key={index}
            ratio="4:3"
            interactive
            tabIndex={0}
            role="button"
            aria-label={`${label} interactive container`}
            onFocus={() => handleFocus(index, label)}
            onBlur={() => handleBlur(label)}
            className={`
              rounded-lg transition-all duration-200 flex items-center justify-center
              ${focusedIndex === index 
                ? 'bg-yellow-500/30 border-2 border-yellow-500 ring-2 ring-yellow-500/50 ring-offset-2 ring-offset-gray-900' 
                : 'bg-gray-900/40 border border-gray-700/50 hover:border-gray-600'
              }
            `}
          >
            <div className="text-center text-white p-3">
              <div className="text-2xl mb-2">{focusedIndex === index ? '🎯' : '⬜'}</div>
              <span className="text-sm font-medium">{label} Box</span>
              <p className="text-xs text-gray-400 mt-1">
                {focusedIndex === index ? 'Focused!' : 'Tab to focus'}
              </p>
            </div>
          </AspectRatio>
        ))}
      </div>
      
      {/* Event Log */}
      <div className="bg-gray-900/60 border border-gray-700/50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Event Log</span>
          {focusHistory.length > 0 && (
            <button 
              onClick={() => setFocusHistory([])} 
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              (Clear)
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2 min-h-8">
          {focusHistory.length === 0 ? (
            <span className="text-gray-500 text-sm">Use Tab key to navigate between boxes...</span>
          ) : (
            focusHistory.map((event, i) => (
              <span 
                key={i} 
                className={`text-xs px-2 py-1 rounded ${
                  event.startsWith('Focus') 
                    ? 'bg-green-900/50 text-green-400 border border-green-700/50' 
                    : 'bg-red-900/50 text-red-400 border border-red-700/50'
                }`}
              >
                {event}
              </span>
            ))
          )}
        </div>
      </div>
      
      <p className="text-gray-400 text-xs text-center">
        💡 Tip: Use <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-gray-300">Tab</kbd> to move forward and <kbd className="bg-gray-700 px-1.5 py-0.5 rounded text-gray-300">Shift+Tab</kbd> to move backward
      </p>
    </div>
  );
}

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "children", type: "ReactNode", defaultValue: "-", description: "Content to render inside the aspect ratio container." },
  { name: "variant", type: "'container' | 'image' | 'video' | 'custom'", defaultValue: "'container'", description: "Visual variant type for different use cases." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'md'", description: "Size preset for common dimensions." },
  { name: "ratio", type: "'1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '5:4' | '9:16' | '2:3'", defaultValue: "-", description: "Quick aspect ratio presets for common media formats." },
  { name: "customRatio", type: "string | number", defaultValue: "-", description: "Custom aspect ratio value (e.g., '16/9' or 1.77)." },
  { name: "width", type: "string | number", defaultValue: "-", description: "Width of the container in pixels or CSS units." },
  { name: "height", type: "string | number", defaultValue: "-", description: "Height of the container in pixels or CSS units." },
  { name: "maxWidth", type: "string | number", defaultValue: "-", description: "Maximum width constraint for responsive behavior." },
  { name: "maxHeight", type: "string | number", defaultValue: "-", description: "Maximum height constraint for responsive behavior." },
  { name: "minWidth", type: "string | number", defaultValue: "-", description: "Minimum width constraint for responsive behavior." },
  { name: "minHeight", type: "string | number", defaultValue: "-", description: "Minimum height constraint for responsive behavior." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Makes container take full width of parent." },
  { name: "fullHeight", type: "boolean", defaultValue: "false", description: "Makes container take full height of parent." },
  { name: "backgroundColor", type: "string", defaultValue: "-", description: "Custom background color override." },
  { name: "textColor", type: "string", defaultValue: "-", description: "Custom text color override for content." },
  { name: "borderColor", type: "string", defaultValue: "-", description: "Custom border color override." },
  { name: "borderRadius", type: "string | number", defaultValue: "-", description: "Custom border radius (e.g., '8px', '16px')." },
  { name: "border", type: "boolean | string", defaultValue: "false", description: "Add border (true for default, string for custom)." },
  { name: "shadow", type: "boolean | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "false", description: "Add drop shadow with size variants." },
  { name: "overflow", type: "'visible' | 'hidden' | 'scroll' | 'auto'", defaultValue: "'hidden'", description: "Overflow behavior for content." },
  { name: "objectFit", type: "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'", defaultValue: "'cover'", description: "Object fit for images and videos." },
  { name: "objectPosition", type: "string", defaultValue: "'center'", description: "Object position for images and videos." },
  { name: "loading", type: "boolean", defaultValue: "false", description: "Shows loading spinner instead of content." },
  { name: "loadingContent", type: "ReactNode", defaultValue: "-", description: "Custom loading placeholder content." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction and dims appearance." },
  { name: "interactive", type: "boolean", defaultValue: "false", description: "Makes container clickable with hover effects." },
  { name: "onClick", type: "(event: MouseEvent<HTMLDivElement>) => void", defaultValue: "-", description: "Click handler for interactive containers." },
  { name: "onHover", type: "(event: MouseEvent<HTMLDivElement>) => void", defaultValue: "-", description: "Hover handler for interactive feedback." },
  { name: "onFocus", type: "(event: FocusEvent<HTMLDivElement>) => void", defaultValue: "-", description: "Focus handler for keyboard navigation." },
  { name: "onBlur", type: "(event: FocusEvent<HTMLDivElement>) => void", defaultValue: "-", description: "Blur handler when element loses focus." },
  { name: "tabIndex", type: "number", defaultValue: "-", description: "Tab index for keyboard navigation order." },
  { name: "role", type: "string", defaultValue: "-", description: "ARIA role for accessibility (e.g., 'button', 'img')." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for screen readers." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of element that describes this container." },
  { name: "centerX", type: "boolean", defaultValue: "false", description: "Center content horizontally within container." },
  { name: "centerY", type: "boolean", defaultValue: "false", description: "Center content vertically within container." },
  { name: "center", type: "boolean", defaultValue: "false", description: "Center content both horizontally and vertically." },
  { name: "padding", type: "string | number", defaultValue: "-", description: "Inner padding for container content." },
  { name: "margin", type: "string | number", defaultValue: "-", description: "Outer margin around container." },
  { name: "animated", type: "boolean", defaultValue: "false", description: "Enable smooth transitions for state changes." },
  { name: "hoverScale", type: "boolean", defaultValue: "false", description: "Scale up on hover for interactive feedback." },
  { name: "rounded", type: "boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "false", description: "Rounded corners with size variants." },
  { name: "containerClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for styling." },
  { name: "tooltip", type: "string", defaultValue: "-", description: "Tooltip text shown on hover." },
  { name: "uppercase", type: "boolean", defaultValue: "false", description: "Transform text content to uppercase." },
  { name: "compact", type: "boolean", defaultValue: "false", description: "Reduced padding for dense layouts." },
  { name: "active", type: "boolean", defaultValue: "false", description: "Active/pressed visual state." },
  { name: "enableAnimations", type: "boolean", defaultValue: "true", description: "Enable or disable all animations." },
  { name: "as", type: "'div' | 'section' | 'article' | 'main' | 'aside' | 'figure'", defaultValue: "'div'", description: "HTML element type to render as." },
  { name: "className", type: "string", defaultValue: "''", description: "Custom CSS classes for styling." },
  { name: "style", type: "CSSProperties", defaultValue: "{}", description: "Inline styles for the component." },
];

/**
 * AspectRatioPreview Component
 * Comprehensive demonstration of AspectRatio component variants
 */
export function AspectRatioPreview() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGalleryDialogOpen, setIsGalleryDialogOpen] = useState(false);
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 w-full md:gap-11 px-4 sm:px-2">
      
      {/* 1. Basic Aspect Ratios */}
      <PreviewCard
        title="Basic Aspect Ratios"
        description="Common aspect ratios for media content like images, videos, and containers. Each ratio maintains its proportions across different screen sizes.

AspectRatioPreset: '1:1' | '4:3' | '16:9' | '21:9' | '3:2' | '5:4' | '9:16' | '2:3'"
        code={`<AspectRatio ratio="1:1" variant="container" center>
  <p className="text-white">1:1 Square</p>
</AspectRatio>
<AspectRatio ratio="4:3" variant="container" center>
  <p className="text-white">4:3 Standard</p>
</AspectRatio>
<AspectRatio ratio="16:9" variant="container" center>
  <p className="text-white">16:9 Widescreen</p>
</AspectRatio>
<AspectRatio ratio="21:9" variant="container" center>
  <p className="text-white">21:9 Ultra-wide</p>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mx-auto px-4 sm:px-2">
          <AspectRatio ratio="1:1" variant="container" className="w-full bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <p className="text-white text-sm font-medium text-center">1:1 Square</p>
          </AspectRatio>
          <AspectRatio ratio="4:3" variant="container" className="w-full bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <p className="text-white text-sm font-medium text-center">4:3 Standard</p>
          </AspectRatio>
          <AspectRatio ratio="16:9" variant="container" className="w-full bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <p className="text-white text-sm font-medium text-center">16:9 Widescreen</p>
          </AspectRatio>
          <AspectRatio ratio="21:9" variant="container" className="w-full bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <p className="text-white text-sm font-medium text-center px-2">21:9 Ultra-wide</p>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 2. Variant Types */}
      <PreviewCard
        title="Variant Types"
        description="Different visual variants optimized for specific content types with actual media examples. Each variant demonstrates real-world usage patterns.

AspectRatioVariant: 'container' | 'image' | 'video' | 'custom'"
        code={`<AspectRatio ratio="16:9" variant="container">
  <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600">
    <h3>Container Content</h3>
    <p>Generic container for any content</p>
  </div>
</AspectRatio>
<AspectRatio ratio="16:9" variant="image">
  <img 
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
    alt="Mountain landscape" 
    className="w-full h-full object-cover"
  />
</AspectRatio>
<AspectRatio ratio="16:9" variant="video">
  <video 
    className="w-full h-full object-cover" 
    controls 
    muted 
    poster="https://images.unsplash.com/photo-1574267432553-4b4628081c31"
  >
    <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_360x240_1mb.mp4" />
  </video>
</AspectRatio>
<AspectRatio ratio="16:9" variant="custom">
  <div className="relative w-full h-full bg-gradient-to-r from-green-400 to-blue-500">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-4xl mb-2">⚡</div>
        <h4>Custom Component</h4>
      </div>
    </div>
  </div>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
          <AspectRatio ratio="16:9" variant="container" className="bg-gradient-to-br from-blue-600/80 to-purple-600/80 border border-blue-500/30 flex items-center justify-center min-h-32 sm:min-h-36">
            <div className="text-center text-white p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl mb-2">📦</div>
              <h4 className="font-semibold text-sm sm:text-base mb-2">Container</h4>
              <p className="text-sm opacity-90">Generic content wrapper</p>
            </div>
          </AspectRatio>
          <AspectRatio ratio="16:9" variant="image" className="overflow-hidden rounded-lg min-h-32 sm:min-h-36">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80" 
              alt="Mountain landscape" 
              className="w-full h-full object-cover transition-transform hover:scale-105"
            />
          </AspectRatio>
          <AspectRatio ratio="16:9" variant="video" className="bg-black rounded-lg overflow-hidden min-h-32 sm:min-h-36">
            <video 
              className="w-full h-full object-cover" 
              controls 
              muted 
              poster="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=600&q=80"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AspectRatio>
          <AspectRatio ratio="16:9" variant="custom" className="relative bg-gradient-to-br from-green-500 to-teal-600 rounded-lg overflow-hidden min-h-32 sm:min-h-36">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-4xl sm:text-5xl mb-2 animate-pulse">⚡</div>
                <h4 className="font-bold text-sm sm:text-base mb-2">Custom Component</h4>
                <p className="text-sm opacity-90">Interactive content</p>
              </div>
            </div>
            <div className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 3. Size Variations */}
      <PreviewCard
        title="Size Variations"
        description="Predefined size options for consistent scaling across your application. Sizes affect both width and height proportionally.

AspectRatioSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'"
        code={`<AspectRatio ratio="1:1" size="xs" center>
  <span>XS</span>
</AspectRatio>
<AspectRatio ratio="1:1" size="sm" center>
  <span>SM</span>
</AspectRatio>
<AspectRatio ratio="1:1" size="md" center>
  <span>MD</span>
</AspectRatio>
<AspectRatio ratio="1:1" size="lg" center>
  <span>LG</span>
</AspectRatio>
<AspectRatio ratio="1:1" size="xl" center>
  <span>XL</span>
</AspectRatio>`}
      >
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6 mx-auto px-4 sm:px-2">
          <AspectRatio ratio="1:1" size="xs" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-xs font-medium text-center">XS</span>
          </AspectRatio>
          <AspectRatio ratio="1:1" size="sm" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">SM</span>
          </AspectRatio>
          <AspectRatio ratio="1:1" size="md" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">MD</span>
          </AspectRatio>
          <AspectRatio ratio="1:1" size="lg" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-base font-medium text-center">LG</span>
          </AspectRatio>
          <AspectRatio ratio="1:1" size="xl" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-lg font-medium text-center">XL</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 4. Custom Ratios */}
      <PreviewCard
        title="Custom Aspect Ratios"
        description="Define your own aspect ratios using numeric values or fraction strings for unique layouts and specialized content.

Custom ratios: 1.5, 2.5, '3/2', '5/3'"
        code={`<AspectRatio customRatio={1.5} center>
  <span>1.5 (3:2)</span>
</AspectRatio>
<AspectRatio customRatio={2.5} center>
  <span>2.5 (5:2)</span>
</AspectRatio>
<AspectRatio customRatio="3/2" center>
  <span>3/2 ratio</span>
</AspectRatio>
<AspectRatio customRatio="5/3" center>
  <span>5/3 ratio</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mx-auto px-4 sm:px-2">
          <AspectRatio customRatio={1.5} className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">1.5 (3:2)</span>
          </AspectRatio>
          <AspectRatio customRatio={2.5} className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">2.5 (5:2)</span>
          </AspectRatio>
          <AspectRatio customRatio="3/2" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">3/2 ratio</span>
          </AspectRatio>
          <AspectRatio customRatio="5/3" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">5/3 ratio</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 5. Image & Video Containers */}
      <PreviewCard
        title="Image & Video Containers"
        description="Specialized containers for media content with object-fit controls for proper scaling and positioning.

Object fit options: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'"
        code={`<AspectRatio ratio="16:9" variant="image" objectFit="cover">
  <img 
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
    alt="Mountain landscape" 
  />
</AspectRatio>
<AspectRatio ratio="1:1" variant="image" objectFit="contain">
  <img 
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4" 
    alt="Mountain landscape" 
  />
</AspectRatio>`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="16:9" variant="image" objectFit="cover">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" 
              alt="Mountain landscape with cover fit"
              className="w-full h-full object-cover" 
            />
          </AspectRatio>
          <AspectRatio ratio="1:1" variant="image" objectFit="contain" backgroundColor="#1a1a1a">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" 
              alt="Mountain landscape with contain fit"
              className="w-full h-full object-contain" 
            />
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 6. Interactive States */}
      <PreviewCard
        title="Interactive States"
        description="Interactive containers with hover effects, scaling, and click handlers for engaging user experiences.

Interactive features: hover effects, scaling, animations"
        code={`<AspectRatio 
  ratio="4:3" 
  interactive 
  hoverScale 
  animated 
  onClick={() => setIsDialogOpen(true)}
  center
>
  <span>Click me!</span>
</AspectRatio>
<AspectRatio 
  ratio="4:3" 
  interactive 
  animated 
  center 
  active
>
  <span>Active State</span>
</AspectRatio>
<AspectRatio 
  ratio="4:3" 
  center 
  disabled
>
  <span>Disabled</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
          <AspectRatio 
            ratio="4:3" 
            interactive 
            hoverScale 
            animated 
            onClick={() => setIsDialogOpen(true)}
            className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Click me!</span>
          </AspectRatio>
          <AspectRatio 
            ratio="4:3" 
            interactive 
            animated 
            active
            className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Active State</span>
          </AspectRatio>
          <AspectRatio 
            ratio="4:3" 
            disabled
            className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Disabled</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 7. Styling Options */}
      <PreviewCard
        title="Styling Options"
        description="Comprehensive styling options including shadows, borders, rounded corners, and custom colors for visual hierarchy.

Styling: shadows, borders, rounded corners, custom colors"
        code={`<AspectRatio ratio="1:1" shadow="lg" rounded="lg" center>
  <span>Shadow & Rounded</span>
</AspectRatio>
<AspectRatio 
  ratio="1:1" 
  border 
  borderColor="#10b981" 
  backgroundColor="#065f46" 
  center
>
  <span>Custom Colors</span>
</AspectRatio>
<AspectRatio 
  ratio="1:1" 
  shadow="xl" 
  rounded="full" 
  backgroundColor="#7c3aed" 
  center
>
  <span>Full Round</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="1:1" shadow="lg" rounded="lg" className="bg-gray-900/40 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">Shadow & Rounded</span>
          </AspectRatio>
          <AspectRatio 
            ratio="1:1" 
            border 
            borderColor="#10b981" 
            backgroundColor="#065f46" 
            className="flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Custom Colors</span>
          </AspectRatio>
          <AspectRatio 
            ratio="1:1" 
            shadow="xl" 
            rounded="full" 
            backgroundColor="#7c3aed" 
            className="flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Full Round</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 8. Loading States */}
      <PreviewCard
        title="Loading States"
        description="Built-in loading states with spinner or custom loading content for async operations and data fetching scenarios.

Loading: default spinner or custom content"
        code={`<AspectRatio ratio="16:9" loading />
<AspectRatio 
  ratio="16:9" 
  loading 
  loadingContent={
    <div className="text-white">Custom loading...</div>
  } 
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="16:9" loading className="flex items-center justify-center" />
          <AspectRatio 
            ratio="16:9" 
            loading 
            className="flex items-center justify-center"
            loadingContent={
              <div className="text-white text-sm">Custom loading...</div>
            } 
          />
        </div>
      </PreviewCard>

      {/* 9. Layout & Positioning */}
      <PreviewCard
        title="Layout & Positioning"
        description="Flexible layout options including full width, centering, padding, and responsive behavior for different container needs.

Layout: fullWidth, centering, padding, custom dimensions"
        code={`<AspectRatio ratio="21:9" fullWidth center padding="24px">
  <span>Full Width with Padding</span>
</AspectRatio>
<AspectRatio ratio="4:3" width={200} height={150} centerX>
  <span>Fixed Dimensions</span>
</AspectRatio>`}
      >
        <div className="flex flex-col gap-6 w-full mx-auto">
          <AspectRatio ratio="21:9" fullWidth padding="24px" className="bg-gray-900/40 border border-gray-700/50 max-h-32 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">Full Width with Padding</span>
          </AspectRatio>
          <div className="flex justify-center">
            <AspectRatio ratio="4:3" width={200} height={150} className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
              <span className="text-white text-sm font-medium text-center">Fixed Dimensions</span>
            </AspectRatio>
          </div>
        </div>
      </PreviewCard>

      {/* 10. Semantic Elements */}
      <PreviewCard
        title="Semantic Elements"
        description="Render as different HTML elements for proper semantic structure and accessibility in your application.

Element types: 'div' | 'section' | 'article' | 'main' | 'aside' | 'figure'"
        code={`<AspectRatio ratio="16:9" as="figure" center>
  <span>Figure Element</span>
</AspectRatio>
<AspectRatio ratio="4:3" as="section" center>
  <span>Section Element</span>
</AspectRatio>
<AspectRatio ratio="1:1" as="article" center>
  <span>Article Element</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="16:9" as="figure" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">Figure Element</span>
          </AspectRatio>
          <AspectRatio ratio="4:3" as="section" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">Section Element</span>
          </AspectRatio>
          <AspectRatio ratio="1:1" as="article" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium text-center">Article Element</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 11. Advanced Styling Combinations */}
      <PreviewCard
        title="Advanced Styling Combinations"
        description="Complex styling combinations showcasing multiple props working together for sophisticated visual effects.

Advanced combinations: multiple shadows, gradients, animations, custom styling"
        code={`<AspectRatio 
  ratio="1:1" 
  shadow="xl" 
  rounded="xl" 
  interactive 
  hoverScale 
  animated 
  backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
  center
  tooltip="Gradient with animations"
>
  <span className="text-white font-bold">Gradient Box</span>
</AspectRatio>
<AspectRatio 
  ratio="4:3" 
  border="2px solid #f59e0b" 
  rounded="lg" 
  shadow="lg" 
  padding="16px" 
  backgroundColor="#451a03" 
  interactive 
  center
>
  <span className="text-amber-100">Border & Padding</span>
</AspectRatio>
<AspectRatio 
  ratio="16:9" 
  shadow="xl" 
  rounded="2xl" 
  backgroundColor="#1e40af" 
  textColor="#60a5fa" 
  uppercase 
  center 
  animated
>
  <span className="font-semibold tracking-wide">Styled Text</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <AspectRatio 
            ratio="1:1" 
            shadow="xl" 
            rounded="xl" 
            interactive 
            hoverScale 
            animated 
            style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            tooltip="Gradient with animations"
            className="flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm text-center">Gradient Box</span>
          </AspectRatio>
          <AspectRatio 
            ratio="4:3" 
            border="2px solid #f59e0b" 
            rounded="lg" 
            shadow="lg" 
            padding="16px" 
            backgroundColor="#451a03" 
            interactive 
            className="flex items-center justify-center"
          >
            <span className="text-amber-100 text-sm font-medium text-center">Border & Padding</span>
          </AspectRatio>
          <AspectRatio 
            ratio="16:9" 
            shadow="xl" 
            rounded="xl" 
            backgroundColor="#1e40af" 
            textColor="#60a5fa" 
            uppercase 
            animated
            className="flex items-center justify-center"
          >
            <span className="font-semibold tracking-wide text-xs text-center">Styled Text</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 12. Responsive Behavior */}
      <PreviewCard
        title="Responsive Behavior"
        description="Demonstrate how AspectRatio components adapt to different screen sizes while maintaining their proportions perfectly.

Responsive features: different ratios per breakpoint, adaptive sizing, mobile optimization"
        code={`<AspectRatio 
  ratio="21:9" 
  fullWidth 
  center 
  className="sm:max-w-md lg:max-w-2xl"
>
  <div className="text-center">
    <h3 className="text-white text-lg font-bold mb-2">Ultra-wide</h3>
    <p className="text-gray-300 text-sm">Adapts to screen size</p>
  </div>
</AspectRatio>
<AspectRatio ratio="1:1" className="w-full max-w-xs mx-auto">
  <div className="text-center text-white">
    <div className="text-2xl mb-2">📱</div>
    <span className="text-sm">Mobile Optimized</span>
  </div>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <div className="w-full">
            <AspectRatio 
              ratio="21:9" 
              fullWidth 
              className="bg-gray-900/40 border border-gray-700/50 w-full min-h-32 sm:min-h-36 flex items-center justify-center"
              style={{ aspectRatio: 'auto' }}
            >
              <div className="text-center px-3 py-3">
                <h3 className="text-white text-sm sm:text-base lg:text-lg font-bold mb-1 leading-tight">Ultra-wide Container</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-tight">Adapts to screen size with max-width constraints</p>
              </div>
            </AspectRatio>
          </div>
          <div className="flex justify-center">
            <AspectRatio ratio="1:1" className="w-32 sm:w-40 bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-xl sm:text-2xl mb-2">📱</div>
                <span className="text-xs sm:text-sm font-medium">Mobile Optimized</span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </PreviewCard>

      {/* 13. Content Overflow Handling */}
      <PreviewCard
        title="Content Overflow Handling"
        description="Different overflow behaviors for handling content that exceeds the container boundaries.

Overflow options: 'visible' | 'hidden' | 'scroll' | 'auto'"
        code={`<AspectRatio ratio="4:3" overflow="hidden" center>
  <div className="text-white text-xs p-2">
    This is a lot of content that would normally overflow 
    the container, but it's clipped by overflow hidden...
  </div>
</AspectRatio>
<AspectRatio ratio="4:3" overflow="scroll" padding="8px">
  <div className="text-white text-xs leading-relaxed">
    This container has scrollable overflow. You can scroll 
    to see more content that extends beyond the visible area.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
  </div>
</AspectRatio>
<AspectRatio ratio="4:3" overflow="visible" center>
  <div className="text-white text-xs bg-red-900/50 p-4 rounded">
    Visible overflow - content can extend outside
  </div>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="4:3" overflow="hidden" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <div className="text-white text-xs p-2 text-center">
              This is a lot of content that would normally overflow the container, but it's clipped by overflow hidden. The text gets cut off when it exceeds the boundaries.
            </div>
          </AspectRatio>
          <AspectRatio ratio="4:3" overflow="scroll" padding="8px" className="bg-gray-900/40 border border-gray-700/50">
            <div className="text-white text-xs leading-relaxed text-center">
              This container has scrollable overflow. You can scroll to see more content that extends beyond the visible area. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
            </div>
          </AspectRatio>
          <AspectRatio ratio="4:3" overflow="visible" className="bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <div className="text-white text-xs bg-red-900/50 p-4 rounded border border-red-700 text-center">
              Visible overflow - content can extend outside the container boundaries
            </div>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 14. Animation & Transition Effects */}
      <PreviewCard
        title="Animation & Transition Effects"
        description="Various animation and transition effects for enhanced user interaction and visual feedback.

Animation features: hover effects, scale transitions, smooth animations"
        code={`<AspectRatio 
  ratio="1:1" 
  interactive 
  animated 
  hoverScale 
  enableAnimations 
  center 
  className="transition-all duration-500 hover:rotate-3"
>
  <span>Hover & Rotate</span>
</AspectRatio>
<AspectRatio 
  ratio="1:1" 
  interactive 
  animated 
  center 
  className="transition-all duration-300 hover:bg-purple-900/50"
>
  <span>Color Transition</span>
</AspectRatio>
<AspectRatio 
  ratio="1:1" 
  interactive 
  hoverScale 
  center 
  className="transition-transform duration-700 hover:skew-y-3"
>
  <span>Complex Transform</span>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mx-auto px-2 sm:px-0">
          <AspectRatio 
            ratio="1:1" 
            interactive 
            animated 
            hoverScale 
            enableAnimations 
            className="bg-gray-900/40 border border-gray-700/50 transition-all duration-500 hover:rotate-3 hover:border-blue-500/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Hover & Rotate</span>
          </AspectRatio>
          <AspectRatio 
            ratio="1:1" 
            interactive 
            animated 
            className="bg-gray-900/40 border border-gray-700/50 transition-all duration-300 hover:bg-purple-900/50 hover:border-purple-500/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Color Transition</span>
          </AspectRatio>
          <AspectRatio 
            ratio="1:1" 
            interactive 
            hoverScale 
            className="bg-gray-900/40 border border-gray-700/50 transition-transform duration-700 hover:skew-y-3 hover:border-green-500/50 flex items-center justify-center"
          >
            <span className="text-white text-sm font-medium text-center">Complex Transform</span>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 15. Portrait Ratios & Mobile */}
      <PreviewCard
        title="Portrait Ratios & Mobile"
        description="Portrait and mobile-optimized aspect ratios perfect for vertical layouts and mobile-first design.

Portrait ratios: 9:16 (mobile), 2:3 (portrait), 3:4 (photo)"
        code={`<AspectRatio ratio="9:16" variant="video" center>
  <div className="text-center text-white">
    <div className="text-3xl mb-2">📱</div>
    <span className="text-sm">9:16 Mobile</span>
  </div>
</AspectRatio>
<AspectRatio ratio="2:3" variant="image" center>
  <div className="text-center text-white">
    <div className="text-3xl mb-2">🖼️</div>
    <span className="text-sm">2:3 Portrait</span>
  </div>
</AspectRatio>
<AspectRatio customRatio="3/4" center>
  <div className="text-center text-white">
    <div className="text-3xl mb-2">📷</div>
    <span className="text-sm">3:4 Photo</span>
  </div>
</AspectRatio>`}
      >
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full mx-auto items-center px-2 sm:px-0">
          <AspectRatio ratio="9:16" variant="video" className="w-24 bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl mb-1">📱</div>
              <span className="text-xs font-medium">9:16 Mobile</span>
            </div>
          </AspectRatio>
          <AspectRatio ratio="2:3" variant="image" className="w-32 bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl mb-1">🖼️</div>
              <span className="text-xs font-medium">2:3 Portrait</span>
            </div>
          </AspectRatio>
          <AspectRatio customRatio="3/4" className="w-36 bg-gray-900/40 border border-gray-700/50 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-2xl mb-1">📷</div>
              <span className="text-xs font-medium">3:4 Photo</span>
            </div>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 16. Complex Content Layouts */}
      <PreviewCard
        title="Complex Content Layouts"
        description="Advanced content layouts with multiple elements, positioning, and complex compositions within aspect ratio containers.

Complex layouts: cards, overlays, multi-element compositions"
        code={`<AspectRatio ratio="16:9" className="relative overflow-hidden rounded-lg">
  {/* Background - could be an image or gradient */}
  <div className="w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-800/40 to-indigo-900/50" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent" />
  <div className="absolute bottom-1 left-2 right-2">
    <h3 className="text-white text-xs font-semibold leading-none">Overlay Card</h3>
    <p className="text-gray-300 text-xs leading-none mt-0.5">Image + Text</p>
  </div>
</AspectRatio>
<AspectRatio ratio="1:1" center className="bg-gradient-to-br from-indigo-900 to-purple-900">
  <div className="text-center p-4">
    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto">
      <span className="text-white text-lg">⭐</span>
    </div>
    <h4 className="text-white font-semibold text-sm mb-1">Feature Card</h4>
    <p className="text-gray-200 text-xs px-2">Multi-element composition</p>
  </div>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <AspectRatio ratio="16:9" className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800">
            {/* Fallback background pattern when image fails to load */}
            <div className="w-full h-full bg-gradient-to-br from-blue-900/30 via-purple-800/40 to-indigo-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-1 left-2 right-2 text-center">
              <h3 className="text-white text-xs font-semibold leading-none">Overlay Card</h3>
              <p className="text-gray-300 text-xs leading-none mt-0.5">Image + Text</p>
            </div>
          </AspectRatio>
          <AspectRatio ratio="1:1" className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2 mx-auto backdrop-blur-sm">
                <span className="text-white text-lg">⭐</span>
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">Feature Card</h4>
              <p className="text-gray-200 text-xs px-2 leading-tight">Multi-element composition</p>
            </div>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 17. Edge Cases & Error States */}
      <PreviewCard
        title="Edge Cases & Error States"
        description="Handling edge cases, error states, and unusual configurations to ensure robust component behavior.

Edge cases: very wide/tall ratios, error handling, disabled states with proper constraints"
        code={`<AspectRatio customRatio={0.2} center className="max-h-16">
  <span>Very Wide (0.2)</span>
</AspectRatio>
<AspectRatio customRatio={2} center className="w-24 h-32" style={{aspectRatio: 'auto'}}>
  <span className="transform -rotate-90">Tall Container</span>
</AspectRatio>
<AspectRatio ratio="16:9" center disabled>
  <div className="text-gray-500 text-center">
    <div className="text-2xl mb-2">⚠️</div>
    <span>Disabled/Error</span>
  </div>
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <AspectRatio customRatio={0.2} className="bg-gray-900/40 border border-gray-700/50 w-full max-h-20 min-h-16 flex items-center justify-center">
            <span className="text-white text-xs font-medium text-center px-2">Very Wide (0.2)</span>
          </AspectRatio>
          <AspectRatio customRatio={2} className="bg-gray-900/40 border border-gray-700/50 w-28 h-36 mx-auto flex items-center justify-center" style={{aspectRatio: 'auto'}}>
            <div className="text-white text-xs font-medium text-center flex items-center justify-center h-full">
              <span className="transform -rotate-90 whitespace-nowrap">Tall (2:1)</span>
            </div>
          </AspectRatio>
          <AspectRatio ratio="16:9" disabled className="bg-gray-900/20 border border-gray-800/50 flex items-center justify-center min-h-32">
            <div className="text-gray-500 text-center px-2 py-4">
              <div className="text-xl mb-1">⚠️</div>
              <span className="text-sm font-medium leading-tight">Disabled/Error</span>
            </div>
          </AspectRatio>
        </div>
      </PreviewCard>

      {/* 18. Resizable Aspect Ratios */}
      <PreviewCard
        title="Resizable Aspect Ratios"
        description="Interactive aspect ratio containers that can be resized by dragging, similar to textarea resize functionality. Perfect for user-customizable layouts.

Resizable features: drag handles, size constraints, aspect ratio preservation"
        code={`// 16:9 Resizable Container
<AspectRatio 
  ratio="16:9" 
  className="bg-gradient-to-br from-blue-600/40 to-purple-600/40 border-2 border-blue-500/30 rounded-lg resize overflow-auto"
  style={{ resize: 'both', width: '140px', height: '79px', minWidth: '100px', maxWidth: '200px' }}
>
  <div className="text-center text-white h-full flex flex-col justify-center p-2">
    <div className="text-lg mb-1">📐</div>
    <h3 className="font-bold text-sm">16:9 Ratio</h3>
    <p className="text-xs opacity-80 mt-1">Drag to resize</p>
  </div>
</AspectRatio>

// 1:1 Square Resizable
<AspectRatio 
  ratio="1:1" 
  className="bg-gradient-to-br from-green-500/40 to-teal-500/40 border-2 border-green-500/30 rounded-lg resize overflow-auto"
  style={{ resize: 'both', width: '120px', height: '120px', minWidth: '80px', maxWidth: '160px' }}
>
  <div className="text-center text-white h-full flex flex-col justify-center p-2">
    <div className="text-lg mb-1">⬜</div>
    <h3 className="font-bold text-sm">Square</h3>
    <p className="text-xs opacity-80 mt-1">1:1 Ratio</p>
  </div>
</AspectRatio>

// Free Resize (No Aspect Ratio)
<div 
  className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-purple-500/30 rounded-lg resize overflow-auto"
  style={{ resize: 'both', width: '140px', height: '90px', minWidth: '100px', maxWidth: '200px' }}
>
  <div className="text-center text-white h-full flex flex-col justify-center p-2">
    <div className="text-lg mb-1">🆓</div>
    <h3 className="font-bold text-sm">Free Resize</h3>
    <p className="text-xs opacity-80 mt-1">No constraints</p>
  </div>
</div>

// 4:3 Classic Resizable
<AspectRatio 
  ratio="4:3" 
  className="bg-gradient-to-br from-orange-500/40 to-red-500/40 border-2 border-orange-500/30 rounded-lg resize overflow-auto"
  style={{ resize: 'both', width: '140px', height: '105px', minWidth: '100px', maxWidth: '200px' }}
>
  <div className="text-center text-white h-full flex flex-col justify-center p-2">
    <div className="text-lg mb-1">📺</div>
    <h3 className="font-bold text-sm">4:3 Classic</h3>
    <p className="text-xs opacity-80 mt-1">Traditional</p>
  </div>
</AspectRatio>`}
      >
        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 w-80 mx-auto p-4">
            {/* Resizable with 16:9 ratio */}
            <div className="flex flex-col items-center space-y-2">
              <h4 className="text-white text-sm font-medium">16:9 Resizable</h4>
              <AspectRatio 
                ratio="16:9" 
                className="bg-gradient-to-br from-blue-600/40 to-purple-600/40 border-2 border-blue-500/30 rounded-lg resize overflow-auto"
                style={{ resize: 'both', width: '140px', height: '79px', minWidth: '100px', maxWidth: '200px', minHeight: '56px', maxHeight: '112px' }}
              >
                <div className="text-center text-white h-full flex flex-col justify-center p-2">
                  <div className="text-lg mb-1">📐</div>
                  <h3 className="font-bold text-sm">16:9 Ratio</h3>
                  <p className="text-xs opacity-80 mt-1">Drag to resize</p>
                </div>
              </AspectRatio>
            </div>

            {/* Resizable with 1:1 ratio */}
            <div className="flex flex-col items-center space-y-2">
              <h4 className="text-white text-sm font-medium">1:1 Resizable</h4>
              <AspectRatio 
                ratio="1:1" 
                className="bg-gradient-to-br from-green-500/40 to-teal-500/40 border-2 border-green-500/30 rounded-lg resize overflow-auto"
                style={{ resize: 'both', width: '120px', height: '120px', minWidth: '80px', maxWidth: '160px', minHeight: '80px', maxHeight: '160px' }}
              >
                <div className="text-center text-white h-full flex flex-col justify-center p-2">
                  <div className="text-lg mb-1">⬜</div>
                  <h3 className="font-bold text-sm">Square</h3>
                  <p className="text-xs opacity-80 mt-1">1:1 Ratio</p>
                </div>
              </AspectRatio>
            </div>

            {/* Free resize container */}
            <div className="flex flex-col items-center space-y-2">
              <h4 className="text-white text-sm font-medium">Free Resize</h4>
              <div 
                className="bg-gradient-to-br from-purple-500/40 to-pink-500/40 border-2 border-purple-500/30 rounded-lg resize overflow-auto"
                style={{ resize: 'both', width: '140px', height: '90px', minWidth: '100px', maxWidth: '200px', minHeight: '60px', maxHeight: '140px' }}
              >
                <div className="text-center text-white h-full flex flex-col justify-center p-2">
                  <div className="text-lg mb-1">🆓</div>
                  <h3 className="font-bold text-sm">Free Resize</h3>
                  <p className="text-xs opacity-80 mt-1">No constraints</p>
                </div>
              </div>
            </div>

            {/* Custom ratio resizable */}
            <div className="flex flex-col items-center space-y-2">
              <h4 className="text-white text-sm font-medium">4:3 Resizable</h4>
              <AspectRatio 
                ratio="4:3" 
                className="bg-gradient-to-br from-orange-500/40 to-red-500/40 border-2 border-orange-500/30 rounded-lg resize overflow-auto"
                style={{ resize: 'both', width: '140px', height: '105px', minWidth: '100px', maxWidth: '200px', minHeight: '75px', maxHeight: '150px' }}
              >
                <div className="text-center text-white h-full flex flex-col justify-center p-2">
                  <div className="text-lg mb-1">📺</div>
                  <h3 className="font-bold text-sm">4:3 Classic</h3>
                  <p className="text-xs opacity-80 mt-1">Traditional</p>
                </div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 19. Accessibility & Keyboard Navigation */}
      <PreviewCard
        title="Accessibility & Keyboard Navigation"
        description="Proper accessibility implementation with ARIA attributes, keyboard navigation, and focus management for inclusive user experiences.

Accessibility features: aria-label, role, tabIndex, focus/blur handlers"
        code={`// Accessible image container
<AspectRatio 
  ratio="16:9" 
  variant="image" 
  role="img" 
  aria-label="Mountain landscape photograph"
>
  <img src="..." alt="" />
</AspectRatio>

// Keyboard-navigable interactive container
<AspectRatio 
  ratio="4:3" 
  interactive 
  tabIndex={0}
  role="button"
  aria-label="View gallery"
  aria-describedby="gallery-desc"
  onFocus={() => console.log('focused')}
  onBlur={() => console.log('blurred')}
  onClick={() => console.log('clicked')}
>
  <span>Press Enter to activate</span>
</AspectRatio>
<p id="gallery-desc" className="sr-only">Opens the photo gallery</p>

// Screen reader optimized loading state
<AspectRatio 
  ratio="1:1" 
  loading 
  role="status"
  aria-label="Loading content"
  aria-busy="true"
/>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl mx-auto px-2 sm:px-0">
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Image with ARIA</span>
            <AspectRatio 
              ratio="16:9" 
              variant="image" 
              role="img" 
              aria-label="Mountain landscape photograph showing snow-capped peaks"
              className="rounded-lg overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80" 
                alt="" 
                className="w-full h-full object-cover"
              />
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Keyboard Navigable</span>
            <AspectRatio 
              ratio="4:3" 
              interactive 
              tabIndex={0}
              role="button"
              aria-label="View gallery - press Enter to activate"
              hoverScale
              className="bg-gradient-to-br from-blue-600/50 to-purple-600/50 border border-blue-500/30 rounded-lg flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={() => setIsGalleryDialogOpen(true)}
            >
              <div className="text-center text-white p-3">
                <div className="text-2xl mb-1">🖼️</div>
                <span className="text-xs font-medium">Tab here & press Enter</span>
              </div>
            </AspectRatio>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Loading with Status</span>
            <AspectRatio 
              ratio="1:1" 
              loading 
              role="status"
              aria-label="Loading content, please wait"
              aria-busy="true"
              className="rounded-lg"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 20. Focus & Blur Event Handling */}
      <PreviewCard
        title="Focus & Blur Event Handling"
        description="Demonstrate focus and blur event handlers for building custom keyboard interactions and focus management.

Events: onFocus, onBlur with visual feedback"
        code={`const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

<AspectRatio 
  ratio="1:1" 
  interactive 
  tabIndex={0}
  onFocus={() => setFocusedIndex(0)}
  onBlur={() => setFocusedIndex(null)}
  className={focusedIndex === 0 ? 'ring-2 ring-yellow-500' : ''}
>
  <span>Focus me</span>
</AspectRatio>`}
      >
        <FocusBlurDemo />
      </PreviewCard>

      {/* 21. Real-World Use Cases */}
      <PreviewCard
        title="Real-World Use Cases"
        description="Practical examples showing how AspectRatio can be used in common UI patterns like cards, thumbnails, and media galleries.

Use cases: product cards, video thumbnails, profile avatars, feature highlights"
        code={`// Product Card
<AspectRatio ratio="4:3" variant="image" rounded="lg" shadow="md">
  <img src="product.jpg" alt="Product" />
  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-3">
    <h3 className="text-white font-bold">Product Name</h3>
    <p className="text-gray-300 text-sm">$99.99</p>
  </div>
</AspectRatio>

// Video Thumbnail with Play Button
<AspectRatio ratio="16:9" variant="video" interactive rounded="xl">
  <img src="thumbnail.jpg" alt="Video thumbnail" />
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
      <span className="text-2xl ml-1">▶</span>
    </div>
  </div>
</AspectRatio>

// Profile Avatar
<AspectRatio ratio="1:1" rounded="full" shadow="lg" size="lg">
  <img src="avatar.jpg" alt="User avatar" className="rounded-full" />
</AspectRatio>`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl mx-auto px-4 sm:px-2">
          {/* Product Card */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Product Card</span>
            <AspectRatio ratio="4:3" variant="image" rounded="lg" shadow="lg" className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80" 
                alt="Minimalist watch product" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 sm:p-4">
                <h3 className="text-white font-bold text-sm">Minimalist Watch</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-gray-300 text-xs">$299.99</span>
                  <span className="text-yellow-400 text-xs">★★★★★</span>
                </div>
              </div>
            </AspectRatio>
          </div>

          {/* Video Thumbnail */}
          <div className="flex flex-col gap-2">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Video Thumbnail</span>
            <AspectRatio 
              ratio="16:9" 
              variant="video" 
              interactive 
              hoverScale
              rounded="xl" 
              shadow="lg"
              className="overflow-hidden cursor-pointer"
              onClick={() => setIsVideoDialogOpen(true)}
            >
              <img 
                src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=400&q=80" 
                alt="Video thumbnail" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/95 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                  <span className="text-gray-900 text-lg sm:text-xl ml-1">▶</span>
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                12:34
              </div>
            </AspectRatio>
          </div>

          {/* Profile Avatar */}
          <div className="flex flex-col gap-2 sm:col-span-2 lg:col-span-1">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Profile Avatar</span>
            <div className="flex flex-row items-center gap-4 p-4 bg-gray-900/30 rounded-lg border border-gray-700/50">
              <AspectRatio 
                ratio="1:1" 
                rounded="full" 
                shadow="xl" 
                className="overflow-hidden border-4 border-white/20 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0"
              >
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80" 
                  alt="User avatar" 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              <div className="text-white min-w-0 flex-1">
                <h4 className="font-semibold text-sm sm:text-base truncate">John Doe</h4>
                <p className="text-gray-400 text-xs sm:text-sm truncate">Product Designer</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-green-400 text-xs">Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* Props Reference Table */}
      <PropsReference />
      
      {/* Dialog for Interactive Demo */}
      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="🎉 AspectRatio Clicked!"
        size="small"
        actions={
          <button 
            onClick={() => setIsDialogOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Close
          </button>
        }
      >
        <p className="text-gray-300 m-0 leading-relaxed">
          Interactive container successfully triggered the dialog! This demonstrates how AspectRatio components can handle click events and integrate with other UI components.
        </p>
      </Dialog>

      {/* Dialog for Gallery Demo */}
      <Dialog
        open={isGalleryDialogOpen}
        onClose={() => setIsGalleryDialogOpen(false)}
        title="🖼️ Gallery Opened!"
        size="small"
        actions={
          <button 
            onClick={() => setIsGalleryDialogOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Close Gallery
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          <p className="text-gray-300 m-0 leading-relaxed">
            The keyboard-navigable AspectRatio container successfully opened this gallery dialog using keyboard or mouse interaction.
          </p>
          <div className="grid grid-cols-3 gap-2">
            <AspectRatio ratio="1:1" variant="image" rounded="md" className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=100&q=80" alt="Gallery 1" className="w-full h-full object-cover" />
            </AspectRatio>
            <AspectRatio ratio="1:1" variant="image" rounded="md" className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=100&q=80" alt="Gallery 2" className="w-full h-full object-cover" />
            </AspectRatio>
            <AspectRatio ratio="1:1" variant="image" rounded="md" className="overflow-hidden">
              <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=100&q=80" alt="Gallery 3" className="w-full h-full object-cover" />
            </AspectRatio>
          </div>
        </div>
      </Dialog>

      {/* Dialog for Video Demo */}
      <Dialog
        open={isVideoDialogOpen}
        onClose={() => setIsVideoDialogOpen(false)}
        title="▶️ Video Player"
        size="medium"
        actions={
          <button 
            onClick={() => setIsVideoDialogOpen(false)}
            className="px-4 py-2 bg-blue-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-blue-500 transition-colors"
          >
            Close Player
          </button>
        }
      >
        <div className="flex flex-col gap-3">
          <AspectRatio ratio="16:9" variant="video" rounded="lg" className="overflow-hidden bg-black">
            <video 
              className="w-full h-full object-cover" 
              controls 
              autoPlay
              muted
              poster="https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=600&q=80"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </AspectRatio>
          <p className="text-gray-400 text-sm m-0 text-center">
            Video thumbnail click opened this dialog with an embedded video player.
          </p>
        </div>
      </Dialog>
    </div>
  );
}

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          AspectRatio Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          AspectRatio is a flexible container component that maintains consistent proportions across different screen sizes.
          It accepts all standard HTML div attributes plus the specialized props below.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "Prop", width: "18%" },
                { label: "Type", width: "24%" },
                { label: "Default", width: "12%" },
                { label: "Description", width: "46%" },
              ].map((header) => (
                <th
                  key={header.label}
                  className="text-left p-3 text-xs tracking-wider uppercase text-[#99A1AF] border-b border-[#364153]"
                  style={{ width: header.width }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {propDefinitions.map((prop) => (
              <tr key={prop.name}>
                <td className="p-3 border-b border-[#2B3546] font-medium text-white">
                  {prop.name}
                </td>
                <td className="p-3 border-b border-[#2B3546]">
                  <code className="text-xs bg-gray-800/50 px-2 py-1 rounded">{prop.type}</code>
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7]">
                  {prop.defaultValue}
                </td>
                <td className="p-3 border-b border-[#2B3546] text-[#C7CBD7] leading-relaxed">
                  {prop.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}