import { useState } from "react";
import { Button, PlusIcon, ChevronRightIcon } from "../../../src/components/button/buttons";
import { Search, Download, ExternalLink } from "../../../src/components/icons";

/**
 * ButtonPreview Component
 * Displays all button variants in separate cards matching the Figma design
 */
export function ButtonPreview() {
  return (
    <div className="flex flex-col gap-8 w-full md:gap-11">
      {/* 1. Primary Button Section */}
      <PreviewCard
        title="Primary Button"
        description="Use the primary button for important actions, such as confirming a purchase or submitting a form. It guides the user toward the most critical step in their journey.

ButtonSize: 'xs' | 'small' | 'default' | 'large' | 'extra-large'"
        code={`<Button variant="primary" size="xs">XS Button</Button>
<Button variant="primary" size="small">Small</Button>
<Button variant="primary" size="default">Default</Button>
<Button variant="primary" size="large">Large</Button>
<Button variant="primary" size="extra-large">Extra Large</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" size="xs">XS Button</Button>
          <Button variant="primary" size="small">Small</Button>
          <Button variant="primary" size="default">Default</Button>
          <Button variant="primary" size="large">Large</Button>
          <Button variant="primary" size="extra-large">Extra Large</Button>
        </div>
      </PreviewCard>

      {/* 2. Secondary Button Section */}
      <PreviewCard
        title="Secondary Button"
        description="Use the secondary button for less critical actions, like navigating to another page or dismissing a pop-up. It offers alternative options without detracting from the primary action.

ButtonVariant: 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'secondary-destructive' | 'ghost' | 'link'"
        code={`<Button variant="secondary" size="small">
  Button
</Button>
<Button variant="secondary" size="default">
  Button
</Button>
<Button variant="secondary" size="large">
  Button
</Button>
<Button variant="secondary" size="extra-large">
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="secondary" size="small">Button</Button>
          <Button variant="secondary" size="default">Button</Button>
          <Button variant="secondary" size="large">Button</Button>
          <Button variant="secondary" size="extra-large">Button</Button>
        </div>
      </PreviewCard>

      {/* 3. Tertiary Button Section */}
      <PreviewCard
        title="Tertiary Button"
        description="The tertiary button is best for optional or less frequent actions. Use it sparingly for tasks like applying filters or viewing advanced settings, ensuring it doesn't overshadow more important functions."
        code={`<Button variant="tertiary" size="small">
  Button
</Button>
<Button variant="tertiary" size="default">
  Button
</Button>
<Button variant="tertiary" size="large">
  Button
</Button>
<Button variant="tertiary" size="extra-large">
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="tertiary" size="small">Button</Button>
          <Button variant="tertiary" size="default">Button</Button>
          <Button variant="tertiary" size="large">Button</Button>
          <Button variant="tertiary" size="extra-large">Button</Button>
        </div>
      </PreviewCard>

      {/* 4. Destructive Button Section */}
      <PreviewCard
        title="Destructive Button"
        description="The Destructive button is reserved for actions that have irreversible consequences, such as deleting data or canceling a subscription. Use it cautiously to prevent accidental data loss."
        code={`<Button variant="destructive" size="small">
  Button
</Button>
<Button variant="destructive" size="default">
  Button
</Button>
<Button variant="destructive" size="large">
  Button
</Button>
<Button variant="destructive" size="extra-large">
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="destructive" size="small">Button</Button>
          <Button variant="destructive" size="default">Button</Button>
          <Button variant="destructive" size="large">Button</Button>
          <Button variant="destructive" size="extra-large">Button</Button>
        </div>
      </PreviewCard>

      {/* 5. Secondary-Destructive Button Section */}
      <PreviewCard
        title="Secondar-Destructive Button"
        description="The Secondary Destructive button is intended for actions that can lead to significant changes, like modifying settings or removing features. Exercise caution when using it to avoid unintended disruptions."
        code={`<Button variant="secondary-destructive" size="small">
  Button
</Button>
<Button variant="secondary-destructive" size="default">
  Button
</Button>
<Button variant="secondary-destructive" size="large">
  Button
</Button>
<Button variant="secondary-destructive" size="extra-large">
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="secondary-destructive" size="small">Button</Button>
          <Button variant="secondary-destructive" size="default">Button</Button>
          <Button variant="secondary-destructive" size="large">Button</Button>
          <Button variant="secondary-destructive" size="extra-large">Button</Button>
        </div>
      </PreviewCard>

      {/* 6. Leading Icon Button Section */}
      <PreviewCard
        title="Leading Icon Button"
        description="The Leading Icon Button is perfect for actions that benefit from visual reinforcement, such as adding a new item with a plus icon or navigating back with an arrow. It combines clarity with visual appeal.

IconPosition: 'none' | 'leading' | 'trailing' | 'icon-only'"
        code={`<Button variant="primary" iconPosition="leading" leadingIcon={<PlusIcon />}>
  Button
</Button>
<Button variant="secondary" iconPosition="leading" leadingIcon={<PlusIcon />}>
  Button
</Button>
<Button variant="tertiary" iconPosition="leading" leadingIcon={<PlusIcon />}>
  Button
</Button>
<Button variant="destructive" iconPosition="leading" leadingIcon={<PlusIcon />}>
  Button
</Button>
<Button variant="secondary-destructive" iconPosition="leading" leadingIcon={<PlusIcon />}>
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" size="default" iconPosition="leading" leadingIcon={<PlusIcon />}>Button</Button>
          <Button variant="secondary" size="default" iconPosition="leading" leadingIcon={<PlusIcon />}>Button</Button>
          <Button variant="tertiary" size="default" iconPosition="leading" leadingIcon={<PlusIcon />}>Button</Button>
          <Button variant="destructive" size="default" iconPosition="leading" leadingIcon={<PlusIcon />}>Button</Button>
          <Button variant="secondary-destructive" size="default" iconPosition="leading" leadingIcon={<PlusIcon />}>Button</Button>
        </div>
      </PreviewCard>

      {/* 7. Trailing Icon Button Section */}
      <PreviewCard
        title="Trailing Icon Button"
        description="The Trailing Icon Button is ideal for actions that require a subtle yet effective visual cue, like submitting a form with a checkmark or sharing content with a share icon. It strikes a balance between functionality and aesthetic charm."
        code={`<Button variant="primary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Button
</Button>
<Button variant="secondary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Button
</Button>
<Button variant="tertiary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Button
</Button>
<Button variant="destructive" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Button
</Button>
<Button variant="secondary-destructive" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Button</Button>
          <Button variant="secondary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Button</Button>
          <Button variant="tertiary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Button</Button>
          <Button variant="destructive" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Button</Button>
          <Button variant="secondary-destructive" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Button</Button>
        </div>
      </PreviewCard>

      {/* 8. Icon Only Button Section */}
      <PreviewCard
        title="Icon Only Button"
        description="The Icon Button is perfect for actions that need a clear visual signal, such as submitting a form with a checkmark or sharing content with a share symbol. It beautifully combines practicality with visual appeal."
        code={`<Button variant="primary" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
<Button variant="secondary" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
<Button variant="tertiary" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
<Button variant="destructive" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
<Button variant="secondary-destructive" iconPosition="icon-only" leadingIcon={<PlusIcon />} />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" size="default" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
          <Button variant="secondary" size="default" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
          <Button variant="tertiary" size="default" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
          <Button variant="destructive" size="default" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
          <Button variant="secondary-destructive" size="default" iconPosition="icon-only" leadingIcon={<PlusIcon />} />
        </div>
      </PreviewCard>

      {/* 9. Focus State Button Section */}
      <PreviewCard
        title="Focus State Button"
        description="Focus state buttons are essential for enhancing user interaction, providing a clear indication of which element is currently active. They often feature a distinct outline or color change, making it easy for users to navigate forms or menus. This visual cue not only improves accessibility but also adds a layer of engagement, ensuring that users feel in control of their actions."
        code={`<Button
  variant="primary"
  iconPosition="trailing"
  trailingIcon={<ChevronRightIcon />}
  style={{ outline: "2px solid #FFE566", outlineOffset: "2px" }}
>
  Button
</Button>
<Button
  variant="secondary"
  iconPosition="trailing"
  trailingIcon={<ChevronRightIcon />}
  style={{
    border: "1px solid #FFCB00",
    outline: "2px solid rgba(255, 203, 0, 0.3)",
    outlineOffset: "2px",
  }}
>
  Button
</Button>
<Button
  variant="tertiary"
  iconPosition="trailing"
  trailingIcon={<ChevronRightIcon />}
  style={{
    background: "rgba(255, 203, 0, 0.1)",
    outline: "2px solid rgba(255, 203, 0, 0.3)",
    outlineOffset: "2px",
  }}
>
  Button
</Button>
<Button
  variant="destructive"
  iconPosition="trailing"
  trailingIcon={<ChevronRightIcon />}
  style={{ outline: "2px solid rgba(239, 68, 68, 0.5)", outlineOffset: "2px" }}
>
  Button
</Button>
<Button
  variant="secondary-destructive"
  iconPosition="trailing"
  trailingIcon={<ChevronRightIcon />}
  style={{
    border: "1px solid #EF4444",
    outline: "2px solid rgba(239, 68, 68, 0.3)",
    outlineOffset: "2px",
  }}
>
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button 
            variant="primary" 
            size="default" 
            iconPosition="trailing" 
            trailingIcon={<ChevronRightIcon />}
            style={{ 
              outline: "2px solid #FFE566",
              outlineOffset: "2px" 
            }}
          >
            Button
          </Button>
          <Button 
            variant="secondary" 
            size="default" 
            iconPosition="trailing" 
            trailingIcon={<ChevronRightIcon />}
            style={{ 
              border: "1px solid #FFCB00",
              outline: "2px solid rgba(255, 203, 0, 0.3)",
              outlineOffset: "2px" 
            }}
          >
            Button
          </Button>
          <Button 
            variant="tertiary" 
            size="default" 
            iconPosition="trailing" 
            trailingIcon={<ChevronRightIcon />}
            style={{ 
              background: "rgba(255, 203, 0, 0.1)",
              outline: "2px solid rgba(255, 203, 0, 0.3)",
              outlineOffset: "2px" 
            }}
          >
            Button
          </Button>
          <Button 
            variant="destructive" 
            size="default" 
            iconPosition="trailing" 
            trailingIcon={<ChevronRightIcon />}
            style={{ 
              outline: "2px solid rgba(239, 68, 68, 0.5)",
              outlineOffset: "2px" 
            }}
          >
            Button
          </Button>
          <Button 
            variant="secondary-destructive" 
            size="default" 
            iconPosition="trailing" 
            trailingIcon={<ChevronRightIcon />}
            style={{ 
              border: "1px solid #EF4444",
              outline: "2px solid rgba(239, 68, 68, 0.3)",
              outlineOffset: "2px" 
            }}
          >
            Button
          </Button>
        </div>
      </PreviewCard>

      {/* 10. Disabled State Button Section */}
      <PreviewCard
        title="Disabled State Button"
        description="Disabled buttons play a crucial role in user experience by clearly indicating that an action cannot be performed at the moment. They typically appear grayed out or less vibrant, signaling to users that they are inactive. This visual distinction helps prevent confusion and enhances navigation, allowing users to focus on available options without frustration."
        code={`<Button variant="primary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>
  Button
</Button>
<Button variant="secondary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>
  Button
</Button>
<Button variant="tertiary" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>
  Button
</Button>
<Button variant="destructive" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>
  Button
</Button>
<Button variant="secondary-destructive" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>
  Button
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>Button</Button>
          <Button variant="secondary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>Button</Button>
          <Button variant="tertiary" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>Button</Button>
          <Button variant="destructive" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>Button</Button>
          <Button variant="secondary-destructive" size="default" iconPosition="trailing" trailingIcon={<ChevronRightIcon />} disabled>Button</Button>
        </div>
      </PreviewCard>

      {/* 11. Ghost & Link Variants Section */}
      <PreviewCard
        title="Ghost & Link Variants"
        description="Ghost buttons are subtle with transparent backgrounds, perfect for secondary actions. Link variant buttons appear as text links with underline, ideal for navigation within content."
        code={`<Button variant="ghost" size="default">Ghost Button</Button>
<Button variant="ghost" iconPosition="leading" leadingIcon={<Search size={16} />}>
  Search
</Button>
<Button variant="link" size="default">Link Button</Button>
<Button variant="link" iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>
  Learn More
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="ghost" size="default">Ghost Button</Button>
          <Button variant="ghost" iconPosition="leading" leadingIcon={<Search size={16} />}>Search</Button>
          <Button variant="link" size="default">Link Button</Button>
          <Button variant="link" iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>Learn More</Button>
        </div>
      </PreviewCard>

      {/* 12. Loading State Section */}
      <PreviewCard
        title="Loading State"
        description="Loading states indicate that an action is being processed. Customize the loading text and spinner position to provide better feedback to users.

LoadingPosition: 'start' | 'end' | 'center'"
        code={`<Button variant="primary" loading>Loading...</Button>
<Button variant="secondary" loading loadingText="Saving...">Save</Button>
<Button variant="primary" loading loadingPosition="start" loadingText="Processing">
  Submit
</Button>
<Button variant="primary" loading loadingPosition="end" loadingText="Uploading">
  Upload
</Button>
<Button variant="primary" iconPosition="icon-only" loading leadingIcon={<PlusIcon />} />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" loading>Loading...</Button>
          <Button variant="secondary" loading loadingText="Saving...">Save</Button>
          <Button variant="primary" loading loadingPosition="start" loadingText="Processing">Submit</Button>
          <Button variant="primary" loading loadingPosition="end" loadingText="Uploading">Upload</Button>
          <Button variant="primary" iconPosition="icon-only" loading leadingIcon={<PlusIcon />} />
        </div>
      </PreviewCard>

      {/* 13. Pill/Rounded Buttons Section */}
      <PreviewCard
        title="Pill & Rounded Buttons"
        description="Rounded buttons with fully circular edges create a softer, more modern look. Use the 'rounded' prop for pill-shaped buttons or customize with 'borderRadius'."
        code={`<Button variant="primary" rounded>Pill Button</Button>
<Button variant="secondary" rounded iconPosition="leading" leadingIcon={<PlusIcon />}>
  Add New
</Button>
<Button variant="primary" borderRadius="4px">Sharp Corners</Button>
<Button variant="secondary" borderRadius="16px">Custom Radius</Button>
<Button variant="primary" iconPosition="icon-only" rounded leadingIcon={<PlusIcon />} />`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" rounded>Pill Button</Button>
          <Button variant="secondary" rounded iconPosition="leading" leadingIcon={<PlusIcon />}>Add New</Button>
          <Button variant="primary" borderRadius="4px">Sharp Corners</Button>
          <Button variant="secondary" borderRadius="16px">Custom Radius</Button>
          <Button variant="primary" iconPosition="icon-only" rounded leadingIcon={<PlusIcon />} />
        </div>
      </PreviewCard>

      {/* 14. Compact Mode Section */}
      <PreviewCard
        title="Compact Mode"
        description="Compact buttons have reduced padding, perfect for dense UIs, toolbars, or when you need to fit more actions in limited space."
        code={`<Button variant="primary" compact>Compact</Button>
<Button variant="secondary" compact>Compact</Button>
<Button variant="primary" size="small" compact>Small Compact</Button>
<Button variant="primary" size="large" compact>Large Compact</Button>
<Button variant="primary" compact iconPosition="leading" leadingIcon={<PlusIcon />}>
  Add
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" compact>Compact</Button>
          <Button variant="secondary" compact>Compact</Button>
          <Button variant="primary" size="small" compact>Small Compact</Button>
          <Button variant="primary" size="large" compact>Large Compact</Button>
          <Button variant="primary" compact iconPosition="leading" leadingIcon={<PlusIcon />}>Add</Button>
        </div>
      </PreviewCard>

      {/* 15. Shadow & Uppercase Section */}
      <PreviewCard
        title="Shadow & Uppercase"
        description="Add shadows for depth and elevation effects. Use uppercase text for prominent call-to-action buttons that demand attention.

shadow: boolean | 'sm' | 'md' | 'lg'"
        code={`<Button variant="primary" shadow>With Shadow</Button>
<Button variant="primary" shadow="lg">Large Shadow</Button>
<Button variant="primary" uppercase>Uppercase</Button>
<Button variant="secondary" uppercase shadow>
  Combined
</Button>
<Button variant="destructive" uppercase shadow="sm">
  Delete Account
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" shadow>With Shadow</Button>
          <Button variant="primary" shadow="lg">Large Shadow</Button>
          <Button variant="primary" uppercase>Uppercase</Button>
          <Button variant="secondary" uppercase shadow>Combined</Button>
          <Button variant="destructive" uppercase shadow="sm">Delete Account</Button>
        </div>
      </PreviewCard>

      {/* 16. Custom Colors Section */}
      <PreviewCard
        title="Custom Colors"
        description="Override default colors with custom backgroundColor, textColor, and borderColor props to match your brand or create unique button styles."
        code={`<Button backgroundColor="#8B5CF6" textColor="#FFFFFF">
  Purple
</Button>
<Button backgroundColor="#10B981" textColor="#FFFFFF">
  Green
</Button>
<Button backgroundColor="transparent" textColor="#8B5CF6" borderColor="#8B5CF6">
  Purple Outline
</Button>
<Button backgroundColor="#1F2937" textColor="#F3F4F6">
  Dark Gray
</Button>
<Button backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" textColor="#FFFFFF">
  Gradient
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button backgroundColor="#8B5CF6" textColor="#FFFFFF">Purple</Button>
          <Button backgroundColor="#10B981" textColor="#FFFFFF">Green</Button>
          <Button backgroundColor="transparent" textColor="#8B5CF6" borderColor="#8B5CF6">Purple Outline</Button>
          <Button backgroundColor="#1F2937" textColor="#F3F4F6">Dark Gray</Button>
          <Button style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }} textColor="#FFFFFF">Gradient</Button>
        </div>
      </PreviewCard>

      {/* 17. Link Buttons (href) Section */}
      <PreviewCard
        title="Link Buttons (As Anchor)"
        description="Buttons can render as anchor elements when href is provided. Perfect for navigation links styled as buttons. Supports target and rel attributes.

target: '_blank' | '_self' | '_parent' | '_top'"
        code={`<Button href="https://github.com" target="_blank" variant="primary">
  Visit GitHub
</Button>
<Button href="https://google.com" target="_blank" variant="secondary" 
  iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>
  Open Link
</Button>
<Button href="#features" variant="tertiary">
  Jump to Features
</Button>
<Button href="mailto:hello@example.com" variant="link">
  Contact Us
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button href="https://github.com" target="_blank" variant="primary">Visit GitHub</Button>
          <Button href="https://google.com" target="_blank" variant="secondary" iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>Open Link</Button>
          <Button href="#features" variant="tertiary">Jump to Features</Button>
          <Button href="mailto:hello@example.com" variant="link">Contact Us</Button>
        </div>
      </PreviewCard>

      {/* 18. Left & Right Sections Section */}
      <PreviewCard
        title="Left & Right Sections"
        description="Use leftSection and rightSection props for flexible content placement. These are independent of the icon system and can contain any React content."
        code={`<Button 
  variant="primary" 
  leftSection={<span style={{ fontSize: '18px' }}>🚀</span>}
>
  Launch
</Button>
<Button 
  variant="secondary" 
  rightSection={<span style={{ background: '#FFCB00', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>NEW</span>}
>
  Features
</Button>
<Button 
  variant="primary" 
  leftSection={<Download size={16} />} 
  rightSection={<span style={{ opacity: 0.7, fontSize: '12px' }}>PDF</span>}
>
  Download
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" leftSection={<span style={{ fontSize: '18px' }}>🚀</span>}>Launch</Button>
          <Button variant="secondary" rightSection={<span style={{ background: '#FFCB00', color: '#000', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>NEW</span>}>Features</Button>
          <Button variant="primary" leftSection={<Download size={16} />} rightSection={<span style={{ opacity: 0.7, fontSize: '12px' }}>PDF</span>}>Download</Button>
        </div>
      </PreviewCard>

      {/* 19. Full Width & Active State Section */}
      <PreviewCard
        title="Full Width & Active State"
        description="Full width buttons span the entire container width, perfect for mobile layouts and forms. Active state shows a pressed/selected appearance."
        code={`<Button variant="primary" fullWidth>Full Width Button</Button>
<Button variant="secondary" fullWidth iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>
  Continue to Checkout
</Button>
<Button variant="primary" active>Active State</Button>
<Button variant="secondary" active>Active Outline</Button>`}
      >
        <div className="flex flex-col gap-4 items-center justify-center w-full">
          <Button variant="primary" fullWidth>Full Width Button</Button>
          <Button variant="secondary" fullWidth iconPosition="trailing" trailingIcon={<ChevronRightIcon />}>Continue to Checkout</Button>
          <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
            <Button variant="primary" active>Active State</Button>
            <Button variant="secondary" active>Active Outline</Button>
          </div>
        </div>
      </PreviewCard>

      {/* 20. Button Types Section */}
      <PreviewCard
        title="Button Types"
        description="Set the HTML button type attribute for proper form behavior. Use 'submit' for form submission, 'reset' to reset form fields, and 'button' (default) for regular buttons.

ButtonType: 'button' | 'submit' | 'reset'"
        code={`<Button type="button" variant="secondary">Type: Button</Button>
<Button type="submit" variant="primary">Type: Submit</Button>
<Button type="reset" variant="tertiary">Type: Reset</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button type="button" variant="secondary">Type: Button</Button>
          <Button type="submit" variant="primary">Type: Submit</Button>
          <Button type="reset" variant="tertiary">Type: Reset</Button>
        </div>
      </PreviewCard>

      {/* 21. Tooltip Section */}
      <PreviewCard
        title="Tooltips"
        description="Add native tooltips to buttons using the tooltip prop. Tooltips provide additional context on hover without cluttering the UI."
        code={`<Button variant="primary" tooltip="This is a helpful tooltip">
  Hover Me
</Button>
<Button variant="secondary" iconPosition="icon-only" leadingIcon={<Search size={16} />} 
  tooltip="Search for items" />
<Button variant="tertiary" tooltip="Opens in new tab" 
  iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>
  External Link
</Button>`}
      >
        <div className="flex gap-4 items-center justify-center flex-wrap md:gap-6 lg:gap-10">
          <Button variant="primary" tooltip="This is a helpful tooltip">Hover Me</Button>
          <Button variant="secondary" iconPosition="icon-only" leadingIcon={<Search size={16} />} tooltip="Search for items" />
          <Button variant="tertiary" tooltip="Opens in new tab" iconPosition="trailing" trailingIcon={<ExternalLink size={16} />}>External Link</Button>
        </div>
      </PreviewCard>
    </div>
  );
}

/**
 * PreviewCard Component
 * Wraps each button variant section with title, description, and preview area
 */
interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

function PreviewCard({ title, description, code, children }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-xl font-semibold leading-tight text-white m-0
          max-[768px]:text-base
          min-[769px]:max-[1024px]:text-lg">
          {title}
        </h3>
        <p className="font-sans text-sm font-normal leading-relaxed text-gray-300 m-0 whitespace-pre-wrap
          max-[768px]:text-[13px]">
          {description}
        </p>
      </div>

      {/* Preview Container */}
      <div className="bg-white/10 border border-[#364153] rounded-2xl p-3 min-h-[266px] flex items-center justify-center relative overflow-hidden
        max-[768px]:rounded-xl max-[768px]:p-2.5 max-[768px]:min-h-[200px] max-[768px]:flex-col
        min-[769px]:max-[1024px]:min-h-[240px]">
        {/* Toggle Controls - Top Right */}
        <div className="absolute top-3 right-3 flex gap-2 items-center z-10
          max-[768px]:relative max-[768px]:top-0 max-[768px]:right-0 max-[768px]:w-full max-[768px]:justify-end max-[768px]:mb-3">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="bg-transparent border border-[#364153] rounded-lg p-2.5 cursor-pointer flex items-center justify-center transition-all hover:bg-white/5
              max-[768px]:p-2"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="6" y="6" width="9" height="9" rx="1.5" stroke="white" strokeWidth="1.5"/>
                <path d="M3.75 11.25V4.5C3.75 3.67157 4.42157 3 5.25 3H12" stroke="white" strokeWidth="1.5"/>
              </svg>
            )}
          </button>

          {/* Preview/Code Toggle */}
          <div className="border border-[#364153] rounded-lg flex overflow-hidden">
            <button
              onClick={() => setActiveTab("preview")}
              className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
                max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
                ${activeTab === "preview" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`bg-transparent border-none rounded-lg px-5 py-2.5 font-sans text-sm font-medium cursor-pointer transition-all
                max-[768px]:px-3 max-[768px]:py-2 max-[768px]:text-xs
                ${activeTab === "code" ? "bg-[#242424] border border-[#364153] text-white" : "text-gray-400"}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "preview" ? (
          <div className="z-[1] w-full flex justify-center pt-[50px]
            max-[768px]:pt-0">
            {children}
          </div>
        ) : (
          <div className="w-full pt-[60px] px-3 pb-3 overflow-hidden absolute top-0 left-0 bottom-0 right-0
            max-[768px]:p-3 max-[768px]:relative">
            <pre className="m-0 p-4 bg-[#1a1a1a] rounded-lg h-full overflow-auto font-mono text-[13px] leading-normal text-gray-200 scrollbar-none
              max-[768px]:text-[11px] max-[768px]:p-3">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
