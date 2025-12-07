import React from 'react';
import { 
  AArrowDown, 
  AArrowUp, 
  CalendarCheck, 
  BarChart, 
  Archive, 
  Award, 
  BellDot 
} from './index';

const IconShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-6">
      {/* Arrows */}
      <div className="flex flex-col items-center gap-2">
        <AArrowDown size={24} color="#ffcb00" />
        <span className="text-xs">Arrow Down</span>
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <AArrowUp size={24} color="#ffcb00" />
        <span className="text-xs">Arrow Up</span>
      </div>
      
      {/* Calendar */}
      <div className="flex flex-col items-center gap-2">
        <CalendarCheck size={24} color="#ffcb00" />
        <span className="text-xs">Calendar</span>
      </div>
      
      {/* Charts */}
      <div className="flex flex-col items-center gap-2">
        <BarChart size={24} color="#ffcb00" />
        <span className="text-xs">Bar Chart</span>
      </div>
      
      {/* Files */}
      <div className="flex flex-col items-center gap-2">
        <Archive size={24} color="#ffcb00" />
        <span className="text-xs">Archive</span>
      </div>
      
      {/* General */}
      <div className="flex flex-col items-center gap-2">
        <Award size={24} color="#ffcb00" />
        <span className="text-xs">Award</span>
      </div>
      
      {/* Interface */}
      <div className="flex flex-col items-center gap-2">
        <BellDot size={24} color="#ffcb00" />
        <span className="text-xs">Notification</span>
      </div>
      
      {/* Different sizes */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <AArrowDown size={16} />
          <AArrowDown size={20} />
          <AArrowDown size={24} />
        </div>
        <span className="text-xs">Sizes</span>
      </div>
    </div>
  );
};

export default IconShowcase;