import React, { useMemo, useState } from "react";
import {
  BeeSnackbar,
  SnackbarProvider,
  useSnackbar,
  createSnackbarHelpers,
} from "../../../src/components/snackbar/BeeSnackbar";
import { Button } from "../../../src/components/button";
import { PreviewCard as SharedPreviewCard } from "../components/PreviewCard";

const ProviderDemo = () => {
  const snackbar = useSnackbar();
  const helpers = useMemo(() => createSnackbarHelpers(snackbar.show), [snackbar.show]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button size="small" variant="secondary" onClick={() => helpers.success("Saved successfully", { position: "top-right" })}>
        Success
      </Button>
      <Button size="small" variant="secondary" onClick={() => helpers.info("Heads up! Info message", { position: "bottom-center" })}>
        Info
      </Button>
      <Button size="small" variant="secondary" onClick={() => helpers.warning("Low credits remaining", { position: "top-center" })}>
        Warning
      </Button>
      <Button
        size="small"
        variant="secondary"
        onClick={() => helpers.error("Something went wrong", { position: "bottom-left", variant: "outline" })}
      >
        Error
      </Button>
      <Button
        size="small"
        variant="secondary"
        onClick={() =>
          snackbar.show({
            type: "default",
            title: "Stacked",
            message: "This is stacked with spacing",
            position: "bottom-right",
            duration: 2500,
          })
        }
      >
        Custom
      </Button>
      <Button size="small" variant="secondary" onClick={snackbar.closeAll}>
        Close all
      </Button>
    </div>
  );
};

const PositionsDemo = () => {
  const snackbar = useSnackbar();

  const trigger = (position: Parameters<typeof snackbar.show>[0]["position"], type: any, message: string) => {
    snackbar.show({ type, message, position, duration: 3500, portal: true });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-3">
      <Button size="small" variant="secondary" onClick={() => trigger("top-left", "info", "Top-left")}>Top-left</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("top-center", "warning", "Top-center")}>Top-center</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("top-right", "success", "Top-right")}>Top-right</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("bottom-left", "error", "Bottom-left")}>Bottom-left</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("bottom-center", "info", "Bottom-center")}>Bottom-center</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("bottom-right", "success", "Bottom-right")}>Bottom-right</Button>
      <Button size="small" variant="secondary" onClick={() => trigger("center", "default", "Centered")}>Center</Button>
    </div>
  );
};

export function SnackbarPreview() {
  const [variantsOpen, setVariantsOpen] = useState({
    success: false,
    warning: false,
    info: false,
    error: false,
  });
  const [autoOpen, setAutoOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
  const [sizesOpen, setSizesOpen] = useState({ small: false, default: false, large: false });
  const [fadeOpen, setFadeOpen] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [linearOpen, setLinearOpen] = useState(false);
  const [iconOpen, setIconOpen] = useState({ custom: false, hidden: false });
  const [controlOpen, setControlOpen] = useState(false);

  return (
    <div className="flex flex-col gap-10 w-full">
      <SharedPreviewCard
        title="Variants & types"
        description="Filled, outline, and soft variants across common types."
        code={`import { Snackbar } from "andhera-react";

      <Snackbar type="success" variant="filled" message="Saved successfully" closable />
      <Snackbar type="warning" variant="outline" message="Check settings" closable />
      <Snackbar type="info" variant="soft" message="Heads up, new update available" closable />
      <Snackbar type="error" variant="filled" message="Something went wrong" closable />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {variantsOpen.success && (
            <BeeSnackbar
              type="success"
              variant="filled"
              message="Saved successfully"
              onClose={() => setVariantsOpen(p => ({ ...p, success: false }))}
            />
          )}
          {variantsOpen.warning && (
            <BeeSnackbar
              type="warning"
              variant="outline"
              message="Check your settings"
              onClose={() => setVariantsOpen(p => ({ ...p, warning: false }))}
            />
          )}
          {variantsOpen.info && (
            <BeeSnackbar
              type="info"
              variant="soft"
              message="Heads up, new update available"
              onClose={() => setVariantsOpen(p => ({ ...p, info: false }))}
            />
          )}
          {variantsOpen.error && (
            <BeeSnackbar
              type="error"
              variant="filled"
              message="Something went wrong"
              onClose={() => setVariantsOpen(p => ({ ...p, error: false }))}
            />
          )}

          <div className="flex justify-center">
            <Button
              size="small"
              variant="secondary"
              onClick={() => setVariantsOpen({ success: true, warning: true, info: true, error: true })}
            >
              Show variants
            </Button>
          </div>
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Auto close with progress"
        description="Auto-dismiss with circular progress and pause-on-hover."
        code={`import { Snackbar } from "andhera-react";

<Snackbar
  type="success"
  message="File uploaded. This will close in 4s"
  duration={4000}
  progressType="circular"
  pauseOnHover
  position="bottom-right"
  portal
  closable
/>`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {autoOpen && (
            <BeeSnackbar
              type="success"
              message="File uploaded. This will close in 4s"
              duration={4000}
              progressType="circular"
              pauseOnHover
              position="bottom-right"
              portal
              onClose={() => setAutoOpen(false)}
            />
          )}
          <div className="flex justify-center">
            <Button size="small" variant="secondary" onClick={() => setAutoOpen(true)}>
              Show auto close
            </Button>
          </div>
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Sizes"
        description="Small, default, and large sizing for padding and typography."
        code={`import { Snackbar } from "andhera-react";

      <Snackbar size="small" type="info" message="Compact" closable />
      <Snackbar size="default" type="success" message="Default size" closable />
      <Snackbar size="large" type="warning" message="Spacious" closable />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {sizesOpen.small && (
            <BeeSnackbar size="small" type="info" message="Compact" onClose={() => setSizesOpen(p => ({ ...p, small: false }))} />
          )}
          {sizesOpen.default && (
            <BeeSnackbar size="default" type="success" message="Default size" onClose={() => setSizesOpen(p => ({ ...p, default: false }))} />
          )}
          {sizesOpen.large && (
            <BeeSnackbar size="large" type="warning" message="Spacious" onClose={() => setSizesOpen(p => ({ ...p, large: false }))} />
          )}
          <div className="flex justify-center">
            <Button size="small" variant="secondary" onClick={() => setSizesOpen({ small: true, default: true, large: true })}>
              Show sizes
            </Button>
          </div>
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Animations"
        description="Trigger fade, zoom, and slide animations via buttons (all rendered in a portal)."
        code={`import { Snackbar } from "andhera-react";

      <Snackbar animation="fade" type="info" message="Fade animation" position="bottom-right" portal closable />
      <Snackbar animation="zoom" type="warning" message="Zoom animation" position="bottom-right" portal closable />
      <Snackbar animation="slide" type="success" message="Slide animation" position="bottom-right" portal closable />`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto items-center">
          <div className="flex flex-wrap gap-2 items-center justify-center py-4">
            <Button size="small" variant="secondary" onClick={() => setFadeOpen(true)}>Show fade</Button>
            <Button size="small" variant="secondary" onClick={() => setZoomOpen(true)}>Show zoom</Button>
            <Button size="small" variant="secondary" onClick={() => setSlideOpen(true)}>Show slide</Button>
          </div>

          {fadeOpen && (
            <BeeSnackbar
              animation="fade"
              type="info"
              message="Fade animation"
              position="bottom-right"
              portal
              onClose={() => setFadeOpen(false)}
            />
          )}

          {zoomOpen && (
            <BeeSnackbar
              animation="zoom"
              type="warning"
              message="Zoom animation"
              position="bottom-right"
              portal
              onClose={() => setZoomOpen(false)}
            />
          )}

          {slideOpen && (
            <BeeSnackbar
              animation="slide"
              type="success"
              message="Slide animation"
              position="bottom-right"
              portal
              onClose={() => setSlideOpen(false)}
            />
          )}
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Positions"
        description="Place snackbars anywhere on screen."
        code={`import { SnackbarProvider, useSnackbar } from "andhera-react";

function Demo() {
  const snackbar = useSnackbar();
  return (
    <button onClick={() => snackbar.show({ type: "info", message: "Top-center", position: "top-center", portal: true })}>
      Show top-center
    </button>
  );
}

<SnackbarProvider defaultPosition="bottom-right" spacing={12}>
  <Demo />
</SnackbarProvider>`}
      >
        <SnackbarProvider defaultPosition="bottom-right" spacing={12}>
          <PositionsDemo />
        </SnackbarProvider>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Custom content & actions"
        description="Use title, rich body, multiple actions, and custom colors."
        code={`import { Snackbar } from "andhera-react";

<Snackbar
  type="warning"
  variant="outline"
  title="Storage almost full"
  message="You're at 92% of your limit. Reduce usage or upgrade."
  position="bottom-right"
  duration={0}
  actions=[
    { label: "Manage", onClick: () => console.log("manage"), variant: "filled" },
    { label: "Later", onClick: () => console.log("later"), variant: "text" }
  ]
  backgroundColor="#0f172a"
  textColor="#e2e8f0"
  borderColor="#334155"
  iconColor="#fbbf24"
  shadow="xl"
  portal
/>`}
      >
        {customOpen ? (
          <BeeSnackbar
            type="warning"
            variant="outline"
            title="Storage almost full"
            message="You're at 92% of your limit. Reduce usage or upgrade."
            position="bottom-right"
            duration={0}
            actions={[
              { label: "Manage", onClick: () => console.log("manage"), variant: "filled" },
              { label: "Later", onClick: () => console.log("later"), variant: "text" },
            ]}
            backgroundColor="#0f172a"
            textColor="#e2e8f0"
            borderColor="#334155"
            iconColor="#fbbf24"
            shadow="xl"
            portal
            onClose={() => setCustomOpen(false)}
          />
        ) : (
          <Button size="small" variant="secondary" onClick={() => setCustomOpen(true)}>
            Show custom snackbar
          </Button>
        )}
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Progress styles & pause"
        description="Linear progress and pause-on-hover to keep users informed."
        code={`import { Snackbar } from "andhera-react";

<Snackbar
  type="info"
  message="Upload in progress"
  duration={5000}
  progressType="linear"
  pauseOnHover
  position="bottom-center"
  portal
/>`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {linearOpen && (
            <BeeSnackbar
              type="info"
              message="Upload in progress"
              duration={5000}
              progressType="linear"
              pauseOnHover
              position="bottom-center"
              portal
              onClose={() => setLinearOpen(false)}
            />
          )}
          <div className="flex justify-center">
            <Button size="small" variant="secondary" onClick={() => setLinearOpen(true)}>
              Show linear progress
            </Button>
          </div>
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Icon controls"
        description="Custom icons or hide the icon entirely."
        code={`import { Snackbar } from "andhera-react";

<Snackbar
  type="success"
  message="Custom icon"
  icon={<span role="img" aria-label="sparkles">✨</span>}
  closable
/>

<Snackbar
  type="default"
  message="Icon hidden"
  showIcon={false}
  closable
/>`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {iconOpen.custom && (
            <BeeSnackbar
              type="success"
              message="Custom icon"
              icon={<span role="img" aria-label="sparkles">✨</span>}
              onClose={() => setIconOpen(p => ({ ...p, custom: false }))}
            />
          )}
          {iconOpen.hidden && (
            <BeeSnackbar
              type="default"
              message="Icon hidden"
              showIcon={false}
              onClose={() => setIconOpen(p => ({ ...p, hidden: false }))}
            />
          )}
          <div className="flex justify-center">
            <Button size="small" variant="secondary" onClick={() => setIconOpen({ custom: true, hidden: true })}>
              Show icon examples
            </Button>
          </div>
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Controls & accessibility"
        description="Closable toggle, max width, portal, z-index, and aria-live."
        code={`import { Snackbar } from "andhera-react";

<Snackbar
  type="warning"
  variant="soft"
  message="Persistent until action"
  position="bottom-center"
  closable={false}
  duration={0}
  maxWidth={360}
  portal
  ariaLive="assertive"
  zIndex={12000}
  actions={[{ label: "Dismiss", onClick: () => console.log("dismiss"), variant: "filled" }]}
/>`}
      >
        <div className="flex flex-col gap-3 w-full max-w-[520px] mx-auto">
          {controlOpen ? (
            <BeeSnackbar
              type="warning"
              variant="soft"
              message="Persistent until action"
              position="bottom-center"
              closable={false}
              duration={0}
              maxWidth={360}
              portal
              ariaLive="assertive"
              zIndex={12000}
              onClose={() => setControlOpen(false)}
              actions={[{ label: "Dismiss", onClick: () => setControlOpen(false), variant: "filled" }]}
            />
          ) : (
            <div className="flex justify-center">
              <Button size="small" variant="secondary" onClick={() => setControlOpen(true)}>
                Show accessibility example
              </Button>
            </div>
          )}
        </div>
      </SharedPreviewCard>

      <SharedPreviewCard
        title="Provider-driven snackbars"
        description="Manage a queue via provider, hook, and helpers."
        code={`import { SnackbarProvider, useSnackbar, createSnackbarHelpers } from "andhera-react";

function Demo() {
  const snackbar = useSnackbar();
  const helpers = createSnackbarHelpers(snackbar.show);

  return (
    <div className="flex gap-8">
      <button onClick={() => helpers.success("Saved successfully", { position: "top-right" })}>Success</button>
      <button onClick={() => helpers.info("Heads up!", { position: "bottom-center" })}>Info</button>
      <button onClick={() => helpers.warning("Low credits", { position: "top-center" })}>Warning</button>
      <button onClick={() => helpers.error("Something went wrong", { position: "bottom-left", variant: "outline" })}>Error</button>
      <button
        onClick={() =>
          snackbar.show({
            type: "default",
            title: "Stacked",
            message: "This is stacked with spacing",
            position: "bottom-right",
            duration: 2500,
          })
        }
      >
        Custom
      </button>
      <button onClick={snackbar.closeAll}>Close all</button>
    </div>
  );
}

<SnackbarProvider defaultPosition="bottom-right" maxSnackbars={4} spacing={12}>
  <Demo />
</SnackbarProvider>`}
      >
        <SnackbarProvider defaultPosition="bottom-right" maxSnackbars={4} spacing={12}>
          <ProviderDemo />
        </SnackbarProvider>
      </SharedPreviewCard>
    </div>
  );
}


