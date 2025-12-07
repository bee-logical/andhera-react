import { useState } from "react";
import { Checkbox, CheckboxGroup } from "../../../src/components/checkbox/checkboxs";

/**
 * IndeterminateExample - Real-world Select All pattern
 */
function IndeterminateExample() {
  const [items, setItems] = useState({
    item1: true,
    item2: false,
    item3: false,
  });

  const allChecked = Object.values(items).every(Boolean);
  const someChecked = Object.values(items).some(Boolean) && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}>
      <Checkbox
        label="Select All"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={handleSelectAll}
        variant="primary"
      />
      <div style={{ marginLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox
          label="Item 1"
          checked={items.item1}
          onChange={(checked) => setItems(prev => ({ ...prev, item1: checked }))}
        />
        <Checkbox
          label="Item 2"
          checked={items.item2}
          onChange={(checked) => setItems(prev => ({ ...prev, item2: checked }))}
        />
        <Checkbox
          label="Item 3"
          checked={items.item3}
          onChange={(checked) => setItems(prev => ({ ...prev, item3: checked }))}
        />
      </div>
    </div>
  );
}

/**
 * CheckboxPreview Component
 * Displays all checkbox variants in separate cards matching the Figma design
 */
export function CheckboxPreview() {
  // State for interactive checkboxes
  const [basic1, setBasic1] = useState(false);
  const [basic2, setBasic2] = useState(true);
  
  const [small, setSmall] = useState(true);
  const [medium, setMedium] = useState(true);
  const [large, setLarge] = useState(true);
  
  const [primary1, setPrimary1] = useState(false);
  const [primary2, setPrimary2] = useState(true);
  
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(true);
  
  const [default1, setDefault1] = useState(false);
  const [default2, setDefault2] = useState(true);
  
  const [desc1, setDesc1] = useState(false);
  const [desc2, setDesc2] = useState(true);
  
  const [valid1, setValid1] = useState(false);
  const [valid2, setValid2] = useState(false);
  
  const [right, setRight] = useState(true);
  const [left, setLeft] = useState(true);
  const [top, setTop] = useState(true);
  const [bottom, setBottom] = useState(true);
  
  const [req1, setReq1] = useState(false);
  const [req2, setReq2] = useState(false);
  
  // Indeterminate state examples
  const [indet1, setIndet1] = useState(false);
  const [indet2, setIndet2] = useState(false);
  const [indet3, setIndet3] = useState(true);

  // Custom Colors section (section 15)
  const [customPurple, setCustomPurple] = useState(true);
  const [customTeal, setCustomTeal] = useState(false);
  const [customOrange, setCustomOrange] = useState(true);

  // Border Radius section (section 16)
  const [radiusNone, setRadiusNone] = useState(true);
  const [radiusSm, setRadiusSm] = useState(true);
  const [radiusMd, setRadiusMd] = useState(true);
  const [radiusLg, setRadiusLg] = useState(true);
  const [radiusFull, setRadiusFull] = useState(true);

  // Tooltip section (section 17)
  const [tooltip1, setTooltip1] = useState(true);
  const [tooltip2, setTooltip2] = useState(false);
  const [tooltip3, setTooltip3] = useState(false);

  // Animation section (section 18)
  const [animated1, setAnimated1] = useState(true);
  const [animated2, setAnimated2] = useState(true);

  // Read-only section (section 19)
  const [readonly1, setReadonly1] = useState(true);
  const [readonly2, setReadonly2] = useState(false);
  const [readonly3, setReadonly3] = useState(false);

  // Custom Styling section (section 20)
  const [customStyle1, setCustomStyle1] = useState(true);
  const [customStyle2, setCustomStyle2] = useState(false);
  const [customStyle3, setCustomStyle3] = useState(true);

  // Focus Ring section (section 21)
  const [focusRing1, setFocusRing1] = useState(false);
  const [focusRing2, setFocusRing2] = useState(false);
  const [focusRing3, setFocusRing3] = useState(false);
  const [focusRing4, setFocusRing4] = useState(false);

  return (
    <>
      <style>{`
        .checkbox-preview-container {
          display: flex;
          flex-direction: column;
          gap: 44px;
          width: 100%;
        }

        .checkbox-preview-row {
          display: flex;
          gap: 40px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .checkbox-preview-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
          justify-content: center;
          max-width: 400px;
          width: 100%;
        }

        .checkbox-preview-center {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .checkbox-indeterminate-section {
          display: flex;
          flex-direction: column;
          gap: 32px;
          width: 100%;
          max-width: 600px;
        }

        .checkbox-indeterminate-visual {
          display: flex;
          gap: 32px;
          align-items: center;
          justify-content: center;
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          flex-wrap: wrap;
        }

        .checkbox-indeterminate-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .checkbox-indeterminate-label {
          color: #D1D5DC;
          font-size: 13px;
        }

        .checkbox-indeterminate-demo {
          padding: 20px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          color: #FFFFFF;
        }

        .checkbox-indeterminate-header {
          margin-bottom: 12px;
        }

        .checkbox-indeterminate-title {
          color: #FFFFFF;
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 4px 0;
        }

        .checkbox-indeterminate-desc {
          color: #9CA3AF;
          font-size: 13px;
          margin: 0;
        }

        /* Mobile - max 480px */
        @media (max-width: 480px) {
          .checkbox-preview-container {
            gap: 28px;
          }

          .checkbox-preview-row {
            gap: 20px;
            flex-direction: column;
          }

          .checkbox-preview-column {
            gap: 14px;
            max-width: 100%;
          }

          .checkbox-indeterminate-section {
            gap: 20px;
            max-width: 100%;
          }

          .checkbox-indeterminate-visual {
            gap: 16px;
            padding: 12px;
            flex-direction: column;
          }

          .checkbox-indeterminate-label {
            font-size: 11px;
          }

          .checkbox-indeterminate-demo {
            padding: 14px;
          }

          .checkbox-indeterminate-title {
            font-size: 14px;
          }

          .checkbox-indeterminate-desc {
            font-size: 11px;
          }
        }

        /* Mobile Landscape & Small Tablets - 481px to 768px */
        @media (min-width: 481px) and (max-width: 768px) {
          .checkbox-preview-container {
            gap: 32px;
          }

          .checkbox-preview-row {
            gap: 28px;
          }

          .checkbox-preview-column {
            gap: 16px;
          }

          .checkbox-indeterminate-section {
            gap: 24px;
          }

          .checkbox-indeterminate-visual {
            gap: 24px;
            padding: 14px;
          }

          .checkbox-indeterminate-demo {
            padding: 16px;
          }

          .checkbox-indeterminate-title {
            font-size: 15px;
          }

          .checkbox-indeterminate-desc {
            font-size: 12px;
          }
        }

        /* Tablet - 769px to 1024px */
        @media (min-width: 769px) and (max-width: 1024px) {
          .checkbox-preview-container {
            gap: 38px;
          }

          .checkbox-preview-row {
            gap: 32px;
          }
        }

        /* Large Desktop - 1441px to 1920px */
        @media (min-width: 1441px) and (max-width: 1920px) {
          .checkbox-preview-container {
            gap: 52px;
          }

          .checkbox-preview-row {
            gap: 48px;
          }

          .checkbox-preview-column {
            gap: 24px;
            max-width: 480px;
          }

          .checkbox-indeterminate-section {
            gap: 40px;
            max-width: 700px;
          }

          .checkbox-indeterminate-visual {
            gap: 40px;
            padding: 20px;
          }

          .checkbox-indeterminate-demo {
            padding: 24px;
          }

          .checkbox-indeterminate-title {
            font-size: 18px;
          }

          .checkbox-indeterminate-desc {
            font-size: 14px;
          }
        }

        /* Extra Large Desktop - 1921px+ */
        @media (min-width: 1921px) {
          .checkbox-preview-container {
            gap: 60px;
          }

          .checkbox-preview-row {
            gap: 56px;
          }

          .checkbox-preview-column {
            gap: 28px;
            max-width: 520px;
          }

          .checkbox-indeterminate-section {
            gap: 48px;
            max-width: 800px;
          }

          .checkbox-indeterminate-visual {
            gap: 48px;
            padding: 24px;
          }

          .checkbox-indeterminate-demo {
            padding: 28px;
          }

          .checkbox-indeterminate-title {
            font-size: 20px;
          }

          .checkbox-indeterminate-desc {
            font-size: 15px;
          }
        }
      `}</style>
      <div className="checkbox-preview-container">
      {/* 1. Basic Checkbox Section */}
      <PreviewCard
        title="Basic Checkbox"
        description="Use checkboxes for binary choices where users can select multiple options. They're perfect for settings, filters, and multi-select scenarios.

• checked: boolean - Controlled checked state
• onChange: (checked: boolean, event: ChangeEvent) => void - Change handler
• defaultChecked: boolean - Uncontrolled initial state"
        code={`<Checkbox label="Unchecked" />
<Checkbox label="Checked" defaultChecked />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox  checked={basic1} onChange={setBasic1} />
          <Checkbox  checked={basic2} onChange={setBasic2} />
        </div>
      </PreviewCard>

      {/* 2. Size Variants Section */}
      <PreviewCard
        title="Size Variants"
        description="Checkboxes come in three sizes to accommodate different UI densities and hierarchies.

• CheckboxSize: 'small' (18px) | 'medium' (22px) | 'large' (26px)"
        code={`<Checkbox label="Small" size="small" defaultChecked />
<Checkbox label="Medium" size="medium" defaultChecked />
<Checkbox label="Large" size="large" defaultChecked />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox  size="small" checked={small} onChange={setSmall} />
          <Checkbox  size="medium" checked={medium} onChange={setMedium} />
          <Checkbox  size="large" checked={large} onChange={setLarge} />
        </div>
      </PreviewCard>

      {/* 3. Primary Variant Section */}
      <PreviewCard
        title="Primary Checkbox"
        description="The primary variant uses your brand's main color to indicate selection.

• CheckboxVariant: 'primary' | 'error' | 'default'"
        code={`<Checkbox variant="primary" label="Unchecked" />
<Checkbox variant="primary" label="Checked" defaultChecked />
<Checkbox variant="primary" label="Indeterminate" indeterminate />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox variant="primary"  checked={primary1} onChange={setPrimary1} />
          <Checkbox variant="primary"  checked={primary2} onChange={setPrimary2} />
          <Checkbox variant="primary"  indeterminate />
        </div>
      </PreviewCard>

      {/* 4. Error Variant Section */}
      <PreviewCard
        title="Error Checkbox"
        description="The error variant highlights validation issues or critical selections. Use variant='error' to draw attention to required fields or invalid states.

• variant: CheckboxVariant - Visual style variant"
        code={`<Checkbox variant="error" label="Unchecked" />
<Checkbox variant="error" label="Checked" defaultChecked />
<Checkbox variant="error" label="Indeterminate" indeterminate />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox variant="error"  checked={error1} onChange={setError1} />
          <Checkbox variant="error"  checked={error2} onChange={setError2} />
          <Checkbox variant="error"  indeterminate />
        </div>
      </PreviewCard>

      {/* 5. Default Variant Section */}
      {/* <PreviewCard
        title="Default Checkbox"
        description="The default variant provides a neutral, professional appearance suitable for most use cases without strong brand emphasis."
        code={`import { Checkbox } from "andhera-react";

export function Example() {
  return (
    <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
      <Checkbox variant="default" label="Unchecked" />
      <Checkbox variant="default" label="Checked" defaultChecked />
      <Checkbox variant="default" label="Indeterminate" indeterminate />
    </div>
  );
}`}
      >
        <div style={{ display: "flex", gap: "40px", alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Checkbox variant="default" checked={default1} onChange={setDefault1} />
            <span style={{ color: "#D1D5DC", fontSize: "14px" }}>Unchecked</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Checkbox variant="default" checked={default2} onChange={setDefault2} />
            <span style={{ color: "#D1D5DC", fontSize: "14px" }}>Checked</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <Checkbox variant="default" indeterminate />
            <span style={{ color: "#D1D5DC", fontSize: "14px" }}>Indeterminate</span>
          </div>
        </div>
      </PreviewCard> */}

      {/* 6. Indeterminate State Section */}
      <PreviewCard
        title="Indeterminate State"
        description="The indeterminate state represents a partially selected state, perfect for 'select all' patterns.

• indeterminate: boolean - Show indeterminate (minus) state
• checked: boolean - Controlled checked state
• onChange: (checked: boolean, event: ChangeEvent) => void"
        code={`import { Checkbox } from "andhera-react";
import { useState } from "react";

export function Example() {
  const [items, setItems] = useState({
    item1: true,
    item2: false,
    item3: false,
  });

  const allChecked = Object.values(items).every(Boolean);
  const someChecked = Object.values(items).some(Boolean) && !allChecked;

  const handleSelectAll = (checked: boolean) => {
    setItems({
      item1: checked,
      item2: checked,
      item3: checked,
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#FFFFFF" }}>
      <Checkbox
        label="Select All"
        checked={allChecked}
        indeterminate={someChecked}
        onChange={handleSelectAll}
        variant="primary"
      />
      <div style={{ marginLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <Checkbox
          label="Item 1"
          checked={items.item1}
          onChange={(checked) => setItems(prev => ({ ...prev, item1: checked }))}
        />
        <Checkbox
          label="Item 2"
          checked={items.item2}
          onChange={(checked) => setItems(prev => ({ ...prev, item2: checked }))}
        />
        <Checkbox
          label="Item 3"
          checked={items.item3}
          onChange={(checked) => setItems(prev => ({ ...prev, item3: checked }))}
        />
      </div>
    </div>
  );
}`}
      >
        <div className="checkbox-indeterminate-section">
          {/* Static Examples */}
          <div>
            <div className="checkbox-indeterminate-header">
              <h4 className="checkbox-indeterminate-title">Visual States</h4>
              <p className="checkbox-indeterminate-desc">Three distinct visual states. Note: Clicking an indeterminate checkbox makes it checked - this is standard behavior.</p>
            </div>
            <div className="checkbox-indeterminate-visual">
              <div className="checkbox-indeterminate-item">
                <Checkbox variant="primary" checked={indet1} onChange={setIndet1} />
                <span className="checkbox-indeterminate-label">Unchecked</span>
              </div>
              <div className="checkbox-indeterminate-item">
                <Checkbox 
                  variant="primary" 
                  indeterminate={!indet2} 
                  checked={indet2} 
                  onChange={setIndet2} 
                />
                <span className="checkbox-indeterminate-label">
                  {indet2 ? "Checked" : "Indeterminate"}
                </span>
              </div>
              <div className="checkbox-indeterminate-item">
                <Checkbox variant="primary" checked={indet3} onChange={setIndet3} />
                <span className="checkbox-indeterminate-label">Checked</span>
              </div>
            </div>
          </div>

          {/* Interactive Select All Demo */}
          <div>
            <div className="checkbox-indeterminate-header">
              <h4 className="checkbox-indeterminate-title">Interactive Demo: Select All Pattern</h4>
              <p className="checkbox-indeterminate-desc">Try selecting/deselecting items to see the parent checkbox change states automatically</p>
            </div>
            <div className="checkbox-indeterminate-demo">
              <IndeterminateExample />
            </div>
          </div>
        </div>
      </PreviewCard>

      {/* 7. With Description Section */}
      <PreviewCard
        title="Checkbox with Description"
        description="Add contextual information displayed below the label in smaller, muted text.

• description: string - Secondary descriptive text below label"
        code={`<Checkbox
  label="Email notifications"
  description="Receive email updates about your account activity"
/>
<Checkbox
  label="SMS notifications"
  description="Get text messages for important updates"
  defaultChecked
/>`}
      >
        <div className="checkbox-preview-column">
          <Checkbox
            
            description="Receive email updates about your account activity"
            checked={desc1}
            onChange={setDesc1}
          />
          <Checkbox
          
            description="Get text messages for important updates"
            checked={desc2}
            onChange={setDesc2}
          />
        </div>
      </PreviewCard>

      {/* 8. Disabled State Section */}
      <PreviewCard
        title="Disabled State"
        description="Disabled checkboxes indicate unavailable options while maintaining visibility.

• disabled: boolean - Prevents interaction"
        code={`<Checkbox variant="primary" label="Disabled Unchecked" disabled />
<Checkbox variant="primary" label="Disabled Checked" disabled defaultChecked />
<Checkbox variant="error" label="Disabled Error" disabled defaultChecked />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox variant="primary" label="Disabled Unchecked" disabled />
          <Checkbox variant="primary" label="Disabled Checked" disabled defaultChecked />
          <Checkbox variant="error" label="Disabled Error" disabled defaultChecked />
        </div>
      </PreviewCard>

      {/* 9. Error Validation Section */}
      <PreviewCard
        title="Error & Validation"
        description="Display error messages and helper text for form validation feedback.

• error: string - Error message displayed in red
• helperText: string - Helper/guidance text
• required: boolean - Shows required asterisk (*)"
        code={`<Checkbox
  label="I agree to the Terms and Conditions"
  variant="error"
  error="You must accept the terms to continue"
  required
/>
<Checkbox
  label="Subscribe to newsletter"
  helperText="You can unsubscribe at any time"
/>`}
      >
        <div className="checkbox-preview-column">
          <Checkbox
            label="I agree to the Terms and Conditions"
            variant="error"
            error="You must accept the terms to continue"
            required
            checked={valid1}
            onChange={setValid1}
          />
          <Checkbox
            label="Subscribe to newsletter"
            helperText="You can unsubscribe at any time"
            checked={valid2}
            onChange={setValid2}
          />
        </div>
      </PreviewCard>

      {/* 10. Label Positions Section */}
      <PreviewCard
        title="Label Positions"
        description="Flexibility to position labels relative to the checkbox.

• CheckboxLabelPosition: 'left' | 'right' | 'top' | 'bottom'"
        code={`<Checkbox label="Right (Default)" labelPosition="right" defaultChecked />
<Checkbox label="Left" labelPosition="left" defaultChecked />
<Checkbox label="Top" labelPosition="top" defaultChecked />
<Checkbox label="Bottom" labelPosition="bottom" defaultChecked />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox label="Right" labelPosition="right" checked={right} onChange={setRight} />
          <Checkbox label="Left" labelPosition="left" checked={left} onChange={setLeft} />
          <Checkbox label="Top" labelPosition="top" checked={top} onChange={setTop} />
          <Checkbox label="Bottom" labelPosition="bottom" checked={bottom} onChange={setBottom} />
        </div>
      </PreviewCard>

      {/* 11. Checkbox Group - Vertical Section */}
      <PreviewCard
        title="Checkbox Group - Vertical"
        description="Group multiple related checkboxes vertically for logical organization.

• direction: 'vertical' | 'horizontal' - Layout direction (default: 'vertical')
• options: {label: string; value: string; description?: string; disabled?: boolean; tooltip?: string}[]
• defaultValue: string[] - Initially selected values"
        code={`<CheckboxGroup
  label="Select your interests"
  description="Choose all that apply"
  options={[
    { label: "Technology", value: "tech" },
    { label: "Design", value: "design" },
    { label: "Marketing", value: "marketing" },
    { label: "Business", value: "business" },
  ]}
  defaultValue={["tech", "design"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Select your interests"
            description="Choose all that apply"
            options={[
              { label: "Technology", value: "tech" },
              { label: "Design", value: "design" },
              { label: "Marketing", value: "marketing" },
              { label: "Business", value: "business" },
            ]}
            defaultValue={["tech", "design"]}
          />
        </div>
      </PreviewCard>

      {/* 12. Checkbox Group - Horizontal Section */}
      <PreviewCard
        title="Checkbox Group - Horizontal"
        description="Arrange checkboxes horizontally to save vertical space.

• direction: 'horizontal' - Horizontal layout"
        code={`<CheckboxGroup
  label="Notification preferences"
  options={[
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
    { label: "Push", value: "push" },
  ]}
  direction="horizontal"
  defaultValue={["email", "push"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            options={[
              { label: "Email", value: "email" },
              { label: "SMS", value: "sms" },
              { label: "Push", value: "push" },
            ]}
            direction="horizontal"
            defaultValue={["email", "push"]}
          />
        </div>
      </PreviewCard>

      {/* 13. Checkbox Group with Descriptions Section */}
      <PreviewCard
        title="Checkbox Group with Descriptions"
        description="Provide additional context for each option by including description in the options array.

• options[].description: string - Description text for each option"
        code={`<CheckboxGroup
  label="Account settings"
  options={[
    {
      label: "Two-factor authentication",
      value: "2fa",
      description: "Add an extra layer of security",
    },
    {
      label: "Email verification",
      value: "email-verify",
      description: "Verify your email address",
    },
    {
      label: "Activity log",
      value: "activity",
      description: "Track all account activities",
    },
  ]}
  defaultValue={["2fa"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Account settings"
            options={[
              {
                label: "Two-factor authentication",
                value: "2fa",
                description: "Add an extra layer of security",
              },
              {
                label: "Email verification",
                value: "email-verify",
                description: "Verify your email address",
              },
              {
                label: "Activity log",
                value: "activity",
                description: "Track all account activities",
              },
            ]}
            defaultValue={["2fa"]}
          />
        </div>
      </PreviewCard>

      {/* 14. Required Field Section */}
      <PreviewCard
        title="Required Fields"
        description="Mark essential selections with a red asterisk (*) indicator.

• required: boolean - Shows required field indicator"
        code={`<Checkbox
  label="I accept the privacy policy"
  required
  variant="primary"
/>
<Checkbox
  label="I am 18 years or older"
  required
  variant="primary"
/>`}
      >
        <div className="checkbox-preview-column">
          <Checkbox
            label="I accept the privacy policy"
            required
            variant="primary"
            checked={req1}
            onChange={setReq1}
          />
          <Checkbox
            label="I am 18 years or older"
            required
            variant="primary"
            checked={req2}
            onChange={setReq2}
          />
        </div>
      </PreviewCard>

      {/* 15. Custom Colors Section */}
      <PreviewCard
        title="Custom Colors"
        description="Customize checkbox appearance with custom colors for the checkbox, border, icon, and focus ring.

• color: string - Background color when checked
• borderColor: string - Border color when unchecked
• hoverBorderColor: string - Border color on hover
• iconColor: string - Checkmark icon color
• focusRingColor: string - Focus ring color"
        code={`<Checkbox
  label="Custom Purple"
  color="#8B5CF6"
  iconColor="#FFFFFF"
  focusRingColor="rgba(139, 92, 246, 0.4)"
  defaultChecked
/>
<Checkbox
  label="Custom Teal"
  color="#14B8A6"
  borderColor="#14B8A6"
  hoverBorderColor="#0D9488"
  iconColor="#FFFFFF"
/>
<Checkbox
  label="Custom Orange"
  color="#F97316"
  borderColor="#FB923C"
  iconColor="#000000"
  defaultChecked
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="Custom Purple"
            color="#8B5CF6"
            iconColor="#FFFFFF"
            focusRingColor="rgba(139, 92, 246, 0.4)"
            checked={customPurple}
            onChange={setCustomPurple}
          />
          <Checkbox
            label="Custom Teal"
            color="#14B8A6"
            borderColor="#14B8A6"
            hoverBorderColor="#0D9488"
            iconColor="#FFFFFF"
            checked={customTeal}
            onChange={setCustomTeal}
          />
          <Checkbox
            label="Custom Orange"
            color="#F97316"
            borderColor="#FB923C"
            iconColor="#000000"
            checked={customOrange}
            onChange={setCustomOrange}
          />
        </div>
      </PreviewCard>

      {/* 16. Border Radius Section */}
      <PreviewCard
        title="Border Radius"
        description="Control the border radius of checkboxes with the borderRadius prop.

• CheckboxBorderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full'"
        code={`<Checkbox label="None" borderRadius="none" defaultChecked />
<Checkbox label="Small" borderRadius="sm" defaultChecked />
<Checkbox label="Medium" borderRadius="md" defaultChecked />
<Checkbox label="Large" borderRadius="lg" defaultChecked />
<Checkbox label="Full" borderRadius="full" defaultChecked />`}
      >
        <div className="checkbox-preview-row">
          <Checkbox label="None" borderRadius="none" checked={radiusNone} onChange={setRadiusNone} />
          <Checkbox label="Small" borderRadius="sm" checked={radiusSm} onChange={setRadiusSm} />
          <Checkbox label="Medium" borderRadius="md" checked={radiusMd} onChange={setRadiusMd} />
          <Checkbox label="Large" borderRadius="lg" checked={radiusLg} onChange={setRadiusLg} />
          <Checkbox label="Full" borderRadius="full" checked={radiusFull} onChange={setRadiusFull} />
        </div>
      </PreviewCard>

      {/* 17. Tooltip Section */}
      <PreviewCard
        title="Tooltip"
        description="Add native HTML tooltips to checkboxes using the tooltip prop. Hover over the checkboxes to see the tooltips.

• tooltip: string - Native HTML tooltip text"
        code={`<Checkbox
  label="With Tooltip"
  tooltip="This is additional information about this option"
  defaultChecked
/>
<Checkbox
  label="Settings"
  tooltip="Configure your preferences"
/>
<Checkbox
  label="Privacy"
  tooltip="Read our privacy policy before enabling"
  variant="error"
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="With Tooltip"
            tooltip="This is additional information about this option"
            checked={tooltip1}
            onChange={setTooltip1}
          />
          <Checkbox
            label="Settings"
            tooltip="Configure your preferences"
            checked={tooltip2}
            onChange={setTooltip2}
          />
          <Checkbox
            label="Privacy"
            tooltip="Read our privacy policy before enabling"
            variant="error"
            checked={tooltip3}
            onChange={setTooltip3}
          />
        </div>
      </PreviewCard>

      {/* 18. Animation Control Section */}
      <PreviewCard
        title="Animation Control"
        description="Enable or disable transition animations with the animated prop. Useful for reduced motion preferences.

• animated: boolean - Enable/disable animations (default: true)"
        code={`<Checkbox
  label="Animated (default)"
  animated={true}
  defaultChecked
/>
<Checkbox
  label="No Animation"
  animated={false}
  defaultChecked
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="Animated (default)"
            animated={true}
            checked={animated1}
            onChange={setAnimated1}
          />
          <Checkbox
            label="No Animation"
            animated={false}
            checked={animated2}
            onChange={setAnimated2}
          />
        </div>
      </PreviewCard>

      {/* 19. Read-Only Section */}
      <PreviewCard
        title="Read-Only State"
        description="Use readOnly prop to display checkboxes that can't be modified. Unlike disabled, read-only maintains full visual styling.

• readOnly: boolean - Prevents user interaction while maintaining style"
        code={`<Checkbox
  label="Read-only Checked"
  readOnly
  defaultChecked
/>
<Checkbox
  label="Read-only Unchecked"
  readOnly
/>
<Checkbox
  label="Read-only Indeterminate"
  readOnly
  indeterminate
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="Read-only Checked"
            readOnly
            checked={true}
          />
          <Checkbox
            label="Read-only Unchecked"
            readOnly
            checked={false}
          />
          <Checkbox
            label="Read-only Indeterminate"
            readOnly
            indeterminate
          />
        </div>
      </PreviewCard>

      {/* 20. Custom Styling Section */}
      <PreviewCard
        title="Custom Styling"
        description="Apply custom styles using inline styles and className props for complete visual control.

• checkboxStyle: React.CSSProperties - Inline styles for checkbox
• labelStyle: React.CSSProperties - Inline styles for label
• containerClassName: string - Custom class for container
• checkboxClassName: string - Custom class for checkbox
• labelClassName: string - Custom class for label"
        code={`<Checkbox
  label="Custom Checkbox Style"
  checkboxStyle={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
  defaultChecked
/>
<Checkbox
  label="Custom Label Style"
  labelStyle={{ fontWeight: 700, fontStyle: 'italic' }}
/>
<Checkbox
  label="Custom Container"
  containerClassName="bg-gray-800 p-2 rounded"
  defaultChecked
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="Custom Checkbox Style"
            checkboxStyle={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}
            checked={customStyle1}
            onChange={setCustomStyle1}
          />
          <Checkbox
            label="Custom Label Style"
            labelStyle={{ fontWeight: 700, fontStyle: 'italic' }}
            checked={customStyle2}
            onChange={setCustomStyle2}
          />
          <Checkbox
            label="Custom Container"
            containerClassName="bg-gray-800 p-2 rounded"
            checked={customStyle3}
            onChange={setCustomStyle3}
          />
        </div>
      </PreviewCard>

      {/* 21. Focus Ring Customization Section */}
      <PreviewCard
        title="Focus Ring Customization"
        description="Customize focus ring appearance for keyboard navigation accessibility.

• showFocusRing: boolean - Toggle focus ring visibility (default: true)
• focusRingColor: string - Custom focus ring color
• focusRingWidth: string - Focus ring width (default: '1px')"
        code={`<Checkbox
  label="Default Focus Ring"
  showFocusRing={true}
/>
<Checkbox
  label="Custom Ring Color"
  focusRingColor="rgba(236, 72, 153, 0.5)"
  showFocusRing={true}
/>
<Checkbox
  label="Wide Ring"
  focusRingWidth="4px"
  focusRingColor="rgba(16, 185, 129, 0.5)"
/>
<Checkbox
  label="No Focus Ring"
  showFocusRing={false}
/>`}
      >
        <div className="checkbox-preview-row">
          <Checkbox
            label="Default Focus Ring"
            showFocusRing={true}
            checked={focusRing1}
            onChange={setFocusRing1}
          />
          <Checkbox
            label="Custom Ring Color"
            focusRingColor="rgba(236, 72, 153, 0.5)"
            showFocusRing={true}
            checked={focusRing2}
            onChange={setFocusRing2}
          />
          <Checkbox
            label="Wide Ring"
            focusRingWidth="4px"
            focusRingColor="rgba(16, 185, 129, 0.5)"
            checked={focusRing3}
            onChange={setFocusRing3}
          />
          <Checkbox
            label="No Focus Ring"
            showFocusRing={false}
            checked={focusRing4}
            onChange={setFocusRing4}
          />
        </div>
      </PreviewCard>

      {/* 22. Checkbox Group with Select All Section */}
      <PreviewCard
        title="Checkbox Group with Select All"
        description="Use showSelectAll prop to add a 'Select All' checkbox. Customize its label with selectAllLabel.

• showSelectAll: boolean - Show/hide 'Select All' option
• selectAllLabel: string - Custom label for select all (default: 'Select All')"
        code={`<CheckboxGroup
  label="Team Members"
  description="Select members to notify"
  showSelectAll
  selectAllLabel="Select All Members"
  options={[
    { label: "John Doe", value: "john" },
    { label: "Jane Smith", value: "jane" },
    { label: "Bob Wilson", value: "bob" },
    { label: "Alice Brown", value: "alice" },
  ]}
  defaultValue={["john", "jane"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Team Members"
            description="Select members to notify"
            showSelectAll
            selectAllLabel="Select All Members"
            options={[
              { label: "John Doe", value: "john" },
              { label: "Jane Smith", value: "jane" },
              { label: "Bob Wilson", value: "bob" },
              { label: "Alice Brown", value: "alice" },
            ]}
            defaultValue={["john", "jane"]}
          />
        </div>
      </PreviewCard>

      {/* 23. Selection Limits Section */}
      <PreviewCard
        title="Selection Limits"
        description="Control selection count with min and max constraints. Combined with helperText to show limits.

• minSelections: number - Minimum required selections
• maxSelections: number - Maximum allowed selections"
        code={`<CheckboxGroup
  label="Select Features"
  description="Choose 1 to 3 features for your plan"
  minSelections={1}
  maxSelections={3}
  helperText="Select between 1 and 3 options"
  options={[
    { label: "Analytics", value: "analytics" },
    { label: "Reporting", value: "reporting" },
    { label: "API Access", value: "api" },
    { label: "Support", value: "support" },
    { label: "Integrations", value: "integrations" },
  ]}
  defaultValue={["analytics"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Select Features"
            description="Choose 1 to 3 features for your plan"
            minSelections={1}
            maxSelections={3}
            helperText="Select between 1 and 3 options"
            options={[
              { label: "Analytics", value: "analytics" },
              { label: "Reporting", value: "reporting" },
              { label: "API Access", value: "api" },
              { label: "Support", value: "support" },
              { label: "Integrations", value: "integrations" },
            ]}
            defaultValue={["analytics"]}
          />
        </div>
      </PreviewCard>

      {/* 24. Checkbox Group with Tooltips Section */}
      <PreviewCard
        title="Checkbox Group with Tooltips"
        description="Add tooltips to individual options in CheckboxGroup by including tooltip property in the options array.

• options[].tooltip: string - Tooltip text for individual option"
        code={`<CheckboxGroup
  label="Permissions"
  options={[
    { 
      label: "Read", 
      value: "read", 
      tooltip: "View content only"
    },
    { 
      label: "Write", 
      value: "write", 
      tooltip: "Create and edit content"
    },
    { 
      label: "Delete", 
      value: "delete", 
      tooltip: "Remove content permanently"
    },
    { 
      label: "Admin", 
      value: "admin", 
      tooltip: "Full access to all features",
      disabled: true
    },
  ]}
  defaultValue={["read"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Permissions"
            options={[
              { 
                label: "Read", 
                value: "read", 
                tooltip: "View content only"
              },
              { 
                label: "Write", 
                value: "write", 
                tooltip: "Create and edit content"
              },
              { 
                label: "Delete", 
                value: "delete", 
                tooltip: "Remove content permanently"
              },
              { 
                label: "Admin", 
                value: "admin", 
                tooltip: "Full access to all features",
                disabled: true
              },
            ]}
            defaultValue={["read"]}
          />
        </div>
      </PreviewCard>

      {/* 25. Styled Checkbox Group Section */}
      <PreviewCard
        title="Styled Checkbox Group"
        description="Apply consistent styling across all checkboxes in a group using shared props.

• color: string - Background color when checked
• iconColor: string - Checkmark icon color
• borderRadius: CheckboxBorderRadius - Border radius for all checkboxes
• borderColor: string - Border color when unchecked
• hoverBorderColor: string - Border color on hover
• animated: boolean - Enable/disable animations"
        code={`<CheckboxGroup
  label="Premium Features"
  color="#8B5CF6"
  iconColor="#FFFFFF"
  borderRadius="lg"
  animated={true}
  borderColor="#8B5CF6"
  hoverBorderColor="#7C3AED"
  options={[
    { label: "Priority Support", value: "support" },
    { label: "Custom Domains", value: "domains" },
    { label: "Advanced Analytics", value: "analytics" },
  ]}
  defaultValue={["support"]}
/>`}
      >
        <div className="checkbox-preview-center">
          <CheckboxGroup
            label="Premium Features"
            color="#8B5CF6"
            iconColor="#FFFFFF"
            borderRadius="lg"
            animated={true}
            borderColor="#8B5CF6"
            hoverBorderColor="#7C3AED"
            options={[
              { label: "Priority Support", value: "support" },
              { label: "Custom Domains", value: "domains" },
              { label: "Advanced Analytics", value: "analytics" },
            ]}
            defaultValue={["support"]}
          />
        </div>
      </PreviewCard>
    </div>
    </>
  );
}

/**
 * PreviewCard Component
 * Wraps each checkbox variant section with title, description, and preview area
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
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
      {/* Header */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <h3 
          style={{ 
            fontFamily: "Manrope, sans-serif",
            fontSize: "20px",
            fontWeight: 600,
            lineHeight: 1.2,
            color: "#FFFFFF",
            margin: 0
          }}
        >
          {title}
        </h3>
        <p 
          style={{ 
            fontFamily: "Manrope, sans-serif",
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: 1.6,
            color: "#D1D5DC",
            margin: 0,
            whiteSpace: "pre-wrap"
          }}
        >
          {description}
        </p>
      </div>

      {/* Preview Container */}
      <div 
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          border: "1px solid #364153",
          borderRadius: "16px",
          padding: "12px",
          minHeight: "266px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden"
        }}
      >
        {/* Toggle Controls - Top Right */}
        <div 
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            display: "flex",
            gap: "8px",
            alignItems: "center",
            zIndex: 10
          }}
        >
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            style={{
              background: "transparent",
              border: "1px solid #364153",
              borderRadius: "8px",
              padding: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
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
          <div 
            style={{
              border: "1px solid #364153",
              borderRadius: "8px",
              display: "flex",
              overflow: "hidden"
            }}
          >
            <button
              onClick={() => setActiveTab("preview")}
              style={{
                background: activeTab === "preview" ? "#242424" : "transparent",
                border: activeTab === "preview" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "preview" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              style={{
                background: activeTab === "code" ? "#242424" : "transparent",
                border: activeTab === "code" ? "1px solid #364153" : "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                color: activeTab === "code" ? "#FFFFFF" : "#A1A1A1",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "preview" ? (
          <div style={{ zIndex: 1, width: "100%", display: "flex", justifyContent: "center" }}>
            {children}
          </div>
        ) : (
          <div 
            style={{
              width: "100%",
              padding: "40px 12px 12px 12px",
              overflow: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "16px",
                background: "#1a1a1a",
                borderRadius: "8px",
                height: "100%",
                overflow: "auto",
                fontFamily: "'Cascadia Code', 'Fira Code', monospace",
                fontSize: "13px",
                lineHeight: 1.5,
                color: "#e0e0e0",
                scrollbarWidth: "none",
                msOverflowStyle: "none"
              }}
              className="hide-scrollbar"
            >
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
