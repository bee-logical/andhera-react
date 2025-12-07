import React from 'react';
import Breadcrumb, { BreadcrumbItem } from './Breadcrumb';
import './Breadcrumb.css';


const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const BreadcrumbDemo: React.FC = () => {
  const basicItems: BreadcrumbItem[] = [
    { label: 'Parent', href: '#' },
    { label: 'Child', href: '#' },
    { label: 'Sub Option', href: '#' },
    { label: 'The Chosen One' },
  ];

  const iconItems: BreadcrumbItem[] = [
    { label: 'Home', href: '#', icon: <UsersIcon /> },
    { label: 'Parent', href: '#', icon: <UsersIcon /> },
    { label: 'Child', href: '#', icon: <UsersIcon /> },
    { label: 'Sub Option', href: '#', icon: <UsersIcon /> },
    { label: 'The Chosen One', icon: <UsersIcon /> },
  ];

  const stepItems: BreadcrumbItem[] = [
    { label: 'Cart', href: '#' },
    { label: 'Delivery', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Billing' },
    { label: 'Over View' },
  ];

  const pillItems: BreadcrumbItem[] = [
    { label: 'Cart', href: '#' },
    { label: 'Delivery', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Billing' },
    { label: 'Over View' },
  ];

  const arrowItems: BreadcrumbItem[] = [
    { label: 'Cart', href: '#' },
    { label: 'Delivery', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Billing' },
    { label: 'Over View' },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Default Breadcrumb */}
        <div style={{ 
          border: '2px dashed #a78bfa', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#7c3aed', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Default Breadcrumb with Chevron
          </div>
          <Breadcrumb items={basicItems} />
        </div>

        {/* With Icons */}
        <div style={{ 
          border: '2px dashed #3b82f6', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#3b82f6', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Breadcrumb with Icons
          </div>
          <Breadcrumb 
            items={iconItems} 
            variant="with-icons"
            showHome={false}
        
          />
        </div>

        {/* With Steps */}
        <div style={{ 
          border: '2px dashed #10b981', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#10b981', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Breadcrumb with Steps (Stepper)
          </div>
          <Breadcrumb 
            items={stepItems} 
            stepLineWidth={8}
            variant="with-steps"
            showHome={false}
           
          />
        </div>

        {/* Pills Variant */}
        <div style={{ 
          border: '2px dashed #f59e0b', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#f59e0b', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Breadcrumb Pills
          </div>
          <Breadcrumb 
            items={pillItems} 
            variant="pills"
            showHome={false}
          />
        </div>

        {/* Arrows Variant */}
        <div style={{ 
          border: '2px dashed #ef4444', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#ef4444', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Breadcrumb with Arrows
          </div>
          <Breadcrumb 
            items={arrowItems} 
            variant="arrows"
            showHome={false}
          />
        </div>

        {/* Different Separators */}
        <div style={{ 
          border: '2px dashed #8b5cf6', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#8b5cf6', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Different Separators
          </div>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>Chevron Separator</h4>
            <Breadcrumb items={basicItems} separator="chevron" />
          </div>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>Slash Separator</h4>
            <Breadcrumb items={basicItems} separator="slash" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>Arrow Separator</h4>
            <Breadcrumb items={basicItems} separator="arrow" />
          </div>
        </div>

        {/* Size Variations */}
        <div style={{ 
          border: '2px dashed #06b6d4', 
          borderRadius: 12, 
          padding: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#06b6d4', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 16
          }}>
            ◈ Size Variations
          </div>
          <div style={{ marginBottom: 16 }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>Medium Size (Default)</h4>
            <Breadcrumb items={basicItems} size="medium" />
          </div>
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: 13, color: '#6b7280' }}>Large Size</h4>
            <Breadcrumb items={basicItems} size="large" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbDemo;