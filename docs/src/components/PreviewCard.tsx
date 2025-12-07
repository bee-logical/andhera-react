import { useState, useEffect } from "react";
import * as prettier from "prettier/standalone";
import * as typescriptParser from "prettier/plugins/typescript";
import * as estreeParser from "prettier/plugins/estree";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface PreviewCardProps {
  title: string;
  description: string;
  code: string;
  children: React.ReactNode;
}

export function PreviewCard({ title, description, code, children }: PreviewCardProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  const [formattedCode, setFormattedCode] = useState(code);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Format code with actual Prettier and apply highlighting
  useEffect(() => {
    const formatWithPrettier = async () => {
      try {
        const formatted = await prettier.format(code, {
          parser: "typescript",
          plugins: [typescriptParser.default, estreeParser.default],
          semi: true,
          singleQuote: false,
          tabWidth: 2,
          trailingComma: "es5",
          printWidth: 80,
          bracketSpacing: true,
          arrowParens: "always",
          endOfLine: "lf"
        });
        setFormattedCode(formatted);
      } catch (error) {
        console.error("Error formatting code with Prettier:", error);
        setFormattedCode(code);
      }
    };

    formatWithPrettier();
  }, [code]);

  // Apply syntax highlighting to formatted code
  const highlightCode = (code: string) => {
    // Escape HTML first
    let result = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Apply syntax highlighting with non-greedy matches
    result = result
      // Comments
      .replace(/(\/\/.*?)$/gm, '<span class="token-comment">$1</span>')
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="token-comment">$1</span>')
      // Strings
      .replace(/(["'`])[^"'`]*?\1/g, '<span class="token-string">$&</span>')
      // Keywords
      .replace(/\b(import|export|from|const|let|var|function|return|if|else|class|interface|type|async|await|try|catch|throw|new|this|default)\b/g, '<span class="token-keyword">$1</span>')
      // JSX components
      .replace(/(&lt;\/?)([A-Z][a-zA-Z0-9]*)/g, '$1<span class="token-tag">$2</span>')
      // Numbers and booleans
      .replace(/\b(\d+\.?\d*|true|false|null|undefined)\b/g, '<span class="token-number">$1</span>')
      // Operators
      .replace(/([={}();,.])/g, '<span class="token-operator">$1</span>');
    
    return result;
  };

  return (
    <div className="preview-card-wrapper">
      <style>
        {`
          .preview-card-wrapper {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
          }

          .preview-card-header {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .preview-card-title {
            font-family: Manrope, sans-serif;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.2;
            color: #FFFFFF;
            margin: 0;
          }

          .preview-card-description {
            font-family: Manrope, sans-serif;
            font-size: 14px;
            font-weight: 400;
            line-height: 1.6;
            color: #D1D5DC;
            margin: 0;
            white-space: pre-wrap;
          }

          .preview-card-container {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid #364153;
            border-radius: 16px;
            padding: 12px;
            height: 400px;
            max-height: 400px;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow: hidden;
          }

          .preview-card-controls {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            gap: 8px;
            align-items: center;
            z-index: 10;
          }

          .preview-card-copy-btn {
            background: transparent;
            border: 1px solid #364153;
            border-radius: 8px;
            padding: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }

          .preview-card-copy-btn:hover {
            background: rgba(255, 255, 255, 0.05);
          }

          .preview-card-toggle {
            border: 1px solid #364153;
            border-radius: 8px;
            display: flex;
            overflow: hidden;
          }

          .preview-card-tab {
            background: transparent;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            font-family: Manrope, sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #A1A1A1;
            cursor: pointer;
            transition: all 0.2s;
          }

          .preview-card-tab:hover {
            color: #FFFFFF;
          }

          .preview-card-tab--active {
            background: #242424;
            border: 1px solid #364153;
            color: #FFFFFF;
          }

          .preview-card-content {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: auto;
            max-height: 340px;
          }

          .preview-card-content--code {
            padding-top: 60px;
            align-items: stretch;
          }

          .preview-card-preview-area {
            z-index: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .preview-card-code-area {
            width: 100%;
            height: 100%;
            overflow: auto;
          }

          .hide-scrollbar {
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Mobile - max 480px */
          @media (max-width: 480px) {
            .preview-card-wrapper {
              gap: 8px;
            }

            .preview-card-title {
              font-size: 16px;
            }

            .preview-card-description {
              font-size: 12px;
              line-height: 1.5;
            }

            .preview-card-container {
              height: auto;
              min-height: 280px;
              max-height: none;
              padding: 8px;
              border-radius: 10px;
            }

            .preview-card-controls {
              position: static;
              margin-bottom: 8px;
              justify-content: space-between;
              width: 100%;
              flex-wrap: wrap;
            }

            .preview-card-copy-btn {
              padding: 6px;
              width: 32px;
              height: 32px;
            }

            .preview-card-copy-btn svg {
              width: 14px;
              height: 14px;
            }

            .preview-card-tab {
              padding: 6px 10px;
              font-size: 11px;
            }

            .preview-card-content {
              max-height: none;
              min-height: 200px;
              padding: 12px 4px;
            }

            .preview-card-content--code {
              padding-top: 0;
            }
          }

          /* Mobile Landscape & Small Tablets - 481px to 768px */
          @media (min-width: 481px) and (max-width: 768px) {
            .preview-card-wrapper {
              gap: 10px;
            }

            .preview-card-title {
              font-size: 18px;
            }

            .preview-card-description {
              font-size: 13px;
            }

            .preview-card-container {
              height: auto;
              min-height: 320px;
              max-height: none;
              padding: 10px;
              border-radius: 12px;
            }

            .preview-card-controls {
              position: static;
              margin-bottom: 10px;
              justify-content: space-between;
              width: 100%;
            }

            .preview-card-copy-btn {
              padding: 8px;
            }

            .preview-card-tab {
              padding: 8px 14px;
              font-size: 12px;
            }

            .preview-card-content {
              max-height: none;
              min-height: 240px;
              padding: 16px 8px;
            }

            .preview-card-content--code {
              padding-top: 0;
            }
          }

          /* Tablet - 769px to 1024px */
          @media (min-width: 769px) and (max-width: 1024px) {
            .preview-card-title {
              font-size: 19px;
            }

            .preview-card-description {
              font-size: 13.5px;
            }

            .preview-card-container {
              height: 360px;
              max-height: 360px;
              padding: 12px;
            }

            .preview-card-tab {
              padding: 9px 18px;
              font-size: 13px;
            }

            .preview-card-content {
              max-height: 300px;
            }
          }

          /* Small Desktop - 1025px to 1280px */
          @media (min-width: 1025px) and (max-width: 1280px) {
            .preview-card-container {
              height: 380px;
              max-height: 380px;
            }

            .preview-card-content {
              max-height: 320px;
            }
          }

          /* Standard Desktop - 1281px to 1440px */
          @media (min-width: 1281px) and (max-width: 1440px) {
            .preview-card-title {
              font-size: 21px;
            }

            .preview-card-description {
              font-size: 14.5px;
            }

            .preview-card-container {
              height: 400px;
              max-height: 400px;
            }
          }

          /* Large Desktop - 1441px to 1920px */
          @media (min-width: 1441px) and (max-width: 1920px) {
            .preview-card-wrapper {
              gap: 16px;
            }

            .preview-card-title {
              font-size: 22px;
            }

            .preview-card-description {
              font-size: 15px;
            }

            .preview-card-container {
              height: 440px;
              max-height: 440px;
              padding: 16px;
              border-radius: 18px;
            }

            .preview-card-controls {
              top: 16px;
              right: 16px;
              gap: 10px;
            }

            .preview-card-copy-btn {
              padding: 12px;
            }

            .preview-card-tab {
              padding: 11px 22px;
              font-size: 15px;
            }

            .preview-card-content {
              max-height: 380px;
            }
          }

          /* Extra Large Desktop - 1921px+ */
          @media (min-width: 1921px) {
            .preview-card-wrapper {
              gap: 20px;
            }

            .preview-card-title {
              font-size: 26px;
            }

            .preview-card-description {
              font-size: 16px;
            }

            .preview-card-container {
              height: 500px;
              max-height: 500px;
              padding: 20px;
              border-radius: 20px;
            }

            .preview-card-controls {
              top: 20px;
              right: 20px;
              gap: 12px;
            }

            .preview-card-copy-btn {
              padding: 14px;
            }

            .preview-card-copy-btn svg {
              width: 20px;
              height: 20px;
            }

            .preview-card-tab {
              padding: 12px 28px;
              font-size: 16px;
            }

            .preview-card-content {
              max-height: 440px;
            }
          }
        `}
      </style>
      {/* Header */}
      <div className="preview-card-header">
        <h3 className="preview-card-title">{title}</h3>
        <p className="preview-card-description">{description}</p>
      </div>

      {/* Preview Container */}
      <div className="preview-card-container">
        {/* Toggle Controls - Top Right */}
        <div className="preview-card-controls">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="preview-card-copy-btn"
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
          <div className="preview-card-toggle">
            <button
              onClick={() => setActiveTab("preview")}
              className={`preview-card-tab ${activeTab === "preview" ? "preview-card-tab--active" : ""}`}
            >
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`preview-card-tab ${activeTab === "code" ? "preview-card-tab--active" : ""}`}
            >
              Code
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div 
          className={`preview-card-content hide-scrollbar ${activeTab === "code" ? "preview-card-content--code" : ""}`}
        >
          {/* Content */}
          {activeTab === "preview" ? (
            <div className="preview-card-preview-area">
              {children}
            </div>
          ) : (
            <div className="preview-card-code-area hide-scrollbar">
              <SyntaxHighlighter
                language="typescript"
                style={tomorrow}
                customStyle={{
                  margin: 0,
                  padding: "16px",
                  background: "#0d1117",
                  borderRadius: "8px",
                  minHeight: "280px",
                  fontSize: '14px',
                  fontFamily: "'Cascadia Code', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', monospace"
                }}
                codeTagProps={{
                  style: {
                    fontFamily: "'Cascadia Code', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', monospace"
                  }
                }}
              >
                {formattedCode}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}