import { useState, useRef } from "react";
import { Clipboard } from "../../../src/components/clipboard/clipboard";
import { PreviewCard } from "../components/PreviewCard";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "textToCopy", type: "string", defaultValue: "-", description: "The text content that will be copied to the clipboard when triggered." },
  { name: "variant", type: "'icon' | 'iconOnly' | 'withText' | 'textOnly' | 'input' | 'inline' | 'toolbar' | 'floating'", defaultValue: "'icon'", description: "Visual variant style of the clipboard button." },
  { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", defaultValue: "'md'", description: "Size preset affecting padding, font size, and icon dimensions." },
  { name: "tone", type: "'solid' | 'soft' | 'outline' | 'ghost'", defaultValue: "'solid'", description: "Background and border tone style for the button." },
  { name: "colorScheme", type: "'neutral' | 'primary' | 'success' | 'danger' | 'gold'", defaultValue: "'neutral'", description: "Color scheme applied to the button styling." },
  { name: "copyText", type: "string", defaultValue: "'Copy'", description: "Label text shown in default (ready to copy) state." },
  { name: "copiedText", type: "string", defaultValue: "'Copied!'", description: "Label text shown after successful copy." },
  { name: "loadingText", type: "string", defaultValue: "'Copying...'", description: "Label text shown during copy operation." },
  { name: "errorText", type: "string", defaultValue: "'Failed'", description: "Label text shown when copy fails." },
  { name: "icon", type: "ReactNode", defaultValue: "-", description: "Custom icon for the default state." },
  { name: "successIcon", type: "ReactNode", defaultValue: "-", description: "Custom icon shown after successful copy." },
  { name: "noSuccessIcon", type: "boolean", defaultValue: "false", description: "Hides the success icon after copying." },
  { name: "successIconColor", type: "string", defaultValue: "-", description: "Custom color for the success icon." },
  { name: "isCopied", type: "boolean", defaultValue: "-", description: "Controlled copied state for external state management." },
  { name: "onCopiedChange", type: "(copied: boolean) => void", defaultValue: "-", description: "Callback when copied state changes (for controlled mode)." },
  { name: "isLoading", type: "boolean", defaultValue: "false", description: "Shows loading state with optional loading text." },
  { name: "isError", type: "boolean", defaultValue: "false", description: "Shows error state styling and text." },
  { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables the button and prevents interaction." },
  { name: "resetDuration", type: "number", defaultValue: "2000", description: "Milliseconds before resetting from copied to default state." },
  { name: "onCopy", type: "() => void", defaultValue: "-", description: "Callback triggered when copy is initiated." },
  { name: "onCopyStart", type: "() => void", defaultValue: "-", description: "Callback triggered at the start of copy operation." },
  { name: "onCopySuccess", type: "() => void", defaultValue: "-", description: "Callback triggered after successful copy." },
  { name: "onCopyError", type: "(error: string) => void", defaultValue: "-", description: "Callback triggered when copy fails with error message." },
  { name: "onReset", type: "() => void", defaultValue: "-", description: "Callback triggered when state resets to default." },
  { name: "borderRadius", type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'", defaultValue: "'md'", description: "Border radius preset for button corners." },
  { name: "shadow", type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", defaultValue: "'none'", description: "Box shadow depth for the button." },
  { name: "bordered", type: "boolean", defaultValue: "true", description: "Whether to show a border on the button." },
  { name: "tooltip", type: "string", defaultValue: "-", description: "Tooltip text shown on hover." },
  { name: "tooltipPosition", type: "'top' | 'bottom' | 'left' | 'right'", defaultValue: "'top'", description: "Position of the tooltip relative to button." },
  { name: "showTooltip", type: "boolean", defaultValue: "true", description: "Whether to display the tooltip." },
  { name: "inputRef", type: "RefObject<HTMLInputElement>", defaultValue: "-", description: "Ref to an input element for 'input' variant." },
  { name: "inputValue", type: "string", defaultValue: "-", description: "Display value for 'input' variant field." },
  { name: "inputPlaceholder", type: "string", defaultValue: "-", description: "Placeholder text for 'input' variant." },
  { name: "inputClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for input element." },
  { name: "ariaLabelCopy", type: "string", defaultValue: "'Copy to clipboard'", description: "ARIA label for default state (accessibility)." },
  { name: "ariaLabelCopied", type: "string", defaultValue: "'Copied to clipboard'", description: "ARIA label for copied state (accessibility)." },
  { name: "announceCopied", type: "boolean", defaultValue: "false", description: "Announces copied state to screen readers via live region." },
  { name: "fullWidth", type: "boolean", defaultValue: "false", description: "Makes the button take full container width." },
  { name: "className", type: "string", defaultValue: "''", description: "Additional CSS classes for custom styling." },
  { name: "style", type: "CSSProperties", defaultValue: "{}", description: "Inline styles for the component." },
];

/**
 * ClipboardPreview Component
 * Comprehensive showcase of all clipboard variants, sizes, tones, and features
 */
export function ClipboardPreview() {
  const [demoText] = useState("Hello, AnderaUI!");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-11 w-full">
      {/* 1. Basic Icon Variants */}
      <PreviewCard
        title="Basic Icon Variants"
        description="Simple icon-based clipboard buttons with background. The default variant for quick copy actions."
        code={`<Clipboard 
  textToCopy="Hello, World!" 
  variant="icon" 
  size="xs" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Hello, World!" 
  variant="icon" 
  size="sm" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Hello, World!" 
  variant="icon" 
  size="md" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Hello, World!" 
  variant="icon" 
  size="lg" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Hello, World!" 
  variant="icon" 
  size="xl" 
  colorScheme="gold"
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <Clipboard 
            textToCopy="Hello, World!" 
            variant="icon" 
            size="xs" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Hello, World!" 
            variant="icon" 
            size="sm" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Hello, World!" 
            variant="icon" 
            size="md" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Hello, World!" 
            variant="icon" 
            size="lg" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Hello, World!" 
            variant="icon" 
            size="xl" 
            colorScheme="gold"
          />
        </div>
      </PreviewCard>

      {/* 2. Icon Only (Square) */}
      <PreviewCard
        title="Icon Only (Square)"
        description="Compact square icon buttons without background padding. Perfect for tight spaces and toolbars."
        code={`<Clipboard 
  textToCopy="Compact!" 
  variant="iconOnly" 
  size="xs"
  colorScheme="gold" 
/>
<Clipboard 
  textToCopy="Compact!" 
  variant="iconOnly" 
  size="md" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Compact!" 
  variant="iconOnly" 
  size="lg" 
  colorScheme="gold"
/>
<Clipboard 
  textToCopy="Compact!" 
  variant="iconOnly" 
  size="xl" 
  colorScheme="gold"
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <Clipboard 
            textToCopy="Compact!" 
            variant="iconOnly" 
            size="xs"
            colorScheme="gold" 
            
          />
          {/* <Clipboard variant="icon" noSuccessIcon successIconColor="text-emerald-400" /> */}

          <Clipboard 
            textToCopy="Compact!" 
            variant="iconOnly" 
            size="md" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Compact!" 
            variant="iconOnly" 
            size="lg" 
            colorScheme="gold"
          />
          <Clipboard 
            textToCopy="Compact!" 
            variant="iconOnly" 
            size="xl" 
            colorScheme="gold"
          />
        </div>
      </PreviewCard>

      {/* 3. With Text Labels */}
      <PreviewCard
        title="With Text Labels"
        description="Clipboard buttons with descriptive text labels. Great for clarity and user guidance."
        code={`<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="withText" 
  size="sm"
  copyText="Copy"
  copiedText="Copied!"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="withText" 
  size="md"
  copyText="Copy to Clipboard"
  copiedText="Copied Successfully!"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="withText" 
  size="lg"
  copyText="Copy Link"
  copiedText="Link Copied!"
/>`}
      >
        <div className="flex flex-col gap-6 items-start p-4">
          <Clipboard 
            textToCopy={demoText} 
            variant="withText" 
            size="sm"
            copyText="Copy"
            copiedText="Copied!"
          />
          <Clipboard 
            textToCopy={demoText} 
            variant="withText" 
            size="md"
            copyText="Copy to Clipboard"
            copiedText="Copied Successfully!"
          />
          <Clipboard 
            textToCopy={demoText} 
            variant="withText" 
            size="lg"
            copyText="Copy Link"
            copiedText="Link Copied!"
          />
        </div>
      </PreviewCard>

      {/* 4. Text Only (Minimal) */}
      <PreviewCard
        title="Text Only"
        description="Minimal text-only clipboard links. Ideal for inline copy actions without visual clutter."
        code={`<div className="text-zinc-300 text-sm">
  Click to copy: 
  <Clipboard 
    textToCopy="important-data-123" 
    variant="textOnly" 
    size="sm"
    copyText="important-data-123"
    copiedText="✓ Copied"
  />
</div>
<div className="text-zinc-300">
  Share this: 
  <Clipboard 
    textToCopy="https://andhera-ui.com/share/abc123" 
    variant="textOnly" 
    size="md"
    copyText="https://andhera-ui.com/share/abc123"
    copiedText="✓ Link copied!"
  />
</div>`}
      >
        <div className="flex flex-col gap-4 items-start p-4">
          <div className="text-zinc-300 text-sm">
            Click to copy: <Clipboard 
              textToCopy="important-data-123" 
              variant="textOnly" 
              size="sm"
              copyText="important-data-123"
              copiedText="✓ Copied"
            />
          </div>
          <div className="text-zinc-300">
            Share this: <Clipboard 
              textToCopy="https://andhera-ui.com/share/abc123" 
              variant="textOnly" 
              size="md"
              copyText="https://andhera-ui.com/share/abc123"
              copiedText="✓ Link copied!"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 5. Input Variant */}
      <PreviewCard
        title="Input with Copy Button"
        description="Input-style container with integrated copy button. Perfect for API keys, URLs, and shareable content."
        code={`<Clipboard 
  textToCopy="npm install andhera-react" 
  variant="input" 
  size="sm"
  copyText="npm install andhera-react"
/>
<Clipboard 
  textToCopy="https://andhera-ui.com/docs/clipboard" 
  variant="input" 
  size="md"
  copyText="https://andhera-ui.com/docs/clipboard"
/>
<div className="flex flex-col gap-2">
  <label className="text-zinc-400 text-sm">API Key</label>
  <Clipboard 
    textToCopy="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K" 
    variant="input" 
    size="lg"
    copyText="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
  />
</div>`}
      >
        <div className="flex flex-col gap-6 w-full max-w-2xl p-4">
          <Clipboard 
            textToCopy="npm install andhera-react" 
            variant="input" 
            size="sm"
            copyText="npm install andhera-react"
          />
          <Clipboard 
            textToCopy="https://andhera-ui.com/docs/clipboard" 
            variant="input" 
            size="md"
            copyText="https://andhera-ui.com/docs/clipboard"
          />
          <div className="flex flex-col gap-2">
            <label className="text-zinc-400 text-sm">API Key</label>
            <Clipboard 
              textToCopy="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K" 
              variant="input" 
              size="lg"
              copyText="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 6. Inline Variant */}
      <PreviewCard
        title="Inline Ghost Links"
        description="Inline, underlined clipboard links that blend seamlessly with text content."
        code={`<p>
  Your API endpoint is{" "}
  <Clipboard 
    textToCopy="https://api.andhera.com/v1" 
    variant="inline"
    copyText="https://api.andhera.com/v1"
    copiedText="✓ Copied!"
  />
</p>
<p>
  Transaction ID:{" "}
  <Clipboard 
    textToCopy="TXN-20241208-ABC123XYZ" 
    variant="inline"
    copyText="TXN-20241208-ABC123XYZ"
    copiedText="✓ Copied"
    size="sm"
  />
</p>`}
      >
        <div className="flex flex-col gap-4 p-4 text-zinc-300">
          <p>
            Your API endpoint is{" "}
            <Clipboard 
              textToCopy="https://api.andhera.com/v1" 
              variant="inline"
              copyText="https://api.andhera.com/v1"
              copiedText="✓ Copied!"
            />
          </p>
          <p>
            Transaction ID:{" "}
            <Clipboard 
              textToCopy="TXN-20241208-ABC123XYZ" 
              variant="inline"
              copyText="TXN-20241208-ABC123XYZ"
              copiedText="✓ Copied"
              size="sm"
            />
          </p>
        </div>
      </PreviewCard>

      {/* 7. Toolbar Variant */}
      <PreviewCard
        title="Toolbar Buttons"
        description="Small, consistent buttons designed for toolbars and compact UI areas."
        code={`<div className="flex gap-2 bg-zinc-900/50 p-2 rounded-lg border border-zinc-700">
  <Clipboard 
    textToCopy="const example = 'code';" 
    variant="toolbar"
  />
  <button className="h-8 w-8 p-1.5 rounded-md text-zinc-400 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
    {/* Edit Icon */}
  </button>
  <button className="h-8 w-8 p-1.5 rounded-md text-zinc-400 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
    {/* Delete Icon */}
  </button>
</div>`}
      >
        <div className="flex gap-3 p-4">
          <div className="flex gap-2 bg-zinc-900/50 p-2 rounded-lg border border-zinc-700">
            <Clipboard 
              textToCopy="const example = 'code';" 
              variant="toolbar"
            />
            <button className="h-8 w-8 p-1.5 rounded-md text-zinc-400 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="h-8 w-8 p-1.5 rounded-md text-zinc-400 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 transition-colors">
              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </PreviewCard>

      {/* 8. Floating FAB */}
      <PreviewCard
        title="Floating Action Button"
        description="Circular floating action button style. Great for prominent copy actions."
        code={`<Clipboard 
  textToCopy="Share this content!" 
  variant="floating"
  copyIconVariant="stack-rect"
/>
<Clipboard 
  textToCopy="Copy important data" 
  variant="floating"
/>`}
      >
        <div className="flex gap-6 items-center justify-center p-8">
          <Clipboard 
            textToCopy="Share this content!" 
            variant="floating"
            copyIconVariant="stack-rect"
          />
          <Clipboard 
            textToCopy="Copy important data" 
            variant="floating"
          />
        </div>
      </PreviewCard>

      {/* 9. Tone Variants */}
      <PreviewCard
        title="Tone Variants"
        description="Different visual tones: solid (filled background), soft (subtle background), outline (transparent with border), and ghost (transparent, no border)."
        code={`// Solid - Filled background with border
<Clipboard textToCopy="Text" variant="icon" tone="solid" colorScheme="primary" />

// Soft - Subtle semi-transparent background
<Clipboard textToCopy="Text" variant="icon" tone="soft" colorScheme="primary" />

// Outline - Transparent background with visible border
<Clipboard textToCopy="Text" variant="icon" tone="outline" colorScheme="primary" />

// Ghost - Fully transparent, border only on hover
<Clipboard textToCopy="Text" variant="icon" tone="ghost" colorScheme="primary" />`}
      >
        <div className="flex flex-col gap-8 p-4">
          {/* Primary color scheme */}
          <div>
            <p className="text-xs text-zinc-500 mb-3">Primary Color Scheme</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="solid"
                  colorScheme="primary"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Solid</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="soft"
                  colorScheme="primary"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Soft</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="outline"
                  colorScheme="primary"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Outline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="ghost"
                  colorScheme="primary"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Ghost</span>
              </div>
            </div>
          </div>
          
          {/* Gold color scheme */}
          <div>
            <p className="text-xs text-zinc-500 mb-3">Gold Color Scheme</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="solid"
                  colorScheme="gold"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Solid</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="soft"
                  colorScheme="gold"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Soft</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="outline"
                  colorScheme="gold"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Outline</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon" 
                  tone="ghost"
                  colorScheme="gold"
                  size="lg"
                />
                <span className="text-xs text-zinc-400">Ghost</span>
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 10. Color Schemes */}
      <PreviewCard
        title="Color Schemes"
        description="Different color schemes: neutral, primary, success, and danger."
        code={`<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  colorScheme="neutral"
  size="md"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  colorScheme="primary"
  size="md"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  colorScheme="success"
  size="md"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  colorScheme="danger"
  size="md"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  colorScheme="gold"
  size="md"
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              colorScheme="neutral"
              size="md"
            />
            <span className="text-xs text-zinc-400">Neutral</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              colorScheme="primary"
              size="md"
            />
            <span className="text-xs text-zinc-400">Primary</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              colorScheme="success"
              size="md"
            />
            <span className="text-xs text-zinc-400">Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              colorScheme="danger"
              size="md"
            />
            <span className="text-xs text-zinc-400">Danger</span>
          </div>
           <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              colorScheme="gold"
              size="md"
            />
            <span className="text-xs text-zinc-400">Gold</span>
          </div>
        </div>
      </PreviewCard>

      {/* 11. Border Radius Options */}
      <PreviewCard
        title="Border Radius"
        description="Customize corner roundness from sharp to fully circular."
        code={`<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="none" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="sm" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="md" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="lg" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="xl" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" rounded="full" size="md" />`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="none" size="md" />
            <span className="text-xs text-zinc-400">None</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="sm" size="md" />
            <span className="text-xs text-zinc-400">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="md" size="md" />
            <span className="text-xs text-zinc-400">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="lg" size="md" />
            <span className="text-xs text-zinc-400">Large</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="xl" size="md" />
            <span className="text-xs text-zinc-400">XL</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" rounded="full" size="md" />
            <span className="text-xs text-zinc-400">Full</span>
          </div>
        </div>
      </PreviewCard>

      {/* 12. Shadow Options */}
      <PreviewCard
        title="Shadow Options"
        description="Add depth with subtle to prominent shadows."
        code={`<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" shadow="none" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" shadow="sm" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" shadow="md" size="md" />
<Clipboard textToCopy="Hello, AnderaUI!" variant="icon" shadow="lg" size="md" />`}
      >
        <div className="flex flex-wrap gap-8 items-center justify-center p-8">
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" shadow="none" size="md" />
            <span className="text-xs text-zinc-400">None</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" shadow="sm" size="md" />
            <span className="text-xs text-zinc-400">Small</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" shadow="md" size="md" />
            <span className="text-xs text-zinc-400">Medium</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard textToCopy={demoText} variant="icon" shadow="lg" size="md" />
            <span className="text-xs text-zinc-400">Large</span>
          </div>
        </div>
      </PreviewCard>

      {/* 13. Copy Icon Variants */}
      <PreviewCard
        title="Copy Icon Variants"
        description="Choose between two built-in icon styles: outline-rect (classic) or stack-rect (modern)."
        code={`<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  copyIconVariant="outline-rect"
  size="lg"
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  copyIconVariant="stack-rect"
  size="lg"
/>`}
      >
        <div className="flex flex-wrap gap-8 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              copyIconVariant="outline-rect"
              size="lg"
            />
            <span className="text-sm text-zinc-400">Outline Rectangle</span>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon" 
              copyIconVariant="stack-rect"
              size="lg"
            />
            <span className="text-sm text-zinc-400">Stack Rectangle</span>
          </div>
        </div>
      </PreviewCard>

      {/* 14. With Custom Text */}
      <PreviewCard
        title="Custom State Text"
        description="Customize text for copy, copied, loading, and error states."
        code={`<Clipboard 
  textToCopy="API_KEY_12345" 
  variant="withText"
  size="md"
  copyText="Copy API Key"
  copiedText="API Key Copied!"
  loadingText="Securing..."
/>
<Clipboard 
  textToCopy="https://share.app/xyz" 
  variant="withText"
  size="md"
  copyText="Share Link"
  copiedText="Link Copied to Clipboard!"
/>`}
      >
        <div className="flex flex-col gap-4 items-start p-4">
          <Clipboard 
            textToCopy="API_KEY_12345" 
            variant="withText"
            size="md"
            copyText="Copy API Key"
            copiedText="API Key Copied!"
            loadingText="Securing..."
          />
          <Clipboard 
            textToCopy="https://share.app/xyz" 
            variant="withText"
            size="md"
            copyText="Share Link"
            copiedText="Link Copied to Clipboard!"
          />
        </div>
      </PreviewCard>

      {/* 15. Copy from Target Element */}
      <PreviewCard
        title="Copy from Target Element"
        description="Copy content from another DOM element using CSS selector or ref."
        code={`<div className="flex gap-3 items-center">
  <input
    ref={inputRef}
    defaultValue="Copy this input value"
    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
  />
  <Clipboard 
    copyRef={inputRef}
    variant="icon"
    size="md"
  />
</div>
<div className="flex gap-3 items-center">
  <div 
    id="demo-content"
    className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm"
  >
    Copy from CSS selector
  </div>
  <Clipboard 
    copyTarget="#demo-content"
    variant="icon"
    size="md"
  />
</div>`}
      >
        <div className="flex flex-col gap-6 p-4 w-full max-w-md">
          <div className="flex gap-3 items-center">
            <input
              ref={inputRef}
              defaultValue="Copy this input value"
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
            <Clipboard 
              copyRef={inputRef}
              variant="icon"
              size="md"
            />
          </div>
          <div className="flex gap-3 items-center">
            <div 
              id="demo-content"
              className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-md text-zinc-100 text-sm"
            >
              Copy from CSS selector
            </div>
            <Clipboard 
              copyTarget="#demo-content"
              variant="icon"
              size="md"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 16. Disabled State */}
      <PreviewCard
        title="Disabled State"
        description="Disabled clipboard buttons prevent interaction and show reduced opacity."
        code={`<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="icon" 
  size="md"
  disabled
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="iconOnly" 
  size="md"
  disabled
/>
<Clipboard 
  textToCopy="Hello, AnderaUI!" 
  variant="withText" 
  size="md"
  copyText="Copy"
  disabled
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <Clipboard 
            textToCopy={demoText} 
            variant="icon" 
            size="md"
            disabled
          />
          <Clipboard 
            textToCopy={demoText} 
            variant="iconOnly" 
            size="md"
            disabled
          />
          <Clipboard 
            textToCopy={demoText} 
            variant="withText" 
            size="md"
            copyText="Copy"
            disabled
          />
        </div>
      </PreviewCard>

      {/* 17. Real-World Examples */}
      <PreviewCard
        title="Real-World Examples"
        description="Practical use cases showing clipboard in action."
        code={`// Code block with copy
<div className="code-block">
  <pre><code>{codeSnippet}</code></pre>
  <Clipboard 
    textToCopy={codeSnippet}
    variant="toolbar"
    className="absolute top-2 right-2"
  />
</div>

// Share dialog
<div className="share-dialog">
  <h3>Share this page</h3>
  <Clipboard 
    textToCopy={shareUrl}
    variant="input"
    copyText={shareUrl}
  />
</div>`}
      >
        <div className="flex flex-col gap-8 w-full max-w-2xl p-4">
          {/* Code Block Example */}
          <div className="relative">
            <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4">
              <div className="flex items-start justify-between gap-4">
                <pre className="text-sm text-zinc-300 font-mono overflow-x-auto flex-1">
                  <code>{`function greet(name) {\n  return \`Hello, \${name}!\`;\n}`}</code>
                </pre>
                <Clipboard 
                  textToCopy={`function greet(name) {\n  return \`Hello, \${name}!\`;\n}`}
                  variant="toolbar"
                />
              </div>
            </div>
            <span className="text-xs text-zinc-500 mt-2 block">Code snippet with copy button</span>
          </div>

          {/* Share Dialog Example */}
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6">
            <h4 className="text-zinc-100 font-semibold mb-4">Share this page</h4>
            <div className="space-y-3">
              <Clipboard 
                textToCopy="https://andhera-ui.com/docs/clipboard"
                variant="input"
                size="md"
                copyText="https://andhera-ui.com/docs/clipboard"
              />
              <p className="text-xs text-zinc-500">Copy link to share with others</p>
            </div>
          </div>

          {/* API Key Example */}
          <div className="bg-zinc-900/30 border border-zinc-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-zinc-100 font-semibold">API Credentials</h4>
              <span className="text-xs text-zinc-500">Production</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Secret Key</label>
                <Clipboard 
                  textToCopy="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
                  variant="input"
                  size="sm"
                  copyText="sk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Publishable Key</label>
                <Clipboard 
                  textToCopy="pk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
                  variant="input"
                  size="sm"
                  copyText="pk_live_51J3X2KLk5Kl5Kl5Kl5Kl5K"
                />
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 18. Responsive Behavior */}
      <PreviewCard
        title="Responsive Design"
        description="Clipboard components are fully responsive and adapt to different screen sizes."
        code={`<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <Clipboard 
    textToCopy="npm install andhera-react"
    variant="input"
    size="sm"
    copyText="npm install andhera-react"
  />
  <Clipboard 
    textToCopy="yarn add andhera-react"
    variant="input"
    size="sm"
    copyText="yarn add andhera-react"
  />
  <Clipboard 
    textToCopy="pnpm add andhera-react"
    variant="input"
    size="sm"
    copyText="pnpm add andhera-react"
  />
</div>`}
      >
        <div className="w-full p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Clipboard 
              textToCopy="npm install andhera-react"
              variant="input"
              size="sm"
              copyText="npm install andhera-react"
            />
            <Clipboard 
              textToCopy="yarn add andhera-react"
              variant="input"
              size="sm"
              copyText="yarn add andhera-react"
            />
            <Clipboard 
              textToCopy="pnpm add andhera-react"
              variant="input"
              size="sm"
              copyText="pnpm add andhera-react"
            />
          </div>
        </div>
      </PreviewCard>

      {/* 19. Custom Icons */}
      <PreviewCard
        title="Custom Icons"
        description="Override default icons for copy, copied, loading, and error states with your own React nodes."
        code={`<Clipboard 
  textToCopy="Custom icons!" 
  variant="icon"
  size="lg"
  copyIcon={
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  }
  copiedIcon={
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  }
  colorScheme="gold"
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Custom star icon!" 
              variant="icon"
              size="lg"
              copyIcon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-full h-full">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              }
              copiedIcon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-yellow-400">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              }
              colorScheme="gold"
            />
            <span className="text-xs text-zinc-400">Custom Star</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Custom heart icon!" 
              variant="icon"
              size="lg"
              copyIcon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-full h-full">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              copiedIcon={
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-400">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              }
              colorScheme="danger"
            />
            <span className="text-xs text-zinc-400">Custom Heart</span>
          </div>
        </div>
      </PreviewCard>

      {/* 20. No Success Icon Mode */}
      <PreviewCard
        title="No Success Icon Mode"
        description="Keep the same icon on success but change its color. Useful for subtle feedback."
        code={`<Clipboard 
  textToCopy="Hello!" 
  variant="icon"
  size="md"
  noSuccessIcon
  successIconColor="text-green-400"
/>
<Clipboard 
  textToCopy="Hello!" 
  variant="icon"
  size="md"
  noSuccessIcon
  successIconColor="text-yellow-400"
/>`}
      >
        <div className="flex flex-wrap gap-6 items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon"
              size="md"
              noSuccessIcon
              successIconColor="text-green-400"
            />
            <span className="text-xs text-zinc-400">Green on Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon"
              size="md"
              noSuccessIcon
              successIconColor="text-yellow-400"
            />
            <span className="text-xs text-zinc-400">Yellow on Success</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy={demoText} 
              variant="icon"
              size="md"
              noSuccessIcon
              successIconColor="text-blue-400"
            />
            <span className="text-xs text-zinc-400">Blue on Success</span>
          </div>
        </div>
      </PreviewCard>

      {/* 21. Controlled State */}
      <PreviewCard
        title="Controlled State"
        description="Control the copied, loading, and error states externally for complex integrations."
        code={`const [copied, setCopied] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

<Clipboard 
  textToCopy="Controlled!" 
  variant="withText"
  isCopied={copied}
  isLoading={loading}
  isError={error}
  onCopiedChange={setCopied}
/>`}
      >
        <ControlledClipboardDemo demoText={demoText} />
      </PreviewCard>

      {/* 22. Lifecycle Callbacks */}
      <PreviewCard
        title="Lifecycle Callbacks"
        description="Hook into copy lifecycle events: onCopyStart, onCopySuccess, onCopyError, and onReset."
        code={`<Clipboard 
  textToCopy="Hello!" 
  variant="withText"
  size="md"
  onCopyStart={() => console.log('Copy started')}
  onCopySuccess={() => console.log('Copy succeeded!')}
  onCopyError={(err) => console.error('Copy failed:', err)}
  onReset={() => console.log('State reset')}
/>`}
      >
        <CallbacksDemo demoText={demoText} />
      </PreviewCard>

      {/* 23. Reset Duration */}
      <PreviewCard
        title="Reset Duration"
        description="Customize how long the success/error state is shown before resetting."
        code={`<Clipboard 
  textToCopy="Quick reset" 
  variant="withText"
  resetDuration={500}
  copyText="500ms reset"
/>
<Clipboard 
  textToCopy="Standard reset" 
  variant="withText"
  resetDuration={2000}
  copyText="2000ms reset"
/>
<Clipboard 
  textToCopy="No auto reset" 
  variant="withText"
  disableTimeout
  copyText="No auto reset"
/>`}
      >
        <div className="flex flex-col sm:flex-row gap-4 items-start p-4">
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Quick reset" 
              variant="withText"
              resetDuration={500}
              copyText="500ms reset"
              copiedText="Done!"
            />
            <span className="text-xs text-zinc-400">Quick (0.5s)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Standard reset" 
              variant="withText"
              resetDuration={2000}
              copyText="2000ms reset"
              copiedText="Done!"
            />
            <span className="text-xs text-zinc-400">Standard (2s)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Slow reset" 
              variant="withText"
              resetDuration={5000}
              copyText="5000ms reset"
              copiedText="Done!"
            />
            <span className="text-xs text-zinc-400">Slow (5s)</span>
          </div>
        </div>
      </PreviewCard>

      {/* 24. Bordered Option */}
      <PreviewCard
        title="Border Control"
        description="Toggle borders on and off for different visual styles. Most visible with 'outline' and 'solid' tones."
        code={`// With border (default) - visible border around the button
<Clipboard textToCopy="With border" variant="icon" tone="outline" bordered={true} colorScheme="primary" />

// No border - transparent border for a cleaner look
<Clipboard textToCopy="No border" variant="icon" tone="outline" bordered={false} colorScheme="primary" />`}
      >
        <div className="flex flex-col gap-6 p-4">
          {/* Outline tone - border most visible */}
          <div>
            <p className="text-xs text-zinc-500 mb-3">Outline Tone (border most visible)</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="outline"
                  colorScheme="primary"
                  size="lg"
                  bordered={true}
                />
                <span className="text-xs text-zinc-400">With Border</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="outline"
                  colorScheme="primary"
                  size="lg"
                  bordered={false}
                />
                <span className="text-xs text-zinc-400">No Border</span>
              </div>
            </div>
          </div>
          
          {/* Solid tone */}
          <div>
            <p className="text-xs text-zinc-500 mb-3">Solid Tone</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="solid"
                  colorScheme="gold"
                  size="lg"
                  bordered={true}
                />
                <span className="text-xs text-zinc-400">With Border</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="solid"
                  colorScheme="gold"
                  size="lg"
                  bordered={false}
                />
                <span className="text-xs text-zinc-400">No Border</span>
              </div>
            </div>
          </div>
          
          {/* Soft tone */}
          <div>
            <p className="text-xs text-zinc-500 mb-3">Soft Tone</p>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="soft"
                  colorScheme="success"
                  size="lg"
                  bordered={true}
                />
                <span className="text-xs text-zinc-400">With Border</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Clipboard 
                  textToCopy={demoText} 
                  variant="icon"
                  tone="soft"
                  colorScheme="success"
                  size="lg"
                  bordered={false}
                />
                <span className="text-xs text-zinc-400">No Border</span>
              </div>
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 25. Custom Classes */}
      <PreviewCard
        title="Custom Classes"
        description="Apply custom styles using className props for maximum flexibility."
        code={`<Clipboard 
  textToCopy="Custom styled!" 
  variant="icon"
  className="bg-gradient-to-r from-purple-500 to-pink-500 border-none"
  iconClassName="text-white"
/>
<Clipboard 
  textToCopy="npm install andhera-react" 
  variant="input"
  wrapperClassName="border-2 border-yellow-500"
/>`}
      >
        <div className="flex flex-col gap-6 items-center justify-center p-4 w-full max-w-md">
          <div className="flex flex-col items-center gap-2">
            <Clipboard 
              textToCopy="Custom gradient!" 
              variant="icon"
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 border-none hover:from-purple-600 hover:to-pink-600"
              iconClassName="text-white"
            />
            <span className="text-xs text-zinc-400">Gradient Background</span>
          </div>
          <div className="w-full">
            <Clipboard 
              textToCopy="npm install andhera-react" 
              variant="input"
              size="md"
              wrapperClassName="border-2 border-yellow-500/50 hover:border-yellow-500"
            />
            <span className="text-xs text-zinc-400 block mt-2 text-center">Custom Border Color</span>
          </div>
        </div>
      </PreviewCard>

      {/* 26. Accessibility Features */}
      <PreviewCard
        title="Accessibility"
        description="Built-in accessibility with ARIA labels, live announcements, and keyboard support."
        code={`<Clipboard 
  textToCopy="Accessible!" 
  variant="withText"
  ariaLabelCopy="Copy secret code to clipboard"
  ariaLabelCopied="Secret code copied successfully"
  announceCopied={true}
/>`}
      >
        <div className="flex flex-col gap-4 items-start p-4">
          <Clipboard 
            textToCopy="SEC-2024-XYZ" 
            variant="withText"
            size="md"
            ariaLabelCopy="Copy secret code to clipboard"
            ariaLabelCopied="Secret code copied successfully"
            announceCopied={true}
            copyText="Copy Secret Code"
            copiedText="Copied!"
          />
          <p className="text-xs text-zinc-500">
            ✓ Custom aria-labels for screen readers<br />
            ✓ Live region announcements on state change<br />
            ✓ Keyboard accessible (Tab + Enter/Space)
          </p>
        </div>
      </PreviewCard>

      {/* Props Reference */}
      <PropsReference />
    </div>
  );
}

/**
 * PropsReference Component
 * Displays a comprehensive table of all Clipboard component props
 */
function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Clipboard Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Clipboard is a versatile copy-to-clipboard component with multiple variants, sizes, tones, and extensive customization options.
          It supports controlled and uncontrolled modes with comprehensive callback support.
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

/**
 * Demo component for controlled state
 */
function ControlledClipboardDemo({ demoText }: { demoText: string }) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSimulateCopy = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }, 1000);
  };

  const handleSimulateError = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError(true);
      setTimeout(() => setError(false), 2000);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleSimulateCopy}
          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md border border-zinc-600"
        >
          Simulate Copy
        </button>
        <button 
          onClick={handleSimulateError}
          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md border border-zinc-600"
        >
          Simulate Error
        </button>
        <button 
          onClick={() => { setCopied(false); setError(false); setLoading(false); }}
          className="px-3 py-1.5 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md border border-zinc-600"
        >
          Reset
        </button>
      </div>
      <Clipboard 
        textToCopy={demoText} 
        variant="withText"
        size="md"
        isCopied={copied}
        isLoading={loading}
        isError={error}
        onCopiedChange={setCopied}
        copyText="Controlled Clipboard"
        copiedText="Copied!"
        loadingText="Loading..."
        errorText="Failed!"
      />
      <div className="text-xs text-zinc-500">
        State: {loading ? 'Loading' : error ? 'Error' : copied ? 'Copied' : 'Idle'}
      </div>
    </div>
  );
}

/**
 * Demo component for lifecycle callbacks
 */
function CallbacksDemo({ demoText }: { demoText: string }) {
  const [log, setLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLog(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <Clipboard 
        textToCopy={demoText} 
        variant="withText"
        size="md"
        copyText="Copy with Callbacks"
        copiedText="Copied!"
        onCopyStart={() => addLog('onCopyStart triggered')}
        onCopySuccess={() => addLog('onCopySuccess triggered')}
        onCopyError={(err) => addLog(`onCopyError: ${err}`)}
        onReset={() => addLog('onReset triggered')}
      />
      <div className="bg-zinc-900/50 border border-zinc-700 rounded-md p-3 min-h-[80px]">
        <div className="text-xs text-zinc-500 mb-2">Event Log:</div>
        {log.length === 0 ? (
          <div className="text-xs text-zinc-600">Click the button to see events...</div>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="text-xs text-zinc-400 font-mono">{entry}</div>
          ))
        )}
      </div>
    </div>
  );
}
