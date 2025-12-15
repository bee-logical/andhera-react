import { useState } from "react";
import { PreviewCard } from "../components/PreviewCard";
import { Rating, Snackbar } from "@/components";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "value", type: "number | null", defaultValue: "null", description: "The current value of the rating (controlled)." },
  { name: "defaultValue", type: "number | null", defaultValue: "null", description: "The initial value of the rating (uncontrolled)." },
  { name: "max", type: "number", defaultValue: "5", description: "Maximum number of rating items (stars, hearts, etc.)." },
  { name: "precision", type: "number", defaultValue: "1", description: "The minimum increment value allowed. Supports fractional ratings when used with allowHalf." },
  { name: "allowHalf", type: "boolean", defaultValue: "false", description: "If true, allows selecting half values (e.g., 2.5 stars)." },
  { name: "allowClear", type: "boolean", defaultValue: "true", description: "If true, clicking the same rating value again clears it." },
  { name: "readOnly", type: "boolean", defaultValue: "false", description: "If true, the rating is read-only and cannot be changed." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "If true, disables all interactions with the rating component." },
  { name: "variant", type: "'star' | 'heart' | 'emoji' | 'mood' | ... 30+ variants", defaultValue: "'star'", description: "Built-in icon variant. Choose from 30+ variants or provide custom icons." },
  { name: "icon", type: "ReactNode", defaultValue: "-", description: "Custom icon to display for filled rating items." },
  { name: "emptyIcon", type: "ReactNode", defaultValue: "-", description: "Custom icon to display for empty rating items." },
  { name: "size", type: "number", defaultValue: "28", description: "Size of the icons in pixels." },
  { name: "gap", type: "number", defaultValue: "4", description: "Gap between rating icons in pixels." },
  { name: "className", type: "string", defaultValue: "''", description: "Custom CSS classes to apply to the container." },
  { name: "style", type: "React.CSSProperties", defaultValue: "-", description: "Inline styles to apply to the container." },
  { name: "animation", type: "'scale' | 'pulse' | 'none'", defaultValue: "'scale'", description: "Animation to apply on hover." },
  { name: "highlightSelectedOnly", type: "boolean", defaultValue: "false", description: "If true, only highlights the selected star instead of all stars up to it." },
  { name: "showValue", type: "boolean", defaultValue: "false", description: "If true, displays the current rating value as text." },
  { name: "tooltipTexts", type: "string[]", defaultValue: "-", description: "Array of tooltip texts for each rating item." },
  { name: "getLabelText", type: "(value: number, max: number) => string", defaultValue: "(v, m) => `${v} of ${m}`", description: "Function to generate the tooltip/aria-label for each rating item." },
  { name: "onChange", type: "(event, value) => void", defaultValue: "-", description: "Callback fired when the value changes." },
  { name: "onHoverChange", type: "(event, value) => void", defaultValue: "-", description: "Callback fired when the hover value changes." },
  { name: "name", type: "string", defaultValue: "-", description: "The name attribute for form submission." },
  { name: "id", type: "string", defaultValue: "-", description: "The id attribute of the container element." },
  { name: "distribution", type: "number[]", defaultValue: "-", description: "Array of percentages for the distribution variant." },
];

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Rating Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Rating is a flexible feedback component that supports 30+ built-in variants, custom icons, precision control, and extensive styling options.
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

export function RatingPreview() {
  // Independent states for each demo
  const [basicRating1, setBasicRating1] = useState<number | null>(2);
  const [basicRating2, setBasicRating2] = useState<number | null>(3);
  const [basicRating3, setBasicRating3] = useState<number | null>(4);

  const [customIcon1, setCustomIcon1] = useState<number | null>(3);
  const [customIcon2, setCustomIcon2] = useState<number | null>(4);

  const [interactiveMood, setInteractiveMood] = useState<number | null>(3);
  const [interactiveFlag, setInteractiveFlag] = useState<number | null>(2);
  const [interactiveHourglass, setInteractiveHourglass] = useState<number | null>(3.5);

  const [animScale, setAnimScale] = useState<number | null>(3);
  const [animPulse, setAnimPulse] = useState<number | null>(2);
  const [animNone, setAnimNone] = useState<number | null>(4);

  const [hoverDemo, setHoverDemo] = useState<number | null>(3);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const [tooltip1, setTooltip1] = useState<number | null>(3);
  const [tooltip2, setTooltip2] = useState<number | null>(4);

  const [precision1, setPrecision1] = useState<number | null>(2.5);
  const [precision2, setPrecision2] = useState<number | null>(3);
  const [precision3, setPrecision3] = useState<number | null>(3.25);

  const [half1, setHalf1] = useState<number | null>(2.5);
  const [half2, setHalf2] = useState<number | null>(3);
  const [half3, setHalf3] = useState<number | null>(3.5);

  const [highlight1, setHighlight1] = useState<number | null>(2);
  const [highlight2, setHighlight2] = useState<number | null>(3);
  const [highlight3, setHighlight3] = useState<number | null>(4);

  const [emoji1, setEmoji1] = useState<number | null>(3);
  const [emoji2, setEmoji2] = useState<number | null>(2);

  const [clear1, setClear1] = useState<number | null>(3);

  const [labelText1, setLabelText1] = useState<number | null>(3);
  const [labelText2, setLabelText2] = useState<number | null>(4);

  const [formRating, setFormRating] = useState<number | null>(3);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <div className="flex flex-col gap-11 w-full">
      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbarOpen} 
        onClose={() => setSnackbarOpen(false)} 
        message={snackbarMessage}
        duration={2000}
      />

      {/* 1. Basic Rating Section */}
      <PreviewCard
        title="Basic Controlled Rating"
        description="Standard rating with default icons and full-star selection. Each rating below is independent."
        code={`import { Rating } from "andhera-react";

const [rating, setRating] = useState<number | null>(2);

<Rating 
  value={rating} 
  size={30} 
  onChange={(e, v) => setRating(v)} 
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">size=20</span>
            <Rating value={basicRating1} size={20} onChange={(e, v) => setBasicRating1(v)} showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">size=30</span>
            <Rating value={basicRating2} size={30} onChange={(e, v) => setBasicRating2(v)} showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">size=40</span>
            <Rating value={basicRating3} size={40} onChange={(e, v) => setBasicRating3(v)} showValue />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="All Variants Gallery"
        description="The Rating component supports 30+ built-in variants including star, heart, emoji, mood, thumbs, circle, pill, bar, blocks, battery, thermometer, diamond, triangle, signal, lightning, dot, hourglass, planet, leaf, eco, segments, coin, food, music, game, target, palette, beaker, flag, medal, and award."
        code={`import { Rating } from "andhera-react";

// Use the variant prop to switch icons
<Rating variant="star" />
<Rating variant="heart" />
<Rating variant="diamond" allowHalf />
<Rating variant="circle" />
<Rating variant="battery" />
<Rating variant="thermometer" />`}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {/* Row 1: Classic Icons */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">star</span>
            <Rating variant="star" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">heart</span>
            <Rating variant="heart" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">diamond</span>
            <Rating variant="diamond" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">circle</span>
            <Rating variant="circle" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">triangle</span>
            <Rating variant="triangle" size={20} value={3} readOnly />
          </div>
          {/* Row 2: Emoji-based */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">emoji</span>
            <Rating variant="emoji" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">mood</span>
            <Rating variant="mood" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">thumbs</span>
            <Rating variant="thumbs" size={20} value={2} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">flag</span>
            <Rating variant="flag" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">hourglass</span>
            <Rating variant="hourglass" size={20} value={3} readOnly />
          </div>
          {/* Row 3: Progress-style */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">pill</span>
            <Rating variant="pill" size={14} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">bar</span>
            <Rating variant="bar" size={16} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">segments</span>
            <Rating variant="segments" size={16} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">battery</span>
            <Rating variant="battery" size={18} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">thermometer</span>
            <Rating variant="thermometer" size={20} value={3} readOnly />
          </div>
          {/* Row 4: Misc Icons */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">blocks</span>
            <Rating variant="blocks" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">signal</span>
            <Rating variant="signal" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">lightning</span>
            <Rating variant="lightning" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">dot</span>
            <Rating variant="dot" size={14} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">planet</span>
            <Rating variant="planet" size={20} value={3} readOnly />
          </div>
          {/* Row 5: Nature & Fun */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">leaf</span>
            <Rating variant="leaf" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">eco</span>
            <Rating variant="eco" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">palette</span>
            <Rating variant="palette" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">beaker</span>
            <Rating variant="beaker" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">coin</span>
            <Rating variant="coin" size={20} value={3} readOnly />
          </div>
          {/* Row 6: Entertainment */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">game</span>
            <Rating variant="game" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">music</span>
            <Rating variant="music" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">food</span>
            <Rating variant="food" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">target</span>
            <Rating variant="target" size={20} value={3} readOnly />
          </div>
          {/* Row 7: Awards */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">medal</span>
            <Rating variant="medal" size={20} value={3} readOnly />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">award</span>
            <Rating variant="award" size={20} value={3} readOnly />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom Icons"
        description="Allows using any custom icon for filled and empty states. Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating
  value={value}
  icon={<span className="text-3xl">❤️</span>}
  emptyIcon={<span className="text-gray-400 text-3xl">🤍</span>}
  onChange={(e, v) => setValue(v)}
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Purple Hearts</span>
            <Rating
              value={customIcon1}
              onChange={(e, v) => setCustomIcon1(v)}
              icon={<span className="text-3xl">💜</span>}
              emptyIcon={<span className="text-gray-400 text-3xl">🤍</span>}
              showValue
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Red Hearts</span>
            <Rating
              value={customIcon2}
              onChange={(e, v) => setCustomIcon2(v)}
              icon={<span className="text-3xl">❤️</span>}
              emptyIcon={<span className="text-gray-400 text-3xl">🤍</span>}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Interactive Variants"
        description="Refined and fun variants with interactivity. Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating variant="mood" showValue />
<Rating variant="flag" />
<Rating variant="hourglass" allowHalf showValue />`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">mood</span>
            <Rating
              variant="mood"
              value={interactiveMood}
              size={24}
              onChange={(e, v) => setInteractiveMood(v)}
              showValue
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">flag</span>
            <Rating
              variant="flag"
              value={interactiveFlag}
              size={28}
              onChange={(e, v) => setInteractiveFlag(v)}
              showValue
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">hourglass (half)</span>
            <Rating
              variant="hourglass"
              value={interactiveHourglass}
              size={28}
              allowHalf
              onChange={(e, v) => setInteractiveHourglass(v)}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Animations"
        description="Compare animation options: scale (default), pulse, and none. Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating animation="scale" />  // Scales up on hover
<Rating animation="pulse" />  // Pulses on hover
<Rating animation="none" />   // No animation`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">scale (hover me)</span>
            <Rating
              animation="scale"
              value={animScale}
              onChange={(e, v) => setAnimScale(v)}
              showValue
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">pulse (hover me)</span>
            <Rating
              animation="pulse"
              value={animPulse}
              onChange={(e, v) => setAnimPulse(v)}
              showValue
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">none</span>
            <Rating
              animation="none"
              value={animNone}
              onChange={(e, v) => setAnimNone(v)}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Hover Change Callback"
        description="Use onHoverChange to track hover state for showing preview values or custom UI feedback."
        code={`import { Rating, Snackbar } from "andhera-react";

const [hoverValue, setHoverValue] = useState<number | null>(null);

<Rating
  value={value}
  onHoverChange={(e, v) => setHoverValue(v)}
  onChange={(e, v) => {
    setValue(v);
    // Show feedback using Snackbar
  }}
/>
<span>Hovering: {hoverValue ?? "none"}</span>`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <Rating
            value={hoverDemo}
            size={32}
            onHoverChange={(e, v) => setHoverValue(v)}
            onChange={(e, v) => {
              setHoverDemo(v);
              setSnackbarMessage(`Rating set to ${v}`);
              setSnackbarOpen(true);
            }}
          />
          <span className="text-sm text-white">
            Hovering: <strong className="text-yellow-400">{hoverValue !== null ? hoverValue : "none"}</strong>
          </span>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Tooltips"
        description="Provide per-item hover labels using the tooltipTexts prop (native title). Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating
  value={value}
  tooltipTexts={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
  onChange={(e, v) => setValue(v)}
  showValue
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Hover to see tooltips</span>
            <Rating
              value={tooltip1}
              size={28}
              tooltipTexts={["Terrible","Bad","Okay","Good","Excellent"]}
              onChange={(e, v) => setTooltip1(v)}
              showValue
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Different labels</span>
            <Rating
              value={tooltip2}
              size={28}
              tooltipTexts={["Very Bad","Bad","Meh","Nice","Amazing"]}
              onChange={(e, v) => setTooltip2(v)}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Precision Rating"
        description="The precision prop controls the step increment for rating values. Use allowHalf for 0.5 steps, or set precision to smaller values like 0.25 for finer control. Each rating is independent."
        code={`import { Rating } from "andhera-react";

// precision=0.5 with allowHalf - allows 0.5, 1, 1.5, 2...
<Rating value={2.5} precision={0.5} allowHalf showValue />

// precision=1 (default) - whole numbers only: 1, 2, 3...
<Rating value={3} precision={1} showValue />

// precision=0.25 with allowHalf - allows 0.25, 0.5, 0.75, 1...
<Rating value={3.25} precision={0.25} allowHalf showValue />`}
      >
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">precision=0.5 + allowHalf (try clicking left/right side of star)</span>
            <Rating 
              value={precision1} 
              size={32} 
              precision={0.5} 
              allowHalf 
              onChange={(e, v) => setPrecision1(v)} 
              showValue 
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">precision=1 (whole numbers only)</span>
            <Rating 
              value={precision2} 
              size={32} 
              precision={1} 
              onChange={(e, v) => setPrecision2(v)} 
              showValue 
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">precision=0.25 + allowHalf (finer control)</span>
            <Rating 
              value={precision3} 
              size={32} 
              precision={0.25} 
              allowHalf 
              onChange={(e, v) => setPrecision3(v)} 
              showValue 
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Select Half"
        description="Enables selecting half values using allowHalf prop. Click on the left half of a star to select half. Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating
  value={2.5}
  max={5}
  allowHalf
  showValue
  getLabelText={(v, max) => \`\${v} / \${max} stars\`}
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Rating 1</span>
            <Rating
              value={half1}
              max={5}
              allowHalf
              showValue
              onChange={(e, v) => setHalf1(v)}
              getLabelText={(v, max) => `${v} / ${max} stars`}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Rating 2</span>
            <Rating
              value={half2}
              max={5}
              allowHalf
              showValue
              onChange={(e, v) => setHalf2(v)}
              getLabelText={(v, max) => `${v} / ${max} stars`}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Rating 3</span>
            <Rating
              value={half3}
              max={5}
              allowHalf
              showValue
              onChange={(e, v) => setHalf3(v)}
              getLabelText={(v, max) => `${v} / ${max} stars`}
            />
          </div>
        </div>
      </PreviewCard>
      
      <PreviewCard
        title="Highlight Selected Only"
        description="Highlights only the selected star instead of all stars up to that point. Compare with the default behavior on the left."
        code={`import { Rating } from "andhera-react";

// Default: fills all stars up to selected value
<Rating value={3} onChange={(e, v) => setValue(v)} />

// highlightSelectedOnly: only the selected star is filled
<Rating value={3} highlightSelectedOnly onChange={(e, v) => setValue(v)} />`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-white font-semibold">Default Behavior</span>
              <span className="text-xs text-gray-400">All stars up to selection are filled</span>
              <Rating value={highlight1} size={30} onChange={(e, v) => setHighlight1(v)} showValue />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-white font-semibold">highlightSelectedOnly</span>
              <span className="text-xs text-gray-400">Only the selected star is filled</span>
              <Rating value={highlight2} size={30} highlightSelectedOnly onChange={(e, v) => setHighlight2(v)} showValue />
            </div>
          </div>
          <div className="text-center text-xs text-gray-400">
            Click different stars to see the difference in behavior
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Read Only"
        description="Makes the rating non-interactive, for display purposes only."
        code={`import { Rating } from "andhera-react";

<Rating value={3.5} readOnly allowHalf showValue />`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">3.5 stars</span>
            <Rating value={3.5} size={24} readOnly allowHalf showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">4 stars</span>
            <Rating value={4} size={28} readOnly showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">2.5 stars</span>
            <Rating value={2.5} size={32} readOnly allowHalf showValue />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Disabled"
        description="Disables all interactions and shows reduced opacity."
        code={`import { Rating } from "andhera-react";

<Rating value={4} disabled />`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">disabled</span>
            <Rating size={24} value={3} disabled showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">disabled</span>
            <Rating size={28} value={4} disabled showValue />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">disabled</span>
            <Rating size={32} value={5} disabled showValue />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom Max Count"
        description="Change the maximum number of rating items."
        code={`import { Rating } from "andhera-react";

<Rating max={3} value={2} />
<Rating max={7} value={5} />
<Rating max={10} value={7} size={18} />`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">max=3</span>
            <Rating max={3} value={2} readOnly showValue />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">max=7</span>
            <Rating max={7} value={5} readOnly showValue />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">max=10</span>
            <Rating max={10} value={7} size={18} readOnly showValue />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom GetLabel Text"
        description="Customizes the tooltip text shown on hover for each star. This is used for accessibility (aria-label) and native browser tooltips. Hover over each star to see the custom label."
        code={`import { Rating } from "andhera-react";

// Default: "1 of 5", "2 of 5", etc.
// Custom: "1 / 5 stars", "2 / 5 stars", etc.
<Rating
  value={value}
  max={5}
  showValue
  getLabelText={(v, max) => \`Rating \${v} out of \${max} stars\`}
  onChange={(e, v) => setValue(v)}
/>`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-white font-semibold">Default Label</span>
              <span className="text-xs text-gray-400">Hover: "1 of 5", "2 of 5"...</span>
              <Rating
                value={labelText1}
                max={5}
                showValue
                onChange={(e, v) => setLabelText1(v)}
              />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs text-white font-semibold">Custom Label</span>
              <span className="text-xs text-gray-400">Hover: "Rating 1/5 ⭐"...</span>
              <Rating
                value={labelText2}
                max={5}
                showValue
                getLabelText={(v, max) => `Rating ${v}/${max} ⭐`}
                onChange={(e, v) => setLabelText2(v)}
              />
            </div>
          </div>
          <div className="text-center text-xs text-gray-400">
            Hover over any star to see the tooltip with the custom label text
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom Emoji"
        description="Supports replacing stars with emoji icons. Each rating is independent."
        code={`import { Rating } from "andhera-react";

<Rating
  max={5}
  icon={<span className="text-3xl">😄</span>}
  emptyIcon={<span className="text-gray-300 text-3xl">😐</span>}
  value={value}
  onChange={(e, v) => setValue(v)}
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Happy/Neutral</span>
            <Rating
              max={5}
              icon={<span className="text-3xl">😄</span>}
              emptyIcon={<span className="text-gray-300 text-3xl">😐</span>}
              value={emoji1}
              onChange={(e, v) => setEmoji1(v)}
              showValue
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white">Thumbs Up/Down</span>
            <Rating
              max={5}
              icon={<span className="text-3xl">👍</span>}
              emptyIcon={<span className="text-gray-300 text-3xl">👎</span>}
              value={emoji2}
              onChange={(e, v) => setEmoji2(v)}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Clear Rating"
        description="Click the same rating again to clear it using the allowClear prop."
        code={`import { Rating } from "andhera-react";

<Rating value={value} allowClear onChange={(e, v) => setValue(v)} showValue />`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-xs text-white">Click the same star again to clear the rating</span>
          <Rating
            value={clear1}
            onChange={(e, v) => setClear1(v)}
            allowClear
            showValue
            size={28}
          />
        </div>
      </PreviewCard>

      <PreviewCard
        title="Distribution Layout"
        description="Special variant for showing rating distribution (e.g., for product reviews breakdown)."
        code={`import { Rating } from "andhera-react";

<Rating
  variant="distribution"
  distribution={[10, 25, 50, 80, 100]}
/>`}
      >
        <div className="flex flex-col items-center justify-center">
          <Rating
            variant="distribution"
            distribution={[10, 25, 50, 80, 100]}
          />
        </div>
      </PreviewCard>

      <PreviewCard
        title="Sizes"
        description="Control the icon size using the size prop."
        code={`import { Rating } from "andhera-react";

<Rating size={16} value={3} />
<Rating size={24} value={3} />
<Rating size={32} value={3} />
<Rating size={48} value={3} />`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">16px</span>
            <Rating size={16} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">24px</span>
            <Rating size={24} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">32px</span>
            <Rating size={32} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-16">48px</span>
            <Rating size={48} value={3} readOnly />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom Gap Between Stars"
        description="Control the spacing between stars using the gap prop (in pixels)."
        code={`import { Rating } from "andhera-react";

<Rating gap={0} value={3} />   // No gap
<Rating gap={4} value={3} />   // Default (4px)
<Rating gap={8} value={3} />   // 8px gap
<Rating gap={16} value={3} />  // 16px gap`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-20">gap=0</span>
            <Rating gap={0} size={24} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-20">gap=4 (default)</span>
            <Rating gap={4} size={24} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-20">gap=8</span>
            <Rating gap={8} size={24} value={3} readOnly />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white w-20">gap=16</span>
            <Rating gap={16} size={24} value={3} readOnly />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Custom Styling with className"
        description="Apply custom CSS classes or inline styles to the wrapper element using the className prop."
        code={`import { Rating } from "andhera-react";

<Rating 
  value={3} 
  className="bg-gray-100 p-4 rounded-lg" 
/>

// Or use inline styles for custom backgrounds
<Rating 
  value={4} 
  style={{ background: '#fef9c3', padding: '8px', borderRadius: '9999px' }}
/>`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white">Dark background wrapper</span>
            <Rating 
              value={3} 
              readOnly
              showValue
              style={{ background: '#374151', padding: '16px', borderRadius: '8px' }}
            />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white">Yellow rounded wrapper with border</span>
            <Rating 
              value={4} 
              readOnly
              showValue
              style={{ 
                background: '#fef9c3', 
                padding: '8px 16px', 
                borderRadius: '9999px',
                border: '2px solid #fde047'
              }}
            />
          </div>
        </div>
      </PreviewCard>

      <PreviewCard
        title="Form Integration"
        description="Use name and id props for form integration and accessibility."
        code={`import { Rating } from "andhera-react";

<form>
  <Rating 
    name="product-rating" 
    id="product-rating-input"
    value={value}
    onChange={(e, v) => setValue(v)}
  />
</form>`}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="bg-gray-800 p-4 rounded-lg">
            <label className="text-sm text-white block mb-2">Rate this product:</label>
            <Rating 
              name="product-rating" 
              id="product-rating-input"
              value={formRating}
              onChange={(e, v) => setFormRating(v)}
              showValue
            />
          </div>
        </div>
      </PreviewCard>

      {/* Props Reference Table */}
      <PropsReference />
    </div>
  )
}
