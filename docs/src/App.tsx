import { useMemo, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/theme";
import { Sidebar } from "./components/Sidebar";
import { ComponentDetail } from "./components/ComponentDetail";
import { ComponentOverview } from "./components/ComponentOverview";
import { Header } from "./components/Header";
import { Introduction } from "./components/Introduction";

import { componentCategories, componentDocs, type ComponentCategoryId } from "./data/components";

const OVERVIEW_ID = "__overview__";

const AppLayout = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | ComponentCategoryId>("all");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
  
  // Determine active component from URL
  const activeId = params.componentId || OVERVIEW_ID;
  const activeDoc = useMemo(() => componentDocs.find((doc) => doc.id === activeId), [activeId]);
  const isOverview = location.pathname === '/overview';
  const isIntro = location.pathname === '/';

  const handleSelectComponent = (id: string) => {
    const doc = componentDocs.find((item) => item.id === id);
    if (doc) {
      setSelectedCategory(doc.category);
      navigate(`/components/react/base-component/${id}`);
    }
  };

  const handleSelectOverview = () => {
    navigate("/");
  };

  const getMainStyles = () => {
    if (isMobile) {
      return {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        marginLeft: '0',
        width: '100%',
        padding: '0',
        margin: '0',
        transition: 'all 0.3s ease-in-out',
        height: '100vh',
        overflow: 'hidden'
      };
    }
    return {
      flex: 1,
      display: 'flex',
      flexDirection: 'column' as const,
      marginLeft: sidebarCollapsed ? '64px' : '320px',
      width: sidebarCollapsed ? 'calc(100% - 64px)' : 'calc(100% - 320px)',
      padding: '0',
      margin: sidebarCollapsed ? '0 0 0 64px' : '0 0 0 320px',
      transition: 'all 0.3s ease-in-out',
      height: '100vh',
      overflow: 'hidden'
    };
  };

  return (
    <ThemeProvider>
      <div className="docs-shell">
        <Sidebar
          items={componentDocs}
          categories={componentCategories}
          activeId={activeId}
          overviewActive={isOverview}
          onSelect={handleSelectComponent}
          onSelectOverview={handleSelectOverview}
          onCollapsedChange={setSidebarCollapsed}
          isMobile={isMobile}
          mobileMenuOpen={mobileMenuOpen}
          onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <div style={getMainStyles()}>
          {isMobile && !mobileMenuOpen && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation"
              className="fixed top-4 left-4 z-50 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#151821] text-white border border-white/10 shadow-lg shadow-black/30 hover:bg-[#1e2535] active:scale-[0.98] transition-transform"
            >
              <span className="sr-only">Open navigation</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          )}
          {/* Header hidden temporarily
          <Header 
            sidebarCollapsed={sidebarCollapsed} 
            isMobile={isMobile}
            mobileMenuOpen={mobileMenuOpen}
            onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
          */}
          <div style={{ 
            paddingLeft: isMobile ? '1rem' : '0.25rem', 
            paddingRight: isMobile ? '1rem' : '1.5rem', 
            paddingTop: '1rem',
            paddingBottom: '0',
            margin: '0',
            flex: 1,
            overflowY: 'auto',
            height: '100%',
            minHeight: '100vh'
          }}>
            {isIntro ? (
              <Introduction />
            ) : activeDoc ? (
              <div style={{ 
                marginLeft: '0rem', 
                marginRight: '-1rem', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column' 
              }}>
                <ComponentDetail doc={activeDoc} />
              </div>
            ) : (
              <ComponentOverview
                docs={componentDocs}
                categories={componentCategories}
                search={search}
                selectedCategory={selectedCategory}
                onSearchChange={setSearch}
                onCategoryChange={setSelectedCategory}
                onSelectComponent={handleSelectComponent}
              />
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/overview" element={<AppLayout />} />
        <Route path="/components/react/base-component/:componentId" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
