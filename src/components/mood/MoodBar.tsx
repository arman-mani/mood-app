import { useState } from 'react';
import Image from 'next/image'
import { MoodPopover } from './MoodPopover';

interface MoodBarProps {
  height?: number
  color?: string
  iconSrc?: string
  moodData?: {
    mood: string;
    sleep?: string;
    journal?: string;
    tags?: string[];
  };
  barIndex?: number;
  totalBars?: number;
}

export function MoodBar({ 
  height = 165,
  color = '#B8B1FF', 
  iconSrc = '/assets/images/icon-sad-white.svg',
  moodData,
  barIndex = 0,
  totalBars = 11
}: MoodBarProps) {
  const [showPopover, setShowPopover] = useState(false);

  // Determine if popover should appear on left or right
  // For bars near the right edge, show popover on the left side
  const position = barIndex > (totalBars / 2) ? 'left' : 'right';

  return (
    <div className="relative">
      <div 
        className="flex flex-col items-center gap-[55px] w-[40px] cursor-pointer transition-opacity hover:opacity-80"
        style={{ height: `${height}px` }}
        onClick={() => moodData && setShowPopover(!showPopover)}
        title={moodData ? "Click for details" : "No data available"}
      >
        <div 
          className="w-full h-full rounded-[999px] relative"
          style={{ background: color }}
        >
          <div className="absolute top-2 left-0 w-full flex justify-center">
            <Image 
              src={iconSrc}
              alt="Mood icon"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
      
      {/* Popover only shows when clicked and when mood data exists */}
      {showPopover && moodData && (
        <MoodPopover
          mood={moodData.mood}
          sleep={moodData.sleep}
          reflection={moodData.journal}
          tags={moodData.tags}
          position={position}
        />
      )}
    </div>
  )
} 