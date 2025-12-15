import { useState } from "react";
import { PreviewCard } from "../components/PreviewCard";
import { Skeleton } from "../../../src/components/skeleton/skeleton";
import { SkeletonGroup } from "../../../src/components/skeleton/SkeletonGroup";
import { SkeletonLines } from "../../../src/components/skeleton/SkeletonLines";
import { Button } from "@/components/button";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const skeletonProps: PropDefinition[] = [
  { name: "variant", type: "'text' | 'rect' | 'circle'", defaultValue: "'text'", description: "Shape of the skeleton element." },
  { name: "width", type: "string | number", defaultValue: "auto", description: "Width in pixels (number) or CSS units (string)." },
  { name: "height", type: "string | number", defaultValue: "auto", description: "Height in pixels (number) or CSS units (string)." },
  { name: "radius", type: "string | number", defaultValue: "-", description: "Border radius override for custom corners." },
  { name: "animated", type: "boolean", defaultValue: "true", description: "Enable or disable animation." },
  { name: "animation", type: "'shimmer' | 'pulse' | 'wave' | 'none'", defaultValue: "'shimmer'", description: "Animation type to use." },
  { name: "baseColor", type: "string", defaultValue: "#3a3a3a", description: "Background color of the skeleton." },
  { name: "highlightColor", type: "string", defaultValue: "rgba(255,255,255,0.1)", description: "Shimmer/wave highlight color." },
  { name: "duration", type: "number", defaultValue: "1.5", description: "Animation duration in seconds." },
  { name: "direction", type: "'ltr' | 'rtl'", defaultValue: "'ltr'", description: "Animation direction for shimmer/wave." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Makes skeleton take full width of parent." },
  { name: "count", type: "number", defaultValue: "1", description: "Number of skeleton instances to render." },
  { name: "gap", type: "string | number", defaultValue: "8", description: "Gap between repeated skeletons when count > 1." },
  { name: "inline", type: "boolean", defaultValue: "false", description: "Render as inline element (horizontal layout)." },
  { name: "ariaLabel", type: "string", defaultValue: "'Loading...'", description: "Accessibility label for screen readers." },
  { name: "className", type: "string", defaultValue: "''", description: "Additional CSS classes for styling." },
  { name: "style", type: "CSSProperties", defaultValue: "{}", description: "Inline styles for the component." },
];

const skeletonLinesProps: PropDefinition[] = [
  { name: "lines", type: "number", defaultValue: "3", description: "Number of text lines to render." },
  { name: "spacing", type: "number | string", defaultValue: "8", description: "Gap between lines in pixels or CSS units." },
  { name: "width", type: "string | number", defaultValue: "'100%'", description: "Width of all lines except the last." },
  { name: "lastLineWidth", type: "string | number", defaultValue: "'70%'", description: "Width of the last line for natural text feel." },
  { name: "randomize", type: "boolean", defaultValue: "false", description: "Randomize line widths for more natural look." },
  { name: "minRandomWidth", type: "number", defaultValue: "60", description: "Minimum random width percentage (0-100)." },
  { name: "maxRandomWidth", type: "number", defaultValue: "100", description: "Maximum random width percentage (0-100)." },
  { name: "lineWidths", type: "(string | number)[]", defaultValue: "-", description: "Custom width for each line (overrides width)." },
  { name: "lineHeights", type: "(string | number)[]", defaultValue: "-", description: "Custom height for each line (overrides height)." },
  { name: "containerClassName", type: "string", defaultValue: "-", description: "CSS classes for the container element." },
  { name: "containerStyle", type: "CSSProperties", defaultValue: "-", description: "Inline styles for the container element." },
];

const skeletonGroupProps: PropDefinition[] = [
  { name: "spacing", type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number", defaultValue: "'sm'", description: "Preset spacing size between children." },
  { name: "gap", type: "string | number", defaultValue: "-", description: "Custom gap value (overrides spacing preset)." },
  { name: "direction", type: "'column' | 'row'", defaultValue: "'column'", description: "Layout direction of children." },
  { name: "align", type: "'start' | 'center' | 'end' | 'stretch'", defaultValue: "-", description: "Cross-axis alignment of children." },
  { name: "justify", type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'", defaultValue: "-", description: "Main-axis alignment of children." },
  { name: "wrap", type: "boolean", defaultValue: "false", description: "Enable flex wrap for children." },
  { name: "className", type: "string", defaultValue: "''", description: "Additional CSS classes for styling." },
  { name: "style", type: "CSSProperties", defaultValue: "{}", description: "Inline styles for the component." },
];

function PropsTable({ props, title, description }: { props: PropDefinition[]; title: string; description: string }) {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          {title}
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          {description}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "Prop", width: "18%" },
                { label: "Type", width: "28%" },
                { label: "Default", width: "14%" },
                { label: "Description", width: "40%" },
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
            {props.map((prop) => (
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

export function SkeletonPreview() {
  const [animationType, setAnimationType] = useState<"shimmer" | "pulse" | "wave" | "none">("shimmer");
  const [isAnimated, setIsAnimated] = useState(true);
  const [baseColor, setBaseColor] = useState("#3a3a3a");
  const [duration, setDuration] = useState(1.5);

  return (
    <div className="flex flex-col gap-8">
      {/* Basic Variants */}
      <PreviewCard
        title="Basic Skeleton Variants"
        description="Three fundamental shapes: text (default), rectangle, and circle. Perfect for loading states of text, images, and avatars."
        code={`import { Skeleton } from "andhera-react";

export function BasicVariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Text skeleton - default */}
      <Skeleton variant="text" width="100%" height={16} />
      
      {/* Rectangle skeleton for content blocks */}
      <Skeleton variant="rect" width="100%" height={120} />
      
      {/* Circle skeleton for avatars */}
      <Skeleton variant="circle" width={48} height={48} />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <div className="w-full space-y-3">
            <p className="text-xs text-gray-400 mb-1">Text variant:</p>
            <Skeleton variant="text" width="100%" height={16} />
          </div>
          
          <div className="w-full space-y-3">
            <p className="text-xs text-gray-400 mb-1">Rectangle variant:</p>
            <Skeleton variant="rect" width="100%" height={120} />
          </div>
          
          <div className="w-full space-y-3">
            <p className="text-xs text-gray-400 mb-1">Circle variant:</p>
            <Skeleton variant="circle" width={48} height={48} />
          </div>
        </div>
      </PreviewCard>

      {/* Interactive Playground */}
      <PreviewCard
        title="Interactive Playground"
        description="Customize skeleton properties in real-time. Adjust animation type, colors, and duration to see how they affect the skeleton appearance."
        code={`import { Skeleton } from "andhera-react";
import { useState } from "react";

export function InteractiveExample() {
  const [animation, setAnimation] = useState<"shimmer" | "pulse" | "wave" | "none">("shimmer");
  const [baseColor, setBaseColor] = useState("#3a3a3a");
  const [duration, setDuration] = useState(1.5);

  return (
    <div>
      {/* Controls */}
      <div className="flex gap-4 mb-4">
        <select value={animation} onChange={(e) => setAnimation(e.target.value)}>
          <option value="shimmer">Shimmer</option>
          <option value="pulse">Pulse</option>
          <option value="wave">Wave</option>
          <option value="none">None</option>
        </select>
        <input type="color" value={baseColor} onChange={(e) => setBaseColor(e.target.value)} />
        <input type="range" min={0.5} max={3} step={0.1} value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
      </div>

      {/* Preview */}
      <Skeleton
        variant="rect"
        width="100%"
        height={80}
        animation={animation}
        baseColor={baseColor}
        duration={duration}
      />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 w-full max-w-lg">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Animation Type</label>
              <div className="flex flex-wrap gap-2">
                {(["shimmer", "pulse", "wave", "none"] as const).map((type) => (
                  <Button
                    key={type}
                    size="xs"
                    variant={animationType === type ? "primary" : "secondary"}
                    onClick={() => setAnimationType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Animated</label>
              <div className="flex gap-2">
                <Button
                  size="xs"
                  variant={isAnimated ? "primary" : "secondary"}
                  onClick={() => setIsAnimated(true)}
                >
                  On
                </Button>
                <Button
                  size="xs"
                  variant={!isAnimated ? "primary" : "secondary"}
                  onClick={() => setIsAnimated(false)}
                >
                  Off
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">Base Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-10 h-8 rounded cursor-pointer"
                />
                <span className="text-xs text-gray-500 font-mono">{baseColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-400">Duration: {duration}s</label>
              <input
                type="range"
                min={0.5}
                max={4}
                step={0.1}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-3">
            <Skeleton
              variant="rect"
              width="100%"
              height={80}
              radius={8}
              animation={animationType}
              animated={isAnimated}
              baseColor={baseColor}
              duration={duration}
            />
            <div className="flex gap-3">
              <Skeleton
                variant="circle"
                width={48}
                height={48}
                animation={animationType}
                animated={isAnimated}
                baseColor={baseColor}
                duration={duration}
              />
              <div className="flex-1 space-y-2">
                <Skeleton
                  variant="text"
                  width="70%"
                  height={14}
                  animation={animationType}
                  animated={isAnimated}
                  baseColor={baseColor}
                  duration={duration}
                />
                <Skeleton
                  variant="text"
                  width="50%"
                  height={12}
                  animation={animationType}
                  animated={isAnimated}
                  baseColor={baseColor}
                  duration={duration}
                />
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* Custom Dimensions */}
      <PreviewCard
        title="Custom Dimensions"
        description="Customize width and height to match your content. Supports both pixel values (numbers) and CSS units (strings)."
        code={`import { Skeleton } from "andhera-react";

export function CustomDimensionsExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Fixed pixel dimensions */}
      <Skeleton variant="text" width={200} height={16} />
      
      {/* Percentage-based width */}
      <Skeleton variant="text" width="75%" height={14} />
      
      {/* CSS units (rem) */}
      <Skeleton variant="rect" width="100%" height="8rem" />
      
      {/* Full width prop */}
      <Skeleton variant="text" fullWidth height={16} />
      
      {/* Large circle */}
      <Skeleton variant="circle" width={80} height={80} />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <Skeleton variant="text" width={200} height={16} />
          <Skeleton variant="text" width="75%" height={14} />
          <Skeleton variant="rect" width="100%" height="8rem" />
          <Skeleton variant="text" fullWidth height={16} />
          <Skeleton variant="circle" width={80} height={80} />
        </div>
      </PreviewCard>

      {/* Border Radius */}
      <PreviewCard
        title="Custom Border Radius"
        description="Override the default border radius to create rounded corners, pill shapes, or custom curves."
        code={`import { Skeleton } from "andhera-react";

export function BorderRadiusExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Sharp corners */}
      <Skeleton variant="rect" width="100%" height={60} radius={0} />
      
      {/* Rounded corners */}
      <Skeleton variant="rect" width="100%" height={60} radius={12} />
      
      {/* Pill shape */}
      <Skeleton variant="rect" width={200} height={40} radius={20} />
      
      {/* CSS unit */}
      <Skeleton variant="rect" width="100%" height={60} radius="1.5rem" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Sharp (radius=0):</p>
            <Skeleton variant="rect" width="100%" height={60} radius={0} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Rounded (radius=12):</p>
            <Skeleton variant="rect" width="100%" height={60} radius={12} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Pill (radius=20):</p>
            <Skeleton variant="rect" width={200} height={40} radius={20} />
          </div>
        </div>
      </PreviewCard>

      {/* Animation Types */}
      <PreviewCard
        title="Animation Types"
        description="Choose from shimmer (default), pulse, or wave animations. Disable animation for static placeholders."
        code={`import { Skeleton } from "andhera-react";

export function AnimationTypesExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Shimmer animation (default) */}
      <Skeleton variant="rect" width="100%" height={60} animation="shimmer" />
      
      {/* Pulse animation */}
      <Skeleton variant="rect" width="100%" height={60} animation="pulse" />
      
      {/* Wave animation */}
      <Skeleton variant="rect" width="100%" height={60} animation="wave" />
      
      {/* No animation */}
      <Skeleton variant="rect" width="100%" height={60} animation="none" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Shimmer animation (default):</p>
            <Skeleton variant="rect" width="100%" height={60} animation="shimmer" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Pulse animation:</p>
            <Skeleton variant="rect" width="100%" height={60} animation="pulse" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Wave animation:</p>
            <Skeleton variant="rect" width="100%" height={60} animation="wave" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Static (no animation):</p>
            <Skeleton variant="rect" width="100%" height={60} animation="none" />
          </div>
        </div>
      </PreviewCard>

      {/* Custom Colors */}
      <PreviewCard
        title="Custom Colors"
        description="Customize the base color and highlight color to match your theme or create branded loading states."
        code={`import { Skeleton } from "andhera-react";

export function CustomColorsExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Default dark theme */}
      <Skeleton variant="rect" width="100%" height={60} baseColor="#3a3a3a" />
      
      {/* Light theme */}
      <Skeleton variant="rect" width="100%" height={60} baseColor="#e5e7eb" highlightColor="rgba(255, 255, 255, 0.8)" />
      
      {/* Brand color - Yellow */}
      <Skeleton variant="rect" width="100%" height={60} baseColor="#FFCB00" highlightColor="rgba(255, 255, 255, 0.4)" />
      
      {/* Blue theme */}
      <Skeleton variant="rect" width="100%" height={60} baseColor="#1e3a5f" highlightColor="rgba(59, 130, 246, 0.3)" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Default dark:</p>
            <Skeleton variant="rect" width="100%" height={60} baseColor="#3a3a3a" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Light theme:</p>
            <Skeleton variant="rect" width="100%" height={60} baseColor="#e5e7eb" highlightColor="rgba(255, 255, 255, 0.8)" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Brand yellow:</p>
            <Skeleton variant="rect" width="100%" height={60} baseColor="#FFCB00" highlightColor="rgba(255, 255, 255, 0.4)" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Blue theme:</p>
            <Skeleton variant="rect" width="100%" height={60} baseColor="#1e3a5f" highlightColor="rgba(59, 130, 246, 0.3)" />
          </div>
        </div>
      </PreviewCard>

      {/* Animation Duration & Direction */}
      <PreviewCard
        title="Animation Duration & Direction"
        description="Control animation speed with duration prop and direction with the direction prop for RTL support."
        code={`import { Skeleton } from "andhera-react";

export function DurationDirectionExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Fast animation (0.8s) */}
      <Skeleton variant="rect" width="100%" height={50} duration={0.8} />
      
      {/* Default speed (1.5s) */}
      <Skeleton variant="rect" width="100%" height={50} duration={1.5} />
      
      {/* Slow animation (3s) */}
      <Skeleton variant="rect" width="100%" height={50} duration={3} />
      
      {/* RTL direction */}
      <Skeleton variant="rect" width="100%" height={50} direction="rtl" />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Fast (0.8s):</p>
            <Skeleton variant="rect" width="100%" height={50} duration={0.8} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Default (1.5s):</p>
            <Skeleton variant="rect" width="100%" height={50} duration={1.5} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Slow (3s):</p>
            <Skeleton variant="rect" width="100%" height={50} duration={3} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">RTL direction:</p>
            <Skeleton variant="rect" width="100%" height={50} direction="rtl" />
          </div>
        </div>
      </PreviewCard>

      {/* Count & Inline */}
      <PreviewCard
        title="Multiple Skeletons (Count)"
        description="Render multiple skeleton instances with the count prop. Use inline prop for horizontal layout."
        code={`import { Skeleton } from "andhera-react";

export function CountExample() {
  return (
    <div className="flex flex-col gap-6">
      {/* Vertical stack of 4 skeletons */}
      <Skeleton variant="text" width="100%" height={14} count={4} gap={8} />
      
      {/* Inline row of circles */}
      <Skeleton variant="circle" width={40} height={40} count={5} gap={12} inline />
      
      {/* Inline rectangles for tags */}
      <Skeleton variant="rect" width={80} height={28} radius={14} count={4} gap={8} inline />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Vertical stack (count=4):</p>
            <Skeleton variant="text" width="100%" height={14} count={4} gap={8} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Inline circles (count=5):</p>
            <Skeleton variant="circle" width={40} height={40} count={5} gap={12} inline />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Inline tags (count=4):</p>
            <Skeleton variant="rect" width={80} height={28} radius={14} count={4} gap={8} inline />
          </div>
        </div>
      </PreviewCard>

      {/* SkeletonLines Component */}
      <PreviewCard
        title="Multiple Text Lines"
        description="Use SkeletonLines to render multiple text skeleton lines at once. Customize line count, spacing, and widths."
        code={`import { SkeletonLines } from "andhera-react";

export function SkeletonLinesExample() {
  return (
    <div className="flex flex-col gap-6">
      {/* Default 3 lines */}
      <SkeletonLines lines={3} />
      
      {/* 5 lines with custom last line width */}
      <SkeletonLines lines={5} lastLineWidth="60%" />
      
      {/* Randomized widths for natural look */}
      <SkeletonLines lines={4} randomize />
      
      {/* Custom widths per line */}
      <SkeletonLines 
        lines={3} 
        lineWidths={["100%", "85%", "60%"]}
        lineHeights={[20, 14, 14]}
      />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">3 lines (default):</p>
            <SkeletonLines lines={3} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">5 lines with 60% last line:</p>
            <SkeletonLines lines={5} lastLineWidth="60%" />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Randomized widths:</p>
            <SkeletonLines lines={4} randomize />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Custom widths & heights:</p>
            <SkeletonLines 
              lines={3} 
              lineWidths={["100%", "85%", "60%"]}
              lineHeights={[20, 14, 14]}
            />
          </div>
        </div>
      </PreviewCard>

      {/* SkeletonGroup Component */}
      <PreviewCard
        title="Grouped Skeletons"
        description="Use SkeletonGroup to organize multiple skeleton elements with customizable spacing, direction, and alignment."
        code={`import { Skeleton, SkeletonGroup } from "andhera-react";

export function SkeletonGroupExample() {
  return (
    <div className="flex flex-col gap-6">
      {/* Vertical group with medium spacing */}
      <SkeletonGroup spacing="md">
        <Skeleton variant="circle" width={60} height={60} />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </SkeletonGroup>
      
      {/* Horizontal group */}
      <SkeletonGroup direction="row" spacing="lg" align="center">
        <Skeleton variant="circle" width={48} height={48} />
        <Skeleton variant="text" width={200} />
      </SkeletonGroup>
      
      {/* Custom gap value */}
      <SkeletonGroup gap={24}>
        <Skeleton variant="rect" width="100%" height={80} />
        <Skeleton variant="text" width="50%" />
      </SkeletonGroup>
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-6 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Vertical with medium spacing:</p>
            <SkeletonGroup spacing="md">
              <Skeleton variant="circle" width={60} height={60} />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="text" width="60%" />
            </SkeletonGroup>
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Horizontal with center align:</p>
            <SkeletonGroup direction="row" spacing="lg" align="center">
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="text" width={200} height={14} />
            </SkeletonGroup>
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Custom gap (24px):</p>
            <SkeletonGroup gap={24}>
              <Skeleton variant="rect" width="100%" height={80} />
              <Skeleton variant="text" width="50%" />
            </SkeletonGroup>
          </div>
        </div>
      </PreviewCard>

      {/* Card Skeleton Pattern */}
      <PreviewCard
        title="Card Skeleton Pattern"
        description="Combine skeleton components to create realistic loading placeholders for complex UI patterns like profile cards."
        code={`import { Skeleton, SkeletonGroup, SkeletonLines } from "andhera-react";

export function CardSkeletonExample() {
  return (
    <div className="border border-gray-700 rounded-xl p-6 max-w-md">
      <SkeletonGroup spacing="md">
        {/* Header with avatar */}
        <SkeletonGroup direction="row" spacing="md" align="center">
          <Skeleton variant="circle" width={48} height={48} />
          <SkeletonGroup spacing="xs" style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={16} />
            <Skeleton variant="text" width="40%" height={12} />
          </SkeletonGroup>
        </SkeletonGroup>
        
        {/* Content lines */}
        <SkeletonLines lines={3} lastLineWidth="70%" />
        
        {/* Image placeholder */}
        <Skeleton variant="rect" width="100%" height={200} radius={8} />
        
        {/* Footer actions */}
        <SkeletonGroup direction="row" spacing="sm">
          <Skeleton variant="rect" width={80} height={32} radius={6} />
          <Skeleton variant="rect" width={80} height={32} radius={6} />
        </SkeletonGroup>
      </SkeletonGroup>
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full">
          <div style={{ 
            border: "1px solid #364153", 
            borderRadius: "12px", 
            padding: "1.5rem",
            maxWidth: "400px",
            width: "100%",
            background: "rgba(255, 255, 255, 0.02)"
          }}>
            <SkeletonGroup spacing="md">
              <SkeletonGroup direction="row" spacing="md" align="center">
                <Skeleton variant="circle" width={48} height={48} />
                <SkeletonGroup spacing="xs" style={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" height={16} />
                  <Skeleton variant="text" width="40%" height={12} />
                </SkeletonGroup>
              </SkeletonGroup>
              
              <SkeletonLines lines={3} lastLineWidth="70%" />
              
              <Skeleton variant="rect" width="100%" height={200} radius={8} />
              
              <SkeletonGroup direction="row" spacing="sm">
                <Skeleton variant="rect" width={80} height={32} radius={6} />
                <Skeleton variant="rect" width={80} height={32} radius={6} />
              </SkeletonGroup>
            </SkeletonGroup>
          </div>
        </div>
      </PreviewCard>

      {/* List Skeleton Pattern */}
      <PreviewCard
        title="List Skeleton Pattern"
        description="Create repeating skeleton patterns for lists, feeds, or tables using map() with skeleton components."
        code={`import { Skeleton, SkeletonGroup } from "andhera-react";

export function ListSkeletonExample() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex gap-4 items-center p-4 border border-gray-700 rounded-lg">
          <Skeleton variant="circle" width={40} height={40} />
          <SkeletonGroup spacing="xs" style={{ flex: 1 }}>
            <Skeleton variant="text" width="70%" height={14} />
            <Skeleton variant="text" width="50%" height={12} />
          </SkeletonGroup>
          <Skeleton variant="rect" width={60} height={24} radius={4} />
        </div>
      ))}
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index}
              style={{ 
                display: "flex", 
                gap: "1rem", 
                alignItems: "center",
                padding: "1rem",
                border: "1px solid #364153",
                borderRadius: "8px",
                width: "100%",
                background: "rgba(255, 255, 255, 0.02)"
              }}
            >
              <Skeleton variant="circle" width={40} height={40} />
              <SkeletonGroup spacing="xs" style={{ flex: 1 }}>
                <Skeleton variant="text" width="70%" height={14} />
                <Skeleton variant="text" width="50%" height={12} />
              </SkeletonGroup>
              <Skeleton variant="rect" width={60} height={24} radius={4} />
            </div>
          ))}
        </div>
      </PreviewCard>

      {/* Form Skeleton Pattern */}
      <PreviewCard
        title="Form Skeleton Pattern"
        description="Skeleton loader for forms with labels, inputs, and buttons."
        code={`import { Skeleton, SkeletonGroup } from "andhera-react";

export function FormSkeletonExample() {
  return (
    <div className="max-w-md">
      <SkeletonGroup spacing="lg">
        {/* Form Title */}
        <Skeleton variant="text" width="50%" height={24} />
        
        {/* Form Fields */}
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonGroup key={index} spacing="xs">
            <Skeleton variant="text" width="30%" height={14} />
            <Skeleton variant="rect" width="100%" height={40} radius={6} />
          </SkeletonGroup>
        ))}
        
        {/* Checkbox */}
        <SkeletonGroup direction="row" spacing="sm" align="center">
          <Skeleton variant="rect" width={18} height={18} radius={4} />
          <Skeleton variant="text" width="40%" height={14} />
        </SkeletonGroup>
        
        {/* Buttons */}
        <SkeletonGroup direction="row" spacing="sm">
          <Skeleton variant="rect" width={120} height={40} radius={6} />
          <Skeleton variant="rect" width={100} height={40} radius={6} />
        </SkeletonGroup>
      </SkeletonGroup>
    </div>
  );
}`}
      >
        <div className="flex flex-col items-center w-full">
          <div style={{ maxWidth: "500px", width: "100%", padding: "1.5rem", border: "1px solid #364153", borderRadius: "12px", background: "rgba(255, 255, 255, 0.02)" }}>
            <SkeletonGroup spacing="lg">
              <Skeleton variant="text" width="50%" height={24} />
              
              {Array.from({ length: 3 }).map((_, index) => (
                <SkeletonGroup key={index} spacing="xs">
                  <Skeleton variant="text" width="30%" height={14} />
                  <Skeleton variant="rect" width="100%" height={40} radius={6} />
                </SkeletonGroup>
              ))}
              
              <SkeletonGroup direction="row" spacing="sm" align="center">
                <Skeleton variant="rect" width={18} height={18} radius={4} />
                <Skeleton variant="text" width="40%" height={14} />
              </SkeletonGroup>
              
              <SkeletonGroup direction="row" spacing="sm">
                <Skeleton variant="rect" width={120} height={40} radius={6} />
                <Skeleton variant="rect" width={100} height={40} radius={6} />
              </SkeletonGroup>
            </SkeletonGroup>
          </div>
        </div>
      </PreviewCard>

      {/* Dashboard Stats Skeleton */}
      <PreviewCard
        title="Dashboard Stats Skeleton"
        description="Statistics cards skeleton for dashboards with metrics and icons."
        code={`import { Skeleton, SkeletonGroup } from "andhera-react";

export function DashboardStatsExample() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="p-6 border border-gray-700 rounded-xl">
          <SkeletonGroup spacing="md">
            <SkeletonGroup direction="row" justify="between" align="center">
              <Skeleton variant="text" width="60%" height={14} />
              <Skeleton variant="rect" width={32} height={32} radius={8} />
            </SkeletonGroup>
            <Skeleton variant="text" width="50%" height={32} />
            <SkeletonGroup direction="row" spacing="xs" align="center">
              <Skeleton variant="rect" width={16} height={16} radius={4} />
              <Skeleton variant="text" width="40%" height={12} />
            </SkeletonGroup>
          </SkeletonGroup>
        </div>
      ))}
    </div>
  );
}`}
      >
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                style={{ 
                  padding: "1.5rem",
                  border: "1px solid #364153",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.02)"
                }}
              >
                <SkeletonGroup spacing="md">
                  <SkeletonGroup direction="row" justify="between" align="center">
                    <Skeleton variant="text" width="60%" height={14} />
                    <Skeleton variant="rect" width={32} height={32} radius={8} />
                  </SkeletonGroup>
                  <Skeleton variant="text" width="50%" height={32} />
                  <SkeletonGroup direction="row" spacing="xs" align="center">
                    <Skeleton variant="rect" width={16} height={16} radius={4} />
                    <Skeleton variant="text" width="40%" height={12} />
                  </SkeletonGroup>
                </SkeletonGroup>
              </div>
            ))}
          </div>
        </div>
      </PreviewCard>

      {/* Product Card Grid Skeleton */}
      <PreviewCard
        title="Product Card Grid Skeleton"
        description="E-commerce product grid with images, titles, prices, and ratings."
        code={`import { Skeleton, SkeletonGroup } from "andhera-react";

export function ProductCardGridExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="border border-gray-700 rounded-xl overflow-hidden">
          <Skeleton variant="rect" width="100%" height={120} radius={0} />
          <div className="p-4">
            <SkeletonGroup spacing="sm">
              <Skeleton variant="text" width="90%" height={16} />
              <Skeleton variant="text" width="70%" height={14} />
              <SkeletonGroup direction="row" justify="between" align="center">
                <Skeleton variant="text" width="40%" height={20} />
                <Skeleton variant="circle" width={24} height={24} count={5} gap={2} inline />
              </SkeletonGroup>
              <Skeleton variant="rect" width="100%" height={36} radius={6} />
            </SkeletonGroup>
          </div>
        </div>
      ))}
    </div>
  );
}`}
      >
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index}
                style={{ 
                  border: "1px solid #364153",
                  borderRadius: "12px",
                  overflow: "hidden",
                  background: "rgba(255, 255, 255, 0.02)"
                }}
              >
                <Skeleton variant="rect" width="100%" height={120} radius={0} />
                <div style={{ padding: "1rem" }}>
                  <SkeletonGroup spacing="sm">
                    <Skeleton variant="text" width="90%" height={16} />
                    <Skeleton variant="text" width="70%" height={14} />
                    <SkeletonGroup direction="row" justify="between" align="center">
                      <Skeleton variant="text" width="40%" height={20} />
                      <div style={{ display: "flex", gap: "2px" }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Skeleton key={i} variant="rect" width={12} height={12} radius={2} />
                        ))}
                      </div>
                    </SkeletonGroup>
                    <Skeleton variant="rect" width="100%" height={36} radius={6} />
                  </SkeletonGroup>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PreviewCard>

      {/* Accessibility */}
      <PreviewCard
        title="Accessibility Features"
        description="Skeleton includes built-in accessibility with role='status', aria-busy, and aria-label. Custom labels can be provided."
        code={`import { Skeleton } from "andhera-react";

export function AccessibilityExample() {
  return (
    <div className="flex flex-col gap-4">
      {/* Default aria-label */}
      <Skeleton variant="rect" width="100%" height={60} />
      
      {/* Custom aria-label */}
      <Skeleton 
        variant="rect" 
        width="100%" 
        height={60} 
        ariaLabel="Loading user profile..."
      />
      
      {/* Static skeleton (aria-busy=false) */}
      <Skeleton 
        variant="rect" 
        width="100%" 
        height={60} 
        animated={false}
        ariaLabel="Content placeholder"
      />
    </div>
  );
}`}
      >
        <div className="flex flex-col gap-4 items-center w-full max-w-md">
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Default (aria-label="Loading..."):</p>
            <Skeleton variant="rect" width="100%" height={60} />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Custom (aria-label="Loading user profile..."):</p>
            <Skeleton variant="rect" width="100%" height={60} ariaLabel="Loading user profile..." />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-xs text-gray-400">Static placeholder:</p>
            <Skeleton variant="rect" width="100%" height={60} animated={false} ariaLabel="Content placeholder" />
          </div>
        </div>
      </PreviewCard>

      {/* Props Reference Tables */}
      <PropsTable 
        props={skeletonProps} 
        title="Skeleton Props" 
        description="The main Skeleton component for creating loading placeholders. It supports various shapes, animations, and full customization of colors and timing."
      />
      
      <PropsTable 
        props={skeletonLinesProps} 
        title="SkeletonLines Props" 
        description="A convenience component for rendering multiple text skeleton lines at once. Inherits all Skeleton props for individual line customization."
      />
      
      <PropsTable 
        props={skeletonGroupProps} 
        title="SkeletonGroup Props" 
        description="A layout component for organizing multiple skeleton elements with consistent spacing and alignment. Uses flexbox for flexible layouts."
      />

    </div>
  );
}

export default SkeletonPreview;
