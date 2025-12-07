import { Button } from "@/components";
import { 
  Search, Home, Globe, Locate, MapPin,
  CheckCircle, AlertCircle, XCircle, Info,
  Menu, X, Plus, Minus, BellDot,
  Copy, Edit, Trash, Share, Download,
  Mail, Phone, MessageCircle,
  Play, Pause, Stop, Volume, Webcam,
  Lock, LockOpen, Shield, LockKeyhole,
  User, Users, Settings, Heart, Star
} from "@/components/icons";
import { useNavigate } from "react-router-dom";

export const Introduction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/components/react/base-component/button");
  };

  return (
    <div className="text-white pb-12">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 max-w-5xl">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-[#FFCB00] bg-opacity-20 text-[#FFCB00] rounded-full border border-[#FFCB00] border-opacity-30">
            v1.0.6
          </span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          Build beautiful React apps with{" "}
          <span className="text-[#FFCB00]">Andhera UI</span>
        </h1>
        
        <p className="text-base sm:text-lg text-gray-400 mb-6 sm:mb-8 max-w-2xl">
          A modern, accessible React component library built with Tailwind CSS. 
          Ship faster with 28+ production-ready components, full TypeScript support, 
          and a comprehensive icon set.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
          <Button variant="primary" size="large" onClick={handleGetStarted}>
            Get Started
          </Button>
          <a 
            href="https://github.com/bee-logical/andhera-react" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            View on GitHub
          </a>
        </div>

        {/* Installation */}
        <div className="bg-[#151821] rounded-xl p-4 sm:p-6 border border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Install</h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <code className="flex-1 bg-black px-4 py-3 rounded-lg font-mono text-xs sm:text-sm text-[#FFCB00] overflow-x-auto">
              npm install andhera-react
            </code>
            <button 
              className="px-4 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-colors self-end sm:self-auto"
              onClick={() => navigator.clipboard.writeText("npm install andhera-react")}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Why Andhera UI?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          <div className="bg-[#151821] rounded-xl p-5 border border-gray-800">
            <div className="w-10 h-10 bg-[#FFCB00] bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#FFCB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2">Production Ready</h3>
            <p className="text-gray-400 text-sm">28+ fully-tested components with accessibility built-in.</p>
          </div>
          
          <div className="bg-[#151821] rounded-xl p-5 border border-gray-800">
            <div className="w-10 h-10 bg-[#FFCB00] bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#FFCB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2">TypeScript First</h3>
            <p className="text-gray-400 text-sm">Full type definitions for all components out of the box.</p>
          </div>
          
          <div className="bg-[#151821] rounded-xl p-5 border border-gray-800">
            <div className="w-10 h-10 bg-[#FFCB00] bg-opacity-20 rounded-lg flex items-center justify-center mb-3">
              <svg className="w-5 h-5 text-[#FFCB00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-base font-semibold mb-2">Tailwind Powered</h3>
            <p className="text-gray-400 text-sm">Built with Tailwind CSS for easy customization.</p>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Quick Start</h2>
        
        {/* Components Import */}
        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Import Components</h3>
          <div className="bg-[#151821] rounded-lg sm:rounded-xl overflow-hidden border border-gray-800">
            <div className="px-3 sm:px-4 py-2 bg-black border-b border-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></span>
              <span className="ml-2 text-xs text-gray-500 truncate">App.tsx</span>
            </div>
            <pre className="p-3 sm:p-4 overflow-x-auto">
              <code className="text-xs sm:text-sm font-mono">{`import { Button, Input, Card, Dialog } from 'andhera-react';

function App() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary">Subscribe</Button>
    </Card>
  );
}`}</code>
            </pre>
          </div>
        </div>

        {/* Icons Import */}
        <div className="mb-5 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Import Icons</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
            Icons are available as a separate import to keep your bundle size small.
          </p>
          <div className="bg-[#151821] rounded-lg sm:rounded-xl overflow-hidden border border-gray-800">
            <div className="px-3 sm:px-4 py-2 bg-black border-b border-gray-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></span>
              <span className="ml-2 text-xs text-gray-500 truncate">SearchInput.tsx</span>
            </div>
            <pre className="p-3 sm:p-4 overflow-x-auto">
              <code className="text-xs sm:text-sm font-mono">{`import { Input } from 'andhera-react';
import { Search, CheckCircle } from 'andhera-react/icons';

function SearchInput() {
  return (
    <Input 
      label="Search"
      placeholder="Search..."
      startIcon={<Search size={20} color="#8A8F9B" />}
      endIcon={<CheckCircle size={20} color="#00C951" />}
    />
  );
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Available Components */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Available Components</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-6">
          {[
            { name: "Button", id: "button" },
            { name: "Checkbox", id: "checkbox" },
            { name: "Dialog", id: "dialog" },
            { name: "Input", id: "input" },
            { name: "Radio Group", id: "radio-group" },
            { name: "Slider", id: "slider" },
            { name: "Snackbar", id: "snackbar" },
            { name: "Toggle Button", id: "toggle-button" },
            { name: "Toggle Switch", id: "toggle-switch" },
            { name: "Chip", id: "chip" },
          ].map((component) => (
            <button
              key={component.id}
              onClick={() => navigate(`/components/react/base-component/${component.id}`)}
              className="bg-[#151821] hover:bg-[#1a1f2e] border border-gray-800 hover:border-[#FFCB00] hover:border-opacity-50 rounded-lg px-2 sm:px-3 py-2 text-left transition-all text-xs sm:text-sm"
            >
              <span className="text-white font-medium">{component.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Available Icons */}
      <section className="px-4 sm:px-6 py-8 sm:py-10 max-w-5xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-3">Icon Library</h2>
        <p className="text-gray-400 text-xs sm:text-sm mb-5 sm:mb-6">
          100+ SVG icons organized by category. Import from <code className="text-[#FFCB00]">andhera-react/icons</code>.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          {/* Navigation */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Navigation</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Search size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Search</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Home size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Home</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Globe size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Globe</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Locate size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Locate</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MapPin size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">MapPin</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Status</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <CheckCircle size={20} color="#00C951" />
                <span className="text-xs text-gray-500">CheckCircle</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <AlertCircle size={20} color="#FF6900" />
                <span className="text-xs text-gray-500">AlertCircle</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <XCircle size={20} color="#FB2C36" />
                <span className="text-xs text-gray-500">XCircle</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Info size={20} color="#3B82F6" />
                <span className="text-xs text-gray-500">Info</span>
              </div>
            </div>
          </div>

          {/* Interface */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Interface</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Menu size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Menu</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <X size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">X</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Plus size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Plus</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Minus size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Minus</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BellDot size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">BellDot</span>
              </div>
            </div>
          </div>

          {/* Utility */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Utility</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Copy size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Copy</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Edit size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Edit</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Trash size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Trash</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Share size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Share</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Download size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Download</span>
              </div>
            </div>
          </div>

          {/* Communication */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Communication</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Mail size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Mail</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Phone size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Phone</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageCircle size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">MessageCircle</span>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Media</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Play size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Play</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Pause size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Pause</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Stop size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Stop</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Volume size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Volume</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Webcam size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Webcam</span>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">Security</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <Lock size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Lock</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <LockOpen size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">LockOpen</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Shield size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Shield</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <LockKeyhole size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">LockKeyhole</span>
              </div>
            </div>
          </div>

          {/* General */}
          <div className="bg-[#151821] rounded-lg p-4 border border-gray-800">
            <h4 className="font-semibold text-sm mb-3 text-[#FFCB00]">General</h4>
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col items-center gap-1">
                <User size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">User</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Users size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Users</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Settings size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Settings</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Heart size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Heart</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Star size={20} color="#a1a1a1" />
                <span className="text-xs text-gray-500">Star</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#151821] rounded-lg sm:rounded-xl overflow-hidden border border-gray-800">
          <div className="px-3 sm:px-4 py-2 bg-black border-b border-gray-800">
            <span className="text-xs text-gray-500">Example import</span>
          </div>
          <pre className="p-3 sm:p-4 overflow-x-auto">
            <code className="text-xs sm:text-sm font-mono">{`import { Search, CheckCircle, AlertCircle, User, Settings } from 'andhera-react/icons';`}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};
