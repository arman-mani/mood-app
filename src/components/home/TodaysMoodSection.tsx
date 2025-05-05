import React from 'react';
import { TodaysMoodCard } from '@/components/mood/TodaysMoodCard';
import { TodaysSleepCard } from '@/components/mood/TodaysSleepCard';
import { TodaysReflectionCard } from '@/components/mood/TodaysReflectionCard';
import { MoodEntry } from '@/types/mood';

interface TodaysMoodSectionProps {
  todaysMood: MoodEntry | undefined;
  todaysMoodIndex: number | null;
}

export const TodaysMoodSection: React.FC<TodaysMoodSectionProps> = ({ 
  todaysMood, 
  todaysMoodIndex 
}) => {
  if (!todaysMood) return null;

  return (
    <div className="flex flex-col lg:flex-row w-full gap-[20px] mb-[20px] lg:gap-[16px] lg:mb-[16px]">
      <TodaysMoodCard
        mood={todaysMood.mood}
        moodIndex={todaysMoodIndex}
      />
      <div className="flex flex-col w-full lg:flex-1 gap-[20px] lg:gap-4">
        {todaysMood.sleep && (
          <TodaysSleepCard sleep={todaysMood.sleep} />
        )}
        {todaysMood.journal && (
          <TodaysReflectionCard reflection={todaysMood.journal} />
        )}
      </div>
    </div>
  );
}; 