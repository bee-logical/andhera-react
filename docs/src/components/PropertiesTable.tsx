import { type CSSProperties } from "react";

export interface PropertyItem {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

interface PropertiesTableProps {
  title?: string;
  properties: PropertyItem[];
}

export function PropertiesTable({ title = "Textarea Properties", properties }: PropertiesTableProps) {
  const containerStyle: CSSProperties = {
    width: "100%",
    marginTop: "48px",
    background: "rgba(21, 24, 33, 0.6)",
    border: "1px solid #364153",
    borderRadius: "16px",
    padding: "24px",
    overflow: "hidden",
  };

  const titleStyle: CSSProperties = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "20px",
    fontWeight: 600,
    lineHeight: 1.2,
    color: "#FFFFFF",
    margin: "0 0 16px 0",
  };

  const tableWrapperStyle: CSSProperties = {
    overflowX: "auto",
    width: "100%",
  };

  const tableStyle: CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle: CSSProperties = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "13px",
    fontWeight: 600,
    textAlign: "left",
    padding: "12px 16px",
    color: "#FFFFFF",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderBottom: "1px solid #364153",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const tdStyle: CSSProperties = {
    fontFamily: "Manrope, sans-serif",
    fontSize: "14px",
    padding: "12px 16px",
    color: "#D1D5DC",
    borderBottom: "1px solid rgba(54, 65, 83, 0.5)",
    verticalAlign: "top",
  };

  const propertyNameStyle: CSSProperties = {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#FFCB00",
    fontWeight: 500,
  };

  const typeStyle: CSSProperties = {
    fontFamily: "monospace",
    fontSize: "12px",
    color: "#8B5CF6",
    backgroundColor: "rgba(139, 92, 246, 0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
    display: "inline-block",
    wordBreak: "break-word",
  };

  const requiredBadgeStyle: CSSProperties = {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: 600,
    color: "#EF4444",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
    marginLeft: "6px",
    textTransform: "uppercase",
  };

  const descriptionStyle: CSSProperties = {
    color: "#D1D5DC",
  };

  const defaultValueStyle: CSSProperties = {
    fontFamily: "monospace",
    fontSize: "12px",
    color: "#22C55E",
    fontWeight: 600,
    display: "block",
    marginTop: "6px",
  };

  // Mobile card styles
  const mobileCardStyle: CSSProperties = {
    padding: "16px",
    borderBottom: "1px solid rgba(54, 65, 83, 0.5)",
  };

  const mobileHeaderStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "8px",
  };

  const mobileSeparatorStyle: CSSProperties = {
    color: "#6B7280",
    margin: "0 4px",
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>{title}</h3>
      
      {/* Desktop table view */}
      <div style={{ ...tableWrapperStyle, display: window.innerWidth >= 768 ? "block" : "none" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "25%" }}>Property</th>
              <th style={{ ...thStyle, width: "30%" }}>Type</th>
              <th style={{ ...thStyle, width: "45%" }}>Description</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((prop, index) => {
              const hasDefault = prop.defaultValue && prop.defaultValue !== "-";

              return (
                <tr key={index}>
                  <td style={tdStyle}>
                    <span style={propertyNameStyle}>{prop.name}</span>
                    {prop.required && <span style={requiredBadgeStyle}>Required</span>}
                  </td>
                  <td style={tdStyle}>
                    <code style={typeStyle}>{prop.type}</code>
                  </td>
                  <td style={tdStyle}>
                    <div>
                      <span style={descriptionStyle}>{prop.description}</span>
                      {hasDefault && (
                        <span style={defaultValueStyle}>Default: {prop.defaultValue}</span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div style={{ display: window.innerWidth < 768 ? "block" : "none" }}>
        {properties.map((prop, index) => {
          const hasDefault = prop.defaultValue && prop.defaultValue !== "-";

          return (
            <div key={index} style={mobileCardStyle}>
              <div style={mobileHeaderStyle}>
                <span style={propertyNameStyle}>{prop.name}</span>
                <span style={mobileSeparatorStyle}>-</span>
                <code style={typeStyle}>{prop.type}</code>
                {prop.required && <span style={requiredBadgeStyle}>Required</span>}
              </div>
              <div>
                <span style={descriptionStyle}>{prop.description}</span>
                {hasDefault && (
                  <span style={defaultValueStyle}>Default: {prop.defaultValue}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
