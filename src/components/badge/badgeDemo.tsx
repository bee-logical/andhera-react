/**
 * BadgeDemo Component
 * --------------------------------------------
 * Interactive playground for the Badge component.
 * - Toggle variants, sizes, positions, offsets
 * - Demonstrates dots, counts, and clickable badges
 * - Uses only Tailwind utility classes, no external CSS
 */

import React, { useState } from 'react';
import Badge from './badge';

// Inline SVG Mail Icon (example child)
const MailIcon = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-gray-700"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" ry="2"></rect>
    <polyline points="3 6 12 13 21 6"></polyline>
  </svg>
);

const BadgeDemo: React.FC = () => {
  const [variant, setVariant] = useState<'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'muted'>(
    'primary'
  );
  const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [dot, setDot] = useState(false);
  const [pos, setPos] = useState<{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }>({
    vertical: 'top',
    horizontal: 'right',
  });
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickable, setClickable] = useState(false);

  const handleClick = () => alert('Badge clicked!');

  return (
    <div className="p-6 space-y-8 text-center">
      <h1 className="text-xl font-semibold">Badge Component Demo</h1>

      
        <div className="flex flex-wrap justify-center gap-10">

            <Badge
              count={500}
              variant={variant}
              size="sm"
              shape="circle"
              dot={true}
              position={{ vertical: 'bottom', horizontal: 'left' }}
              offset={{ x: -1, y: -3 } }
              onClick={clickable ? handleClick : undefined}
              animated
            >
              <MailIcon />
            </Badge>
            </div>

      <div className="flex flex-wrap justify-center gap-10">
        <Badge
          count={5}
          variant={variant}
          size={size}
          dot={dot}
          position={pos}
          offset={offset}
          onClick={clickable ? handleClick : undefined}
          animated
        >
          <MailIcon />
        </Badge>

        <Badge
          count={120}
          maxCount={99}
          variant={variant}
          size={size}
          position={pos}
          offset={offset}
          animated
        >
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">A</div>
        </Badge>

        <Badge
          dot
          variant={variant}
          size={size}
          position={pos}
          offset={offset}
        >
          <div className="w-16 h-16 bg-gray-300 flex items-center justify-center">□</div>
        </Badge>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center text-left">
        <div>
          <label className="block font-medium mb-1">Variant</label>
          <select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="border rounded px-2 py-1"
          >
            <option value="default">default</option>
            <option value="primary">primary</option>
            <option value="success">success</option>
            <option value="danger">danger</option>
            <option value="warning">warning</option>
            <option value="info">info</option>
            <option value="muted">muted</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="border rounded px-2 py-1"
          >
            <option value="xs">xs</option>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
            <option value="xl">xl</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Dot</label>
          <input
            type="checkbox"
            checked={dot}
            onChange={(e) => setDot(e.target.checked)}
            className="ml-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Clickable</label>
          <input
            type="checkbox"
            checked={clickable}
            onChange={(e) => setClickable(e.target.checked)}
            className="ml-2"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center">
        <div>
          <label className="block font-medium mb-1">Position Vertical</label>
          <select
            value={pos.vertical}
            onChange={(e) => setPos((prev) => ({ ...prev, vertical: e.target.value as any }))}
            className="border rounded px-2 py-1"
          >
            <option value="top">top</option>
            <option value="bottom">bottom</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Position Horizontal</label>
          <select
            value={pos.horizontal}
            onChange={(e) => setPos((prev) => ({ ...prev, horizontal: e.target.value as any }))}
            className="border rounded px-2 py-1"
          >
            <option value="left">left</option>
            <option value="right">right</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Offset X (px)</label>
          <input
            type="number"
            value={offset.x}
            onChange={(e) => setOffset({ ...offset, x: parseInt(e.target.value) || 0 })}
            className="border rounded px-2 py-1 w-20"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Offset Y (px)</label>
          <input
            type="number"
            value={offset.y}
            onChange={(e) => setOffset({ ...offset, y: parseInt(e.target.value) || 0 })}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      </div>
    </div>
  );
};

export default BadgeDemo;
