import React from 'react';
import { AverageMoodCard } from '@/components/mood/AverageMoodCard';
import { StatsContainer } from '@/components/mood/StatsContainer';
import { TrendsSection } from '@/components/mood/TrendsSection';
import { MoodEntry, AverageStats } from '@/types/mood';

interface StatsAndTrendsSectionProps {
  moodData: MoodEntry[];
  averageMood: AverageStats;
  averageSleep: AverageStats;
}

export const StatsAndTrendsSection: React.FC<StatsAndTrendsSectionProps> = ({ 
  moodData, 
  averageMood, 
  averageSleep 
}) => {
  return (
    <div className="flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[32px]">
      <div className="flex flex-col gap-[20px] w-full lg:gap-[32px] lg:w-auto">
        <StatsContainer>
          <AverageMoodCard
            title="Average Mood"
            subtitle="Last 5 Check-ins"
            message={averageMood.message}
            description={averageMood.description}
            color={averageMood.color}
            icon={averageMood.icon}
            comparison={averageMood.comparison}
            variant="mood"
          />
          <AverageMoodCard
            title="Average Sleep"
            subtitle="Last 5 Check-ins"
            message={averageSleep.message}
            description={averageSleep.description}
            color={averageSleep.color}
            icon={averageSleep.icon}
            comparison={averageSleep.comparison}
          />
        </StatsContainer>
      </div>
      <div className="w-full lg:flex-1 overflow-x-auto">
        <TrendsSection moodData={moodData} />
      </div>
    </div>
  );
}; 