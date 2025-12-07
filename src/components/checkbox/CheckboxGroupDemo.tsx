"use client";
import React, { useState } from 'react';
import CheckboxGroup from './CheckboxGroup';
import './CheckboxGroup.css';

// Custom icons for demo
const LayersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L3 7L12 12L21 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 17L12 22L21 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 12L12 17L21 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 22S8 18 8 12V6L12 4L16 6V12C16 18 12 22 12 22Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.84 4.61A5.5 5.5 0 0 0 16 2A5.5 5.5 0 0 0 12 4.61A5.5 5.5 0 0 0 8 2A5.5 5.5 0 0 0 3.16 4.61C1.46 6.31 1.46 9.09 3.16 10.79L12 19.63L20.84 10.79C22.54 9.09 22.54 6.31 20.84 4.61Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckboxGroupDemo: React.FC = () => {
  // const [selectedItems1, setSelectedItems1] = useState<string[]>([]);
  const [selectedItems2, setSelectedItems2] = useState<string[]>([]);

  const demoItems = [
    {
      id: 'gray-1',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'gray' as const,
    },
    {
      id: 'gray-2',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'gray' as const,
    },
    {
      id: 'gray-3',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'gray' as const,
      checked: true,
    },
    {
      id: 'gray-4',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'gray' as const,
      checked: true,
    },
    {
      id: 'red-1',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'red' as const,
    },
    {
      id: 'red-2',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'red' as const,
    },
    {
      id: 'red-3',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'red' as const,
      checked: true,
    },
    {
      id: 'red-4',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'red' as const,
      checked: true,
    },
    {
      id: 'blue-1',
      title: 'Title',
      description: 'Description',
      icon: <StarIcon />,
      variant: 'blue' as const,
    },
    {
      id: 'blue-2',
      title: 'Title',
      description: 'Description',
      icon: <StarIcon />,
      variant: 'blue' as const,
    },
    {
      id: 'blue-3',
      title: 'Title',
      description: 'Description',
      icon: <StarIcon />,
      variant: 'blue' as const,
      checked: true,
    },
    {
      id: 'blue-4',
      title: 'Title',
      description: 'Description',
      icon: <StarIcon />,
      variant: 'blue' as const,
      checked: true,
    },
    {
      id: 'purple-1',
      title: 'Title',
      description: 'Description',
      icon: <HeartIcon />,
      variant: 'purple' as const,
    },
    {
      id: 'purple-2',
      title: 'Title',
      description: 'Description',
      icon: <HeartIcon />,
      variant: 'purple' as const,
    },
    {
      id: 'purple-3',
      title: 'Title',
      description: 'Description',
      icon: <HeartIcon />,
      variant: 'purple' as const,
      checked: true,
    },
    {
      id: 'purple-4',
      title: 'Title',
      description: 'Description',
      icon: <HeartIcon />,
      variant: 'purple' as const,
      checked: true,
    },
    {
      id: 'orange-1',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'orange' as const,
    },
    {
      id: 'orange-2',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'orange' as const,
    },
    {
      id: 'orange-3',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'orange' as const,
      checked: true,
    },
    {
      id: 'orange-4',
      title: 'Title',
      description: 'Description',
      icon: <LayersIcon />,
      variant: 'orange' as const,
      checked: true,
    },
    {
      id: 'green-1',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'green' as const,
    },
    {
      id: 'green-2',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'green' as const,
    },
    {
      id: 'green-3',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'green' as const,
      checked: true,
    },
    {
      id: 'green-4',
      title: 'Title',
      description: 'Description',
      icon: <ShieldIcon />,
      variant: 'green' as const,
      checked: true,
    },
  ];

  const interactiveItems = [
    {
      id: 'feature-1',
      title: 'Basic Plan',
      description: 'Essential features for getting started',
      icon: <LayersIcon />,
      variant: 'blue' as const,
    },
    {
      id: 'feature-2',
      title: 'Pro Plan',
      description: 'Advanced features for professionals',
      icon: <StarIcon />,
      variant: 'purple' as const,
    },
    {
      id: 'feature-3',
      title: 'Enterprise',
      description: 'Full-scale solution for large teams',
      icon: <ShieldIcon />,
      variant: 'green' as const,
    },
    {
      id: 'feature-4',
      title: 'Premium Support',
      description: 'Priority customer support and training',
      icon: <HeartIcon />,
      variant: 'orange' as const,
    },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ 
          border: '2px dashed #a78bfa', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 32,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#7c3aed', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 18
          }}>
            ◈ Checkbox group
          </div>
          <CheckboxGroup
            items={demoItems}
            columns={4}
            size="medium"
            // onChange={(selected) => setSelectedItems1(selected)}
          />
        </div>

        <div style={{ 
          border: '2px dashed #10b981', 
          borderRadius: 12, 
          padding: 24, 
          marginBottom: 32,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#10b981', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 18
          }}>
            ◈ Interactive Example - Select Your Plan
          </div>
          <CheckboxGroup
            items={interactiveItems}
            columns={2}
            size="large"
            onChange={(selected) => setSelectedItems2(selected)}
          />
          <div style={{ marginTop: 16, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8 }}>
            <strong>Selected:</strong> {selectedItems2.length > 0 ? selectedItems2.join(', ') : 'None'}
          </div>
        </div>

        {/* <div style={{ 
          border: '2px dashed #f59e0b', 
          borderRadius: 12, 
          padding: 24,
          backgroundColor: 'white'
        }}>
          <div style={{ 
            color: '#f59e0b', 
            fontWeight: 600, 
            marginBottom: 16,
            fontSize: 18
          }}>
            ◈ Size Variations
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Small Size</h4>
            <CheckboxGroup
              items={interactiveItems.slice(0, 2)}
              columns={2}
              size="small"
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Medium Size</h4>
            <CheckboxGroup
              items={interactiveItems.slice(0, 2)}
              columns={2}
              size="medium"
            />
          </div>

          <div>
            <h4 style={{ margin: '0 0 8px 0', color: '#374151' }}>Large Size</h4>
            <CheckboxGroup
              items={interactiveItems.slice(0, 2)}
              columns={2}
              size="large"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CheckboxGroupDemo;