import { useEffect, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ComponentDoc } from "../data/components";
import { componentCategories, componentDocs, getStatusLabel } from "../data/components";
import { GithubIcon } from "./Icons";

export const ComponentDetail = ({ doc }: { doc: ComponentDoc }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const status = doc.status ?? "stable";
  const statusClassName = `component-status-chip component-status-chip--${status}`;
  const statusLabel = getStatusLabel(status);
  const categoryLabel = componentCategories.find((category) => category.id === doc.category)?.label ?? doc.category;

  // Calculate previous and next components
  const { prevComponent, nextComponent } = useMemo(() => {
    const currentIndex = componentDocs.findIndex(d => d.id === doc.id);
    return {
      prevComponent: currentIndex > 0 ? componentDocs[currentIndex - 1] : null,
      nextComponent: currentIndex < componentDocs.length - 1 ? componentDocs[currentIndex + 1] : null
    };
  }, [doc.id]);

  const navigateToComponent = (componentId: string) => {
    navigate(`/components/react/base-component/${componentId}`);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [doc.id]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div ref={contentRef} className="max-w-[calc(100vw-320px)] mx-0 ml-0 p-6 pb-20 font-sans bg-black text-white min-h-full box-border
      max-[480px]:p-3 max-[480px]:pb-12 max-[480px]:max-w-full
      max-[768px]:p-4 max-[768px]:pb-14 max-[768px]:max-w-full
      min-[769px]:max-[1024px]:p-5 min-[769px]:max-[1024px]:pb-14 min-[769px]:max-[1024px]:max-w-full
      min-[1025px]:max-[1280px]:max-w-[calc(100vw-300px)]
      min-[1281px]:max-[1440px]:max-w-[calc(100vw-320px)] min-[1281px]:max-[1440px]:p-7
      min-[1441px]:max-[1920px]:max-w-[calc(100vw-360px)] min-[1441px]:max-[1920px]:px-10 min-[1441px]:max-[1920px]:py-8
      min-[1921px]:max-w-[calc(100vw-400px)] min-[1921px]:px-14 min-[1921px]:py-10">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 mb-6
        max-[480px]:gap-1 max-[480px]:mb-3 max-[480px]:flex-wrap
        max-[768px]:gap-1.5 max-[768px]:mb-4
        min-[1921px]:mb-7">
        <Link to="/" className="text-base font-medium leading-tight text-gray-400 no-underline transition-colors hover:text-white
          max-[480px]:text-xs max-[768px]:text-sm min-[1921px]:text-[17px]">
          Components
        </Link>
        <svg className="w-[18px] h-[18px] text-white max-[480px]:w-3 max-[480px]:h-3 max-[768px]:w-3.5 max-[768px]:h-3.5 min-[1921px]:w-5 min-[1921px]:h-5" viewBox="0 0 18 18" fill="none">
          <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-base font-medium leading-tight text-white
          max-[480px]:text-xs max-[768px]:text-sm min-[1921px]:text-[17px]">
          {doc.title}
        </span>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col gap-6 mb-6
        max-[480px]:gap-3 max-[480px]:mb-4
        max-[768px]:gap-4 max-[768px]:mb-5
        min-[1441px]:gap-7 min-[1441px]:mb-7
        min-[1921px]:gap-8 min-[1921px]:mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-[40px] font-bold leading-tight tracking-tight text-white m-0
            max-[480px]:text-2xl max-[768px]:text-[28px]
            min-[769px]:max-[1024px]:text-[34px]
            min-[1025px]:max-[1280px]:text-4xl
            min-[1281px]:max-[1440px]:text-[38px]
            min-[1441px]:max-[1920px]:text-[44px]
            min-[1921px]:text-[52px]">
            {doc.title}
          </h1>
          <p className="text-base font-medium leading-relaxed text-gray-300 m-0
            max-[480px]:text-[13px] max-[480px]:leading-normal
            max-[768px]:text-sm
            min-[769px]:max-[1024px]:text-[15px]
            min-[1281px]:max-[1440px]:max-w-[85%]
            min-[1441px]:max-[1920px]:text-[17px] min-[1441px]:max-[1920px]:max-w-[80%]
            min-[1921px]:text-lg min-[1921px]:max-w-[75%]">
            {doc.description}
          </p>
        </div>

        <div className="flex gap-2 max-[768px]:flex-col">
          <a
            href={doc.githubUrl || "https://github.com/bee-logical/andhera-react"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-5 py-2.5 border-none rounded-lg text-sm font-normal leading-tight tracking-wide transition-all bg-[#404040] text-[#ffcb00] hover:bg-[#4a4a4a]
              max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-3.5 max-[480px]:py-2.5 max-[480px]:text-[13px]
              max-[768px]:w-full max-[768px]:justify-center max-[768px]:px-4 max-[768px]:py-3
              min-[1921px]:px-7 min-[1921px]:py-3 min-[1921px]:text-[15px]
              ${doc.githubUrl ? "" : "pointer-events-none opacity-60"}`}
            aria-disabled={!doc.githubUrl}
          >
            <GithubIcon className="w-[18px] h-[18px] min-[1921px]:w-5 min-[1921px]:h-5" />
            <span>Open GitHub</span>
          </a>
        </div>
      </section>

      {/* Import Section */}
      <section className="mb-11 max-[480px]:mb-7 max-[768px]:mb-8 min-[769px]:max-[1024px]:mb-[38px] min-[1025px]:max-[1280px]:mb-10 min-[1441px]:mb-[52px] min-[1921px]:mb-[60px]">
        <div className="flex flex-col gap-2 mb-3 min-[1441px]:mb-4 min-[1921px]:mb-5">
          <h2 className="text-xl font-semibold leading-tight tracking-tight text-white m-0
            max-[480px]:text-base max-[768px]:text-lg
            min-[769px]:max-[1024px]:text-[19px]
            min-[1441px]:text-[22px]
            min-[1921px]:text-[26px]">
            Import
          </h2>
          <p className="text-sm font-normal leading-relaxed text-gray-300 m-0
            max-[480px]:text-xs max-[768px]:text-[13px]
            min-[1441px]:text-[15px] min-[1921px]:text-base">
            Add the {doc.title} component to your project by importing it from the AnderaUI library.
          </p>
        </div>

        <div className="bg-[#191919] border border-[#364153] rounded-xl p-5 mt-3
          max-[480px]:p-3 max-[480px]:rounded-lg
          max-[768px]:p-3.5 max-[768px]:rounded-[10px]
          min-[769px]:max-[1024px]:p-[18px]
          min-[1441px]:p-6
          min-[1921px]:p-7 min-[1921px]:rounded-2xl">
          <div className="flex items-center justify-between gap-4
            max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-3
            max-[480px]:gap-2.5">
            <code className="flex-1 font-mono text-sm leading-relaxed text-gray-200 bg-transparent p-0 m-0
              max-[480px]:text-[11px] max-[480px]:break-all max-[480px]:overflow-wrap-anywhere
              max-[768px]:text-xs max-[768px]:break-all
              min-[769px]:max-[1024px]:text-[13px]
              min-[1441px]:text-[15px]
              min-[1921px]:text-base">
              {`import { ${doc.componentName || doc.title} } from "andhera-react";`}
            </code>
            <button 
              className="flex items-center justify-center w-[38px] h-[38px] p-2.5 bg-transparent border border-[#364153] rounded-lg text-white cursor-pointer transition-all hover:bg-white/5
                max-[480px]:w-8 max-[480px]:h-8 max-[480px]:p-1.5"
              onClick={() => copyToClipboard(`import { ${doc.componentName || doc.title} } from "andhera-react";`)}
              title={copied ? "Copied!" : "Copy import statement"}
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
          </div>
        </div>
      </section>

      {/* Live Example Section */}
      <section className="mb-11 max-[480px]:mb-7 max-[768px]:mb-8 min-[769px]:max-[1024px]:mb-[38px] min-[1025px]:max-[1280px]:mb-10 min-[1441px]:mb-[52px] min-[1921px]:mb-[60px]">
        {doc.render()}
      </section>

      {/* Props Table Section */}
      {doc.props && doc.props.length > 0 ? (
        <section className="mb-11 max-[480px]:mb-7 max-[768px]:mb-8 min-[769px]:max-[1024px]:mb-[38px] min-[1025px]:max-[1280px]:mb-10 min-[1441px]:mb-[52px] min-[1921px]:mb-[60px]">
          <div className="flex flex-col gap-2 mb-3 min-[1441px]:mb-4 min-[1921px]:mb-5">
            <h2 className="text-xl font-semibold leading-tight tracking-tight text-white m-0
              max-[480px]:text-base max-[768px]:text-lg
              min-[769px]:max-[1024px]:text-[19px]
              min-[1441px]:text-[22px]
              min-[1921px]:text-[26px]">
              {doc.title} Properties
            </h2>
            <p className="text-sm font-normal leading-relaxed text-gray-300 m-0
              max-[480px]:text-xs max-[768px]:text-[13px]
              min-[1441px]:text-[15px] min-[1921px]:text-base">
              {doc.title} properties define the appearance, behavior, and accessibility of a {doc.title.toLowerCase()}, allowing for customization and enhanced user interaction.
            </p>
          </div>

          <div className="flex flex-col gap-2 overflow-x-auto">
            <table className="w-full border-collapse border-spacing-0 max-[768px]:text-[11px] max-[480px]:text-[10px]">
              <thead>
                <tr>
                  <th className="bg-white/[0.06] px-4 py-2.5 text-left text-sm font-bold leading-relaxed text-white rounded-t-lg
                    w-[180px] max-[768px]:w-auto max-[768px]:min-w-[100px] max-[480px]:min-w-[80px]
                    max-[768px]:px-2 max-[768px]:py-2.5 max-[480px]:px-1.5 max-[480px]:py-2
                    min-[1441px]:px-5 min-[1441px]:py-3.5
                    min-[1921px]:px-6 min-[1921px]:py-4 min-[1921px]:text-[15px] min-[1921px]:w-[220px]">
                    Prop
                  </th>
                  <th className="bg-white/[0.06] px-4 py-2.5 text-left text-sm font-bold leading-relaxed text-white rounded-t-lg
                    max-[768px]:px-2 max-[768px]:py-2.5 max-[480px]:px-1.5 max-[480px]:py-2
                    min-[1441px]:px-5 min-[1441px]:py-3.5
                    min-[1921px]:px-6 min-[1921px]:py-4 min-[1921px]:text-[15px]">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {doc.props.map((prop) => (
                  <tr key={prop.name} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-2.5 align-middle
                      max-[768px]:px-2 max-[768px]:py-2.5 max-[480px]:px-1.5 max-[480px]:py-2
                      min-[1441px]:px-5 min-[1441px]:py-3.5
                      min-[1921px]:px-6 min-[1921px]:py-4">
                      <code className="inline-block px-2 py-1 bg-white/[0.14] rounded-md font-mono text-[10px] font-semibold leading-relaxed text-white
                        max-[480px]:text-[9px] max-[480px]:px-1.5 max-[480px]:py-0.5
                        min-[1441px]:text-[11px] min-[1441px]:px-2.5 min-[1441px]:py-1.5
                        min-[1921px]:text-xs min-[1921px]:px-3 min-[1921px]:py-1.5">
                        {prop.name}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 align-middle text-sm font-semibold leading-relaxed text-white
                      max-[768px]:px-2 max-[768px]:py-2.5 max-[480px]:px-1.5 max-[480px]:py-2
                      min-[1441px]:px-5 min-[1441px]:py-3.5 min-[1441px]:text-[15px]
                      min-[1921px]:px-6 min-[1921px]:py-4 min-[1921px]:text-base">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-10 mt-10 pb-[60px] border-t border-white/10
        max-[480px]:flex-col-reverse max-[480px]:gap-2.5 max-[480px]:pt-6 max-[480px]:mt-6 max-[480px]:pb-[30px]
        max-[768px]:flex-col-reverse max-[768px]:gap-3 max-[768px]:pb-10
        min-[769px]:max-[1024px]:flex-row min-[769px]:max-[1024px]:gap-4
        min-[1441px]:pt-12 min-[1441px]:mt-12 min-[1441px]:pb-[70px]
        min-[1921px]:pt-14 min-[1921px]:mt-14 min-[1921px]:pb-20">
        {prevComponent && (
          <button 
            className="flex items-center gap-2 px-5 py-2.5 border-none rounded-lg text-sm font-normal leading-tight tracking-wide cursor-pointer transition-all bg-[#262626] text-[#ffcb00] hover:bg-[#333333]
              max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-3.5 max-[480px]:py-2.5 max-[480px]:text-xs
              max-[768px]:w-full max-[768px]:justify-center
              min-[769px]:max-[1024px]:flex-1 min-[769px]:max-[1024px]:max-w-[280px]
              min-[1441px]:px-6 min-[1441px]:py-3 min-[1441px]:text-[15px]
              min-[1921px]:px-8 min-[1921px]:py-3.5 min-[1921px]:text-base"
            onClick={() => navigateToComponent(prevComponent.id)}
          >
            <svg className="w-[18px] h-[18px] min-[1921px]:w-5 min-[1921px]:h-5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11.25 13.5L6.75 9l4.5-4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Previous: {prevComponent.title}</span>
          </button>
        )}
        {nextComponent && (
          <button 
            className="flex items-center gap-2 px-5 py-2.5 border-none rounded-lg text-sm font-normal leading-tight tracking-wide cursor-pointer transition-all bg-[#ffcb00] text-black hover:bg-[#e6b800]
              max-[480px]:w-full max-[480px]:justify-center max-[480px]:px-3.5 max-[480px]:py-2.5 max-[480px]:text-xs
              max-[768px]:w-full max-[768px]:justify-center
              min-[769px]:max-[1024px]:flex-1 min-[769px]:max-[1024px]:max-w-[280px]
              min-[1441px]:px-6 min-[1441px]:py-3 min-[1441px]:text-[15px]
              min-[1921px]:px-8 min-[1921px]:py-3.5 min-[1921px]:text-base"
            onClick={() => navigateToComponent(nextComponent.id)}
          >
            <span>Next: {nextComponent.title}</span>
            <svg className="w-[18px] h-[18px] min-[1921px]:w-5 min-[1921px]:h-5" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6.75 13.5L11.25 9l-4.5-4.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
