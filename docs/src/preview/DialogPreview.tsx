import { useState } from "react";
import { Dialog } from "../../../src/components/dialog/BeeDialog";

interface PropDefinition {
  name: string;
  type: string;
  defaultValue: string;
  description: string;
}

const propDefinitions: PropDefinition[] = [
  { name: "open", type: "boolean", defaultValue: "-", description: "Controls whether the dialog is visible (required)." },
  { name: "onClose", type: "() => void", defaultValue: "-", description: "Callback fired when the dialog should be closed (required)." },
  { name: "title", type: "ReactNode", defaultValue: "-", description: "Title displayed in the dialog header." },
  { name: "description", type: "ReactNode", defaultValue: "-", description: "Subtitle text displayed below the title." },
  { name: "children", type: "ReactNode", defaultValue: "-", description: "Dialog content (required)." },
  { name: "actions", type: "ReactNode", defaultValue: "-", description: "Action buttons displayed in the dialog footer." },
  { name: "size", type: "'xs' | 'small' | 'medium' | 'large' | 'xl' | 'full'", defaultValue: "'medium'", description: "Size of the dialog." },
  { name: "position", type: "'center' | 'top' | 'bottom'", defaultValue: "'center'", description: "Position of the dialog on screen." },
  { name: "animation", type: "'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none'", defaultValue: "'scale'", description: "Animation type for entrance/exit." },
  { name: "animationDuration", type: "number", defaultValue: "300", description: "Animation duration in milliseconds." },
  { name: "closeOnBackdropClick", type: "boolean", defaultValue: "true", description: "Whether clicking the backdrop closes the dialog." },
  { name: "closeOnEscape", type: "boolean", defaultValue: "true", description: "Whether pressing Escape key closes the dialog." },
  { name: "showCloseButton", type: "boolean", defaultValue: "true", description: "Whether to show the close button in the header." },
  { name: "closeIcon", type: "ReactNode", defaultValue: "-", description: "Custom icon for the close button." },
  { name: "icon", type: "ReactNode", defaultValue: "-", description: "Icon displayed before the title." },
  { name: "iconColor", type: "string", defaultValue: "-", description: "Color for the title icon (CSS color value)." },
  { name: "blurBackdrop", type: "boolean", defaultValue: "true", description: "Whether to apply blur effect to the backdrop." },
  { name: "backdropColor", type: "string", defaultValue: "-", description: "Custom backdrop color (CSS color value)." },
  { name: "backdropClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the backdrop." },
  { name: "preventScroll", type: "boolean", defaultValue: "true", description: "Whether to prevent body scroll when dialog is open." },
  { name: "scrollable", type: "boolean", defaultValue: "true", description: "Whether the content area should be scrollable." },
  { name: "maxHeight", type: "string", defaultValue: "-", description: "Custom max height for the dialog (CSS value)." },
  { name: "minHeight", type: "string", defaultValue: "-", description: "Custom min height for the dialog (CSS value)." },
  { name: "width", type: "string", defaultValue: "-", description: "Custom width for the dialog (CSS value, overrides size)." },
  { name: "borderRadius", type: "string", defaultValue: "-", description: "Custom border radius for the dialog (CSS value)." },
  { name: "contentPadding", type: "string", defaultValue: "-", description: "Custom padding for dialog content (CSS value)." },
  { name: "showHeaderDivider", type: "boolean", defaultValue: "true", description: "Whether to show a divider between header and content." },
  { name: "showFooterDivider", type: "boolean", defaultValue: "true", description: "Whether to show a divider between content and footer." },
  { name: "footerAlign", type: "'left' | 'center' | 'right' | 'space-between'", defaultValue: "'right'", description: "Alignment of action buttons in the footer." },
  { name: "fullscreenOnMobile", type: "boolean", defaultValue: "false", description: "Whether the dialog should be fullscreen on mobile devices." },
  { name: "zIndex", type: "number", defaultValue: "9999", description: "Z-index for the dialog overlay." },
  { name: "trapFocus", type: "boolean", defaultValue: "true", description: "Whether to trap focus within the dialog." },
  { name: "restoreFocus", type: "boolean", defaultValue: "true", description: "Whether to restore focus to trigger element on close." },
  { name: "initialFocus", type: "string", defaultValue: "-", description: "CSS selector for the element to focus when dialog opens." },
  { name: "onAfterOpen", type: "() => void", defaultValue: "-", description: "Callback fired after the dialog has finished opening animation." },
  { name: "onAfterClose", type: "() => void", defaultValue: "-", description: "Callback fired after the dialog has finished closing animation." },
  { name: "className", type: "string", defaultValue: "-", description: "Additional CSS classes for the dialog container." },
  { name: "headerClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the header." },
  { name: "contentClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the content area." },
  { name: "footerClassName", type: "string", defaultValue: "-", description: "Additional CSS classes for the footer." },
  { name: "style", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for the dialog." },
  { name: "headerStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for the header." },
  { name: "contentStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for the content area." },
  { name: "footerStyle", type: "React.CSSProperties", defaultValue: "-", description: "Custom inline styles for the footer." },
  { name: "aria-label", type: "string", defaultValue: "-", description: "Accessible label for the dialog." },
  { name: "aria-describedby", type: "string", defaultValue: "-", description: "ID of element that describes the dialog." },
  { name: "data-testid", type: "string", defaultValue: "-", description: "Test ID for automated testing." },
];

/**
 * DialogPreview Component
 * Displays all dialog variants showcasing comprehensive customization options
 */
export function DialogPreview() {
  const [dialogStates, setDialogStates] = useState({
    basic: false,
    withActions: false,
    xs: false,
    small: false,
    medium: false,
    large: false,
    xl: false,
    full: false,
    noTitle: false,
    confirmDialog: false,
    formDialog: false,
    scrollableContent: false,
    successDialog: false,
    errorDialog: false,
    warningDialog: false,
    infoDialog: false,
    positionTop: false,
    positionBottom: false,
    animationFade: false,
    animationSlideUp: false,
    animationSlideDown: false,
    animationNone: false,
    customBackdrop: false,
    noBackdropClose: false,
    withDescription: false,
    withIcon: false,
    footerAlignment: false,
    customStyling: false,
    fullscreenMobile: false,
    customCloseIcon: false,
  });

  const openDialog = (type: keyof typeof dialogStates) => {
    setDialogStates(prev => ({ ...prev, [type]: true }));
  };

  const closeDialog = (type: keyof typeof dialogStates) => {
    setDialogStates(prev => ({ ...prev, [type]: false }));
  };

  return (
    <>
      <style>{`
        .dialog-preview-container {
          display: flex;
          flex-direction: column;
          gap: 44px;
          width: 100%;
        }

        .dialog-preview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 12px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .dialog-preview-row {
          display: flex;
          gap: 12px;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }

        .dialog-btn {
          padding: 12px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          min-width: 140px;
        }

        .dialog-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .dialog-btn-primary {
          background: #FFCB00;
          color: #000;
        }

        .dialog-btn-secondary {
          background: #3B82F6;
          color: #fff;
        }

        .dialog-btn-success {
          background: #10B981;
          color: #fff;
        }

        .dialog-btn-error {
          background: #EF4444;
          color: #fff;
        }

        .dialog-btn-warning {
          background: #F59E0B;
          color: #000;
        }

        .dialog-btn-info {
          background: #06B6D4;
          color: #fff;
        }

        .dialog-btn-purple {
          background: #8B5CF6;
          color: #fff;
        }

        .dialog-btn-gray {
          background: #6B7280;
          color: #fff;
        }

        .dialog-btn-outline {
          background: transparent;
          color: #D1D5DC;
          border: 1px solid #4B5563;
        }

        .dialog-btn-outline:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .dialog-status-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .dialog-status-icon svg {
          width: 24px;
          height: 24px;
        }

        .dialog-status-success {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
        }

        .dialog-status-error {
          background: rgba(239, 68, 68, 0.15);
          color: #EF4444;
        }

        .dialog-status-warning {
          background: rgba(245, 158, 11, 0.15);
          color: #F59E0B;
        }

        .dialog-status-info {
          background: rgba(6, 182, 212, 0.15);
          color: #06B6D4;
        }

        /* Mobile responsive */
        @media (max-width: 480px) {
          .dialog-preview-container {
            gap: 28px;
          }

          .dialog-preview-grid {
            grid-template-columns: 1fr;
          }

          .dialog-btn {
            width: 100%;
            min-width: unset;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .dialog-preview-container {
            gap: 32px;
          }

          .dialog-preview-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div className="dialog-preview-container">
        {/* 1. Basic Dialog Section */}
        <PreviewCard
          title="Basic Dialog"
          description="Simple dialog with title, content, and close functionality. Use open (boolean) and onClose (() => void) for controlled behavior. Features backdrop blur, Escape key handling, and focus management."
          code={`import { Dialog } from "andhera-react";
import { useState } from "react";

export function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Basic Dialog"
      >
        <p>Dialog content goes here. Close with X, Escape, or backdrop click.</p>
      </Dialog>
    </>
  );
}`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('basic')}>
              Open Basic Dialog
            </button>
          </div>
          
          <Dialog
            open={dialogStates.basic}
            onClose={() => closeDialog('basic')}
            title="Basic Dialog"
          >
            <p className="text-gray-300 leading-relaxed m-0">
              This is a basic dialog with some content. You can close it by clicking the X button, 
              pressing Escape, or clicking outside the dialog.
            </p>
          </Dialog>
        </PreviewCard>

        {/* 2. Dialog with Actions Section */}
        <PreviewCard
          title="Dialog with Actions"
          description="Dialog with action buttons in the footer. Use the actions prop (ReactNode) to add buttons. Perfect for confirmations and forms requiring user decisions."
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Save Changes"
  actions={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  }
>
  <p>Do you want to save your changes?</p>
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('withActions')}>
              Open Dialog with Actions
            </button>
          </div>
          
          <Dialog
            open={dialogStates.withActions}
            onClose={() => closeDialog('withActions')}
            title="Save Changes"
            actions={
              <>
                <button
                  onClick={() => closeDialog('withActions')}
                  className="px-4 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-lg cursor-pointer text-sm hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => closeDialog('withActions')}
                  className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-yellow-400 transition-colors"
                >
                  Save Changes
                </button>
              </>
            }
          >
            <p className="text-gray-300 leading-relaxed m-0">
              Do you want to save your changes before closing? Any unsaved changes will be lost.
            </p>
          </Dialog>
        </PreviewCard>

        {/* 3. Dialog Sizes Section */}
        <PreviewCard
          title="Dialog Sizes"
          description="Six size options via the size prop. DialogSize type: 'xs' | 'small' | 'medium' | 'large' | 'xl' | 'full'. Default is 'medium'."
          code={`<Dialog size="xs" ... />    {/* max-w-xs */}
<Dialog size="small" ... />  {/* max-w-sm */}
<Dialog size="medium" ... /> {/* max-w-md (default) */}
<Dialog size="large" ... />  {/* max-w-2xl */}
<Dialog size="xl" ... />     {/* max-w-4xl */}
<Dialog size="full" ... />   {/* max-w-[95vw] */}`}
        >
          <div className="dialog-preview-grid">
            <button className="dialog-btn dialog-btn-gray" onClick={() => openDialog('xs')}>
              XS Dialog
            </button>
            <button className="dialog-btn dialog-btn-success" onClick={() => openDialog('small')}>
              Small
            </button>
            <button className="dialog-btn dialog-btn-warning" onClick={() => openDialog('medium')}>
              Medium
            </button>
            <button className="dialog-btn dialog-btn-purple" onClick={() => openDialog('large')}>
              Large
            </button>
            <button className="dialog-btn dialog-btn-info" onClick={() => openDialog('xl')}>
              XL Dialog
            </button>
            <button className="dialog-btn dialog-btn-secondary" onClick={() => openDialog('full')}>
              Full Width
            </button>
          </div>
          
          <Dialog open={dialogStates.xs} onClose={() => closeDialog('xs')} title="Extra Small Dialog" size="xs">
            <p className="text-gray-300 text-sm m-0">Compact dialog for simple messages.</p>
          </Dialog>

          <Dialog open={dialogStates.small} onClose={() => closeDialog('small')} title="Small Dialog" size="small">
            <p className="text-gray-300 m-0">Small dialog for quick confirmations and simple content.</p>
          </Dialog>

          <Dialog open={dialogStates.medium} onClose={() => closeDialog('medium')} title="Medium Dialog" size="medium">
            <p className="text-gray-300 m-0">Medium dialog (default) for standard content and forms.</p>
          </Dialog>

          <Dialog open={dialogStates.large} onClose={() => closeDialog('large')} title="Large Dialog" size="large">
            <p className="text-gray-300 m-0 mb-3">Large dialog for complex content and detailed forms.</p>
            <p className="text-gray-400 text-sm m-0">Perfect for multi-step wizards and rich content presentations.</p>
          </Dialog>

          <Dialog open={dialogStates.xl} onClose={() => closeDialog('xl')} title="Extra Large Dialog" size="xl">
            <p className="text-gray-300 m-0 mb-3">Extra large dialog for extensive content, data tables, or embedded applications.</p>
            <p className="text-gray-400 text-sm m-0">Use sparingly when you need maximum content space.</p>
          </Dialog>

          <Dialog open={dialogStates.full} onClose={() => closeDialog('full')} title="Full Width Dialog" size="full">
            <p className="text-gray-300 m-0 mb-3">Full width dialog spans nearly the entire viewport.</p>
            <p className="text-gray-400 text-sm m-0">Best for dashboards, reports, or complex multi-panel layouts.</p>
          </Dialog>
        </PreviewCard>

        {/* 4. Dialog Position Section */}
        <PreviewCard
          title="Dialog Position"
          description="Control dialog placement with the position prop. DialogPosition type: 'center' | 'top' | 'bottom'. Default is 'center'."
          code={`<Dialog position="center" ... /> {/* Center of screen (default) */}
<Dialog position="top" ... />    {/* Near top with padding */}
<Dialog position="bottom" ... /> {/* Near bottom with padding */}`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('basic')}>
              Center (Default)
            </button>
            <button className="dialog-btn dialog-btn-secondary" onClick={() => openDialog('positionTop')}>
              Top Position
            </button>
            <button className="dialog-btn dialog-btn-purple" onClick={() => openDialog('positionBottom')}>
              Bottom Position
            </button>
          </div>
          
          <Dialog open={dialogStates.positionTop} onClose={() => closeDialog('positionTop')} title="Top Positioned Dialog" position="top" size="small">
            <p className="text-gray-300 m-0">This dialog appears near the top of the viewport.</p>
          </Dialog>

          <Dialog open={dialogStates.positionBottom} onClose={() => closeDialog('positionBottom')} title="Bottom Positioned Dialog" position="bottom" size="small">
            <p className="text-gray-300 m-0">This dialog appears near the bottom of the viewport.</p>
          </Dialog>
        </PreviewCard>

        {/* 5. Animation Types Section */}
        <PreviewCard
          title="Animation Types"
          description="Choose entrance/exit animations with the animation prop. DialogAnimation type: 'fade' | 'scale' | 'slide-up' | 'slide-down' | 'none'. Use animationDuration (number, ms) to control speed. Default: 'scale', 300ms."
          code={`<Dialog animation="fade" animationDuration={300} ... />
<Dialog animation="scale" ... />      {/* Default */}
<Dialog animation="slide-up" ... />
<Dialog animation="slide-down" ... />
<Dialog animation="none" ... />       {/* Instant */}`}
        >
          <div className="dialog-preview-grid">
            <button className="dialog-btn dialog-btn-success" onClick={() => openDialog('animationFade')}>
              Fade
            </button>
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('basic')}>
              Scale (Default)
            </button>
            <button className="dialog-btn dialog-btn-secondary" onClick={() => openDialog('animationSlideUp')}>
              Slide Up
            </button>
            <button className="dialog-btn dialog-btn-purple" onClick={() => openDialog('animationSlideDown')}>
              Slide Down
            </button>
            <button className="dialog-btn dialog-btn-gray" onClick={() => openDialog('animationNone')}>
              No Animation
            </button>
          </div>
          
          <Dialog open={dialogStates.animationFade} onClose={() => closeDialog('animationFade')} title="Fade Animation" animation="fade" size="small">
            <p className="text-gray-300 m-0">This dialog fades in and out smoothly.</p>
          </Dialog>

          <Dialog open={dialogStates.animationSlideUp} onClose={() => closeDialog('animationSlideUp')} title="Slide Up Animation" animation="slide-up" size="small">
            <p className="text-gray-300 m-0">This dialog slides up from below.</p>
          </Dialog>

          <Dialog open={dialogStates.animationSlideDown} onClose={() => closeDialog('animationSlideDown')} title="Slide Down Animation" animation="slide-down" size="small">
            <p className="text-gray-300 m-0">This dialog slides down from above.</p>
          </Dialog>

          <Dialog open={dialogStates.animationNone} onClose={() => closeDialog('animationNone')} title="No Animation" animation="none" size="small">
            <p className="text-gray-300 m-0">This dialog appears instantly without animation.</p>
          </Dialog>
        </PreviewCard>

        {/* 6. Dialog with Title & Description Section */}
        <PreviewCard
          title="Title with Description"
          description="Add a subtitle using the description prop (ReactNode). Also supports icon prop (ReactNode) with iconColor (string) for visual emphasis."
          code={`<Dialog
  title="Account Settings"
  description="Manage your account preferences and security options"
  icon={<SettingsIcon />}
  iconColor="#FFCB00"
  ...
>
  {/* Content */}
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('withDescription')}>
              With Description
            </button>
            <button className="dialog-btn dialog-btn-secondary" onClick={() => openDialog('withIcon')}>
              With Icon
            </button>
          </div>
          
          <Dialog
            open={dialogStates.withDescription}
            onClose={() => closeDialog('withDescription')}
            title="Account Settings"
            description="Manage your account preferences, security options, and notification settings"
          >
            <p className="text-gray-300 m-0">Your settings content would go here with various options and controls.</p>
          </Dialog>

          <Dialog
            open={dialogStates.withIcon}
            onClose={() => closeDialog('withIcon')}
            title="Security Alert"
            description="We detected unusual activity on your account"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            iconColor="#F59E0B"
          >
            <p className="text-gray-300 m-0">Please review your recent account activity and verify your identity.</p>
          </Dialog>
        </PreviewCard>

        {/* 7. Status Dialogs Section */}
        <PreviewCard
          title="Status Dialogs"
          description="Use icons and colors to create success, error, warning, and info dialogs. Combine icon, iconColor, and custom styling for visual feedback."
          code={`// Success Dialog
<Dialog
  title="Success!"
  icon={<CheckIcon />}
  iconColor="#10B981"
  ...
/>

// Error Dialog  
<Dialog
  title="Error"
  icon={<XIcon />}
  iconColor="#EF4444"
  ...
/>`}
        >
          <div className="dialog-preview-grid">
            <button className="dialog-btn dialog-btn-success" onClick={() => openDialog('successDialog')}>
              Success
            </button>
            <button className="dialog-btn dialog-btn-error" onClick={() => openDialog('errorDialog')}>
              Error
            </button>
            <button className="dialog-btn dialog-btn-warning" onClick={() => openDialog('warningDialog')}>
              Warning
            </button>
            <button className="dialog-btn dialog-btn-info" onClick={() => openDialog('infoDialog')}>
              Info
            </button>
          </div>
          
          {/* Success Dialog */}
          <Dialog
            open={dialogStates.successDialog}
            onClose={() => closeDialog('successDialog')}
            title="Payment Successful"
            size="small"
            actions={
              <button onClick={() => closeDialog('successDialog')} className="px-4 py-2 bg-emerald-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium w-full hover:bg-emerald-500 transition-colors">
                Continue
              </button>
            }
          >
            <div className="text-center">
              <div className="dialog-status-icon dialog-status-success">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-300 m-0">Your payment of $99.00 has been processed successfully.</p>
            </div>
          </Dialog>

          {/* Error Dialog */}
          <Dialog
            open={dialogStates.errorDialog}
            onClose={() => closeDialog('errorDialog')}
            title="Payment Failed"
            size="small"
            actions={
              <button onClick={() => closeDialog('errorDialog')} className="px-4 py-2 bg-red-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium w-full hover:bg-red-500 transition-colors">
                Try Again
              </button>
            }
          >
            <div className="text-center">
              <div className="dialog-status-icon dialog-status-error">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <p className="text-gray-300 m-0">Your card was declined. Please check your details and try again.</p>
            </div>
          </Dialog>

          {/* Warning Dialog */}
          <Dialog
            open={dialogStates.warningDialog}
            onClose={() => closeDialog('warningDialog')}
            title="Session Expiring"
            size="small"
            actions={
              <>
                <button onClick={() => closeDialog('warningDialog')} className="px-4 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-lg cursor-pointer text-sm hover:bg-gray-800 transition-colors flex-1">
                  Logout
                </button>
                <button onClick={() => closeDialog('warningDialog')} className="px-4 py-2 bg-amber-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium flex-1 hover:bg-amber-500 transition-colors">
                  Stay Logged In
                </button>
              </>
            }
          >
            <div className="text-center">
              <div className="dialog-status-icon dialog-status-warning">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-300 m-0">Your session will expire in 5 minutes due to inactivity.</p>
            </div>
          </Dialog>

          {/* Info Dialog */}
          <Dialog
            open={dialogStates.infoDialog}
            onClose={() => closeDialog('infoDialog')}
            title="New Feature Available"
            size="small"
            actions={
              <button onClick={() => closeDialog('infoDialog')} className="px-4 py-2 bg-cyan-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium w-full hover:bg-cyan-500 transition-colors">
                Learn More
              </button>
            }
          >
            <div className="text-center">
              <div className="dialog-status-icon dialog-status-info">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-300 m-0">Check out our new dark mode feature! Customize your experience.</p>
            </div>
          </Dialog>
        </PreviewCard>

        {/* 8. Confirmation Dialog Section */}
        <PreviewCard
          title="Confirmation Dialog"
          description="Common confirmation pattern for destructive actions. Use with variant-colored buttons to indicate action severity."
          code={`<Dialog
  title="Confirm Delete"
  actions={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button onClick={handleDelete} style={{ background: "#EF4444" }}>
        Delete
      </button>
    </>
  }
>
  <p>Are you sure? This action cannot be undone.</p>
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-error" onClick={() => openDialog('confirmDialog')}>
              Delete Item
            </button>
          </div>
          
          <Dialog
            open={dialogStates.confirmDialog}
            onClose={() => closeDialog('confirmDialog')}
            title="Confirm Delete"
            actions={
              <>
                <button onClick={() => closeDialog('confirmDialog')} className="px-4 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-lg cursor-pointer text-sm hover:bg-gray-800 transition-colors">
                  Cancel
                </button>
                <button onClick={() => closeDialog('confirmDialog')} className="px-4 py-2 bg-red-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-red-500 transition-colors">
                  Delete Permanently
                </button>
              </>
            }
          >
            <div>
              <p className="text-gray-300 leading-relaxed m-0 mb-3">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>
              <div className="bg-red-900/50 border border-red-600/50 rounded-lg p-3">
                <p className="text-red-200 text-sm m-0 flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  This will permanently remove all associated data.
                </p>
              </div>
            </div>
          </Dialog>
        </PreviewCard>

        {/* 9. Form Dialog Section */}
        <PreviewCard
          title="Form Dialog"
          description="Dialog containing form elements. Use with actions for submit/cancel buttons. Set scrollable={true} (default) for long forms."
          code={`<Dialog
  title="Add New User"
  size="medium"
  actions={
    <>
      <button onClick={() => setOpen(false)}>Cancel</button>
      <button type="submit" form="user-form">Add User</button>
    </>
  }
>
  <form id="user-form" onSubmit={handleSubmit}>
    <input type="text" placeholder="Name" />
    <input type="email" placeholder="Email" />
  </form>
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('formDialog')}>
              Add New User
            </button>
          </div>
          
          <Dialog
            open={dialogStates.formDialog}
            onClose={() => closeDialog('formDialog')}
            title="Add New User"
            description="Fill in the details below to create a new user account"
            size="medium"
            actions={
              <>
                <button onClick={() => closeDialog('formDialog')} className="px-4 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-lg cursor-pointer text-sm hover:bg-gray-800 transition-colors">
                  Cancel
                </button>
                <button onClick={() => closeDialog('formDialog')} className="px-4 py-2 bg-emerald-600 text-white border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-emerald-500 transition-colors">
                  Add User
                </button>
              </>
            }
          >
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-1.5 text-gray-200 text-sm font-medium">Full Name *</label>
                <input type="text" placeholder="Enter full name" className="w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-[#FFCB00] transition-colors" />
              </div>
              <div>
                <label className="block mb-1.5 text-gray-200 text-sm font-medium">Email Address *</label>
                <input type="email" placeholder="Enter email address" className="w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-[#FFCB00] transition-colors" />
              </div>
              <div>
                <label className="block mb-1.5 text-gray-200 text-sm font-medium">Role</label>
                <select className="w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-[#FFCB00] transition-colors">
                  <option>Select a role</option>
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div>
                <label className="block mb-1.5 text-gray-200 text-sm font-medium">Department</label>
                <select className="w-full px-3 py-2.5 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-[#FFCB00] transition-colors">
                  <option>Select department</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </Dialog>
        </PreviewCard>

        {/* 10. Scrollable Content Section */}
        <PreviewCard
          title="Scrollable Content"
          description="For long content, use scrollable={true} (default) with optional maxHeight prop (string, CSS value). Content area scrolls while header/footer stay fixed."
          code={`<Dialog
  title="Terms & Conditions"
  scrollable={true}
  maxHeight="500px"
  size="large"
  ...
>
  <div>
    {/* Long scrollable content */}
  </div>
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('scrollableContent')}>
              View Terms & Conditions
            </button>
          </div>
          
          <Dialog
            open={dialogStates.scrollableContent}
            onClose={() => closeDialog('scrollableContent')}
            title="Terms & Conditions"
            description="Please read carefully before proceeding"
            size="large"
            actions={
              <button onClick={() => closeDialog('scrollableContent')} className="px-6 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium hover:bg-yellow-400 transition-colors">
                I Accept
              </button>
            }
          >
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-4">
              <section>
                <h3 className="text-white mt-0 mb-2 text-base font-semibold">1. Introduction</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  Welcome to our application. These terms and conditions outline the rules and regulations 
                  for the use of our software and services. By accessing this application, we assume you 
                  accept these terms and conditions in full.
                </p>
              </section>
              
              <section>
                <h3 className="text-white mb-2 text-base font-semibold">2. User Agreement</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  By using our application, you agree to be bound by these terms. If you do not agree 
                  with any part of these terms, then you should not use our application.
                </p>
              </section>
              
              <section>
                <h3 className="text-white mb-2 text-base font-semibold">3. Privacy Policy</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  Your privacy is important to us. Our Privacy Policy explains how we collect, use, and 
                  protect your information when you use our application.
                </p>
              </section>
              
              <section>
                <h3 className="text-white mb-2 text-base font-semibold">4. Data Usage</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  We collect and use your data to provide and improve our services. This includes 
                  information you provide directly and data collected automatically through your use.
                </p>
              </section>
              
              <section>
                <h3 className="text-white mb-2 text-base font-semibold">5. Limitations</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  In no event shall our company be liable for any indirect, incidental, special, 
                  consequential, or punitive damages arising out of your use of the application.
                </p>
              </section>
              
              <section>
                <h3 className="text-white mb-2 text-base font-semibold">6. Updates</h3>
                <p className="text-gray-400 leading-relaxed m-0 text-sm">
                  We reserve the right to update these terms at any time. Users will be notified of 
                  any significant changes via email or through the application interface.
                </p>
              </section>
            </div>
          </Dialog>
        </PreviewCard>

        {/* 11. Backdrop Customization Section */}
        <PreviewCard
          title="Backdrop Customization"
          description="Customize backdrop with backdropColor (string, CSS), blurBackdrop (boolean), and closeOnBackdropClick (boolean). Default: blur enabled, backdrop click closes."
          code={`<Dialog
  backdropColor="rgba(0, 0, 100, 0.7)"
  blurBackdrop={false}
  closeOnBackdropClick={false}
  ...
/>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-secondary" onClick={() => openDialog('customBackdrop')}>
              Custom Backdrop Color
            </button>
            <button className="dialog-btn dialog-btn-outline" onClick={() => openDialog('noBackdropClose')}>
              No Backdrop Close
            </button>
          </div>
          
          <Dialog
            open={dialogStates.customBackdrop}
            onClose={() => closeDialog('customBackdrop')}
            title="Custom Backdrop"
            backdropColor="rgba(79, 70, 229, 0.4)"
            blurBackdrop={true}
            size="small"
          >
            <p className="text-gray-300 m-0">This dialog has a custom purple-tinted backdrop.</p>
          </Dialog>

          <Dialog
            open={dialogStates.noBackdropClose}
            onClose={() => closeDialog('noBackdropClose')}
            title="Modal Dialog"
            description="Click outside doesn't close - use X or Escape"
            closeOnBackdropClick={false}
            size="small"
            actions={
              <button onClick={() => closeDialog('noBackdropClose')} className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium">
                Got it
              </button>
            }
          >
            <p className="text-gray-300 m-0">Clicking outside won't close this dialog. Use the close button or press Escape.</p>
          </Dialog>
        </PreviewCard>

        {/* 12. Footer Alignment Section */}
        <PreviewCard
          title="Footer Alignment"
          description="Control action button alignment with footerAlign prop: 'left' | 'center' | 'right' | 'space-between'. Default is 'right'."
          code={`<Dialog footerAlign="left" ... />
<Dialog footerAlign="center" ... />
<Dialog footerAlign="right" ... />        {/* Default */}
<Dialog footerAlign="space-between" ... />`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('footerAlignment')}>
              Footer Alignment Demo
            </button>
          </div>
          
          <Dialog
            open={dialogStates.footerAlignment}
            onClose={() => closeDialog('footerAlignment')}
            title="Footer Alignment"
            footerAlign="space-between"
            actions={
              <>
                <button onClick={() => closeDialog('footerAlignment')} className="px-4 py-2 text-red-400 bg-transparent border-none cursor-pointer text-sm hover:text-red-300 transition-colors">
                  Delete
                </button>
                <div className="flex gap-2">
                  <button onClick={() => closeDialog('footerAlignment')} className="px-4 py-2 bg-transparent text-gray-400 border border-gray-600 rounded-lg cursor-pointer text-sm hover:bg-gray-800 transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => closeDialog('footerAlignment')} className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium">
                    Save
                  </button>
                </div>
              </>
            }
          >
            <p className="text-gray-300 m-0">This dialog uses <code className="bg-gray-800 px-1.5 py-0.5 rounded text-[#FFCB00] text-sm">footerAlign="space-between"</code> to place the delete action on the left and save/cancel on the right.</p>
          </Dialog>
        </PreviewCard>

        {/* 13. Hide Header/Footer Dividers Section */}
        <PreviewCard
          title="Header & Footer Dividers"
          description="Toggle divider lines with showHeaderDivider (boolean) and showFooterDivider (boolean). Both default to true."
          code={`<Dialog
  showHeaderDivider={false}
  showFooterDivider={false}
  ...
/>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('customStyling')}>
              No Dividers
            </button>
          </div>
          
          <Dialog
            open={dialogStates.customStyling}
            onClose={() => closeDialog('customStyling')}
            title="Clean Design"
            showHeaderDivider={false}
            showFooterDivider={false}
            size="small"
            actions={
              <button onClick={() => closeDialog('customStyling')} className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium">
                Continue
              </button>
            }
          >
            <p className="text-gray-300 m-0">This dialog has a cleaner look without header and footer divider lines.</p>
          </Dialog>
        </PreviewCard>

        {/* 14. Dialog without Title Section */}
        <PreviewCard
          title="Dialog without Title"
          description="Omit the title prop for minimal dialogs. Set showCloseButton={false} to hide the close button. Useful for custom headers or content-only modals."
          code={`<Dialog
  open={open}
  onClose={() => setOpen(false)}
  showCloseButton={false}
>
  <div className="text-center">
    <h3>Custom Header</h3>
    <p>Full control over content layout</p>
  </div>
</Dialog>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('noTitle')}>
              Open Minimal Dialog
            </button>
          </div>
          
          <Dialog
            open={dialogStates.noTitle}
            onClose={() => closeDialog('noTitle')}
            showCloseButton={false}
            size="small"
            actions={
              <button onClick={() => closeDialog('noTitle')} className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium w-full">
                Got it
              </button>
            }
          >
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold m-0 mb-2">Quick Tip!</h3>
              <p className="text-gray-400 m-0 text-sm">Press Escape to close any dialog at any time.</p>
            </div>
          </Dialog>
        </PreviewCard>

        {/* 15. Fullscreen on Mobile Section */}
        <PreviewCard
          title="Fullscreen on Mobile"
          description="Set fullscreenOnMobile={true} to make the dialog fill the screen on smaller devices while maintaining normal behavior on desktop."
          code={`<Dialog
  fullscreenOnMobile={true}
  ...
/>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('fullscreenMobile')}>
              Mobile Fullscreen Demo
            </button>
          </div>
          
          <Dialog
            open={dialogStates.fullscreenMobile}
            onClose={() => closeDialog('fullscreenMobile')}
            title="Mobile Optimized"
            description="Resize your browser to see the fullscreen effect on mobile"
            fullscreenOnMobile={true}
            actions={
              <button onClick={() => closeDialog('fullscreenMobile')} className="px-4 py-2 bg-[#FFCB00] text-black border-none rounded-lg cursor-pointer text-sm font-medium w-full sm:w-auto hover:bg-yellow-400 transition-colors">
                Close
              </button>
            }
          >
            <p className="text-gray-300 m-0">On mobile devices (narrow viewports), this dialog will take up the full screen for better usability. On desktop, it behaves normally.</p>
          </Dialog>
        </PreviewCard>

        {/* 16. Custom Close Icon Section */}
        <PreviewCard
          title="Custom Close Icon"
          description="Replace the default close button icon with closeIcon prop (ReactNode). Or hide it completely with showCloseButton={false}."
          code={`<Dialog
  closeIcon={
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M19 6.41L17.59 5 12 10.59 ..." fill="currentColor"/>
    </svg>
  }
  ...
/>`}
        >
          <div className="dialog-preview-row">
            <button className="dialog-btn dialog-btn-primary" onClick={() => openDialog('customCloseIcon')}>
              Custom Close Icon
            </button>
          </div>
          
          <Dialog
            open={dialogStates.customCloseIcon}
            onClose={() => closeDialog('customCloseIcon')}
            title="Custom Close Button"
            closeIcon={
              <span className="text-lg hover:text-white transition-colors">✕</span>
            }
            size="small"
          >
            <p className="text-gray-300 m-0">This dialog uses a custom close icon instead of the default SVG.</p>
          </Dialog>
        </PreviewCard>

        {/* 17. Accessibility Features Section */}
        <PreviewCard
          title="Accessibility Features"
          description="Built-in a11y: focus trapping (trapFocus), focus restoration (restoreFocus), initial focus element (initialFocus), aria-label, and aria-describedby props. All dialogs support Escape key close."
          code={`<Dialog
  trapFocus={true}           {/* Focus stays within dialog */}
  restoreFocus={true}        {/* Returns focus on close */}
  initialFocus="#email-input" {/* Auto-focus element */}
  aria-label="User form"
  aria-describedby="form-desc"
  closeOnEscape={true}       {/* Escape key closes */}
  ...
/>`}
        >
          <div className="dialog-preview-row">
            <p className="text-gray-400 text-sm text-center m-0 px-4">
              All dialogs include: Escape key close, focus trapping, ARIA attributes, and focus restoration for full accessibility compliance.
            </p>
          </div>
        </PreviewCard>

        {/* Props Reference */}
        <PropsReference />
      </div>
    </>
  );
}

/**
 * PreviewCard Component
 * Wraps each dialog variant section with title, description, and preview area
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
          background: "rgba(255, 255, 255, 0.05)",
          border: "1px solid #364153",
          borderRadius: "16px",
          padding: "24px",
          minHeight: activeTab === "code" ? "280px" : "120px",
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
              padding: "8px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s"
            }}
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                <path d="M15 4.5L6.75 12.75L3 9" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
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
                padding: "8px 16px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "13px",
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
                padding: "8px 16px",
                fontFamily: "Manrope, sans-serif",
                fontSize: "13px",
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
          <div style={{ zIndex: 1, width: "100%", display: "flex", justifyContent: "center", paddingTop: "32px" }}>
            {children}
          </div>
        ) : (
          <div 
            style={{
              width: "100%",
              padding: "52px 16px 16px 16px",
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column"
            }}
          >
            <pre
              style={{
                margin: 0,
                padding: "20px",
                background: "#0d0d0d",
                borderRadius: "12px",
                flex: 1,
                overflow: "auto",
                fontFamily: "'Cascadia Code', 'Fira Code', 'JetBrains Mono', monospace",
                fontSize: "13px",
                lineHeight: 1.6,
                color: "#e0e0e0",
                scrollbarWidth: "thin",
                border: "1px solid #262626"
              }}
            >
              <code style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

function PropsReference() {
  return (
    <div className="w-full bg-white/[0.04] border border-[#364153] rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-manrope text-xl font-semibold m-0 text-white">
          Dialog Props
        </h3>
        <p className="m-0 text-[#AEB6C4] text-sm leading-relaxed">
          Dialog is an enterprise-level modal component with comprehensive customization. It supports multiple sizes, 
          animations, positions, and built-in accessibility features including focus trapping, Escape key handling, and ARIA attributes.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[640px] font-manrope text-sm text-[#E3E6F2]">
          <thead>
            <tr>
              {[
                { label: "PROP", width: "18%" },
                { label: "TYPE", width: "24%" },
                { label: "DEFAULT", width: "12%" },
                { label: "DESCRIPTION", width: "46%" },
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