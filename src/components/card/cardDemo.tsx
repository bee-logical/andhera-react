"use client";
import React, { useState } from "react";
import CustomCard from "./CustomCard";

const CardDemo: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="min-h-screen bg-gray-50 p-10 flex flex-col gap-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        🧩 CustomCard Demo Showcase
      </h1>

      {/* 🔹 BASIC VARIANT */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Basic Variant</h2>
        <CustomCard
          variant="basic"
          header={{
            title: "Basic Card",
            subheader: "Simple and clean layout",
          }}
          media={{
            image: "https://source.unsplash.com/random/400x200?nature",
            title: "Nature Image",
          }}
          content={{
            node: <p>This is a simple card with default styling.</p>,
          }}
          actions={[
            {
              label: "Learn More",
              onClick: () => alert("Basic Card clicked!"),
            },
          ]}
          collapse={{ expanded: false, node: null }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
          onClick={() => {}}
        />
      </div>

      {/* 🔹 ELEVATED VARIANT */}
<div>
  <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Elevated Variant</h2>
  <CustomCard
    variant="elevated"
    header={{
      title: "Elevated Card",
      subheader: "Lifted look with shadow",
    }}
    media={{
      image: "https://source.unsplash.com/random/400x200?city",
      title: "Image Title",
    }}
    content={{
      node: <div>Card content here</div>,
    }}
    actions={[
      { label: "Click Me", onClick: () => alert("Clicked!") },
    ]}
    collapse={{ expanded: false, node: null }}
    paperProps={{}}
    cardProps={{}}
    sx={{}}
    onClick={() => {}}
  />
</div>

      {/* 🔹 OUTLINED VARIANT */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Outlined Variant</h2>
        <CustomCard
          variant="outlined"
          header={{
            title: "Outlined Card",
            subheader: "Minimal bordered look",
          }}
          media={null}
          content={{
            node: <p>Outlined cards have a border instead of shadow.</p>,
          }}
          actions={[
            {
              label: "Details",
              onClick: () => alert("Outlined card action"),
            },
          ]}
          collapse={{ expanded: false, node: null }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
          onClick={() => {}}
        />
      </div>

      {/* 🔹 GRADIENT VARIANT */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Gradient Variant</h2>
        <CustomCard
          variant="gradient"
          header={{
            title: "Gradient Card",
            subheader: "With linear gradient background",
          }}
          media={null}
          content={{
            node: (
              <p className="text-white">
                Gradient variant adds a modern, colorful background.
              </p>
            ),
          }}
          actions={[
            {
              label: "Explore",
              onClick: () => alert("Gradient button clicked!"),
            },
          ]}
          collapse={{ expanded: false, node: null }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
          onClick={() => {}}
        />
      </div>

      {/* 🔹 INTERACTIVE VARIANT */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Interactive Variant</h2>
        <CustomCard
          variant="interactive"
          header={{
            title: "Interactive Card",
            subheader: "Hover and click enabled",
          }}
          media={null}
          content={{
            node: <p>Hover over this card to see the animation effect.</p>,
          }}
          onClick={() => alert("Interactive card clicked!")}
          actions={[
            { label: "Like", onClick: () => alert("Liked!") },
            { label: "Share", onClick: () => alert("Shared!") },
          ]}
          collapse={{ expanded: false, node: null }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
        />
      </div>

      {/* 🔹 COLLAPSIBLE CARD */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Collapsible Card</h2>
        <CustomCard
          variant="basic"
          header={{
            title: "Collapsible Card",
            subheader: "Click button to toggle content",
          }}
          media={null}
          content={{
            node: (
              <div>
                <p>This card includes a collapsible section.</p>
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  {expanded ? "Hide Details" : "Show Details"}
                </button>
              </div>
            ),
          }}
          actions={[
            {
              label: "Toggle Details",
              onClick: () => setExpanded((prev) => !prev),
            },
          ]}
          collapse={{
            expanded,
            node: (
              <div className="p-3 text-gray-700">
                <p>
                  This is the hidden collapsible content area. You can include any
                  details, description, or nested elements here.
                </p>
              </div>
            ),
          }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
          onClick={() => {}}
        />
      </div>

      {/* 🔹 ACTION AREA CARD */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">🔹 Action Area Card</h2>
        <CustomCard
          variant="basic"
          actionArea
          onClick={() => alert("Entire card clicked!")}
          header={{
            title: "Action Area",
            subheader: "Click anywhere on this card",
          }}
          media={{
            image: "https://source.unsplash.com/random/400x200?workspace",
          }}
          content={{
            node: (
              <p>
                The entire card is clickable because <b>actionArea</b> is set to{" "}
                <code>true</code>.
              </p>
            ),
          }}
          actions={[]}
          collapse={{ expanded: false, node: null }}
          paperProps={{}}
          cardProps={{}}
          sx={{}}
        />
      </div>
    </section>
  );
};

export default CardDemo;
