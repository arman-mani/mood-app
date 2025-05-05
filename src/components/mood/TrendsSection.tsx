import React, { useMemo } from 'react'
import { SleepBar } from './SleepBar'
import { DateBar } from './DateBar'
import { TrendLine } from './TrendLine'
import { MoodBar } from './MoodBar'

interface MoodEntry {
  date: Date;
  mood: string;
  color: string;
  icon: string;
  height: number;
  journal?: string;
  sleep?: string;
  tags?: string[];
}

type ProcessedMoodDataWithoutEntry = {
  height: number;
  color: string;
  icon: string;
  show: false;
  data: null;
}

type ProcessedMoodDataWithEntry = {
  height: number;
  color: string;
  icon: string;
  show: true;
  data: MoodEntry;
}

type ProcessedMoodData = ProcessedMoodDataWithoutEntry | ProcessedMoodDataWithEntry;

interface TrendsSectionProps {
  moodData: MoodEntry[];
}

export function TrendsSection({ moodData }: TrendsSectionProps) {
  const dates = useMemo(() => {
    const result = []
    const today = new Date()
    
    for (let i = 10; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      result.push(date)
    }
    
    return result
  }, [])

  // Process the mood data to align with the dates
  const processedMoodData = useMemo(() => {
    // Create an array with placeholders for each date
    const result: ProcessedMoodData[] = Array(11).fill(null).map(() => ({
      height: 0,
      color: '',
      icon: '',
      show: false,
      data: null
    }))
    
    // Map the mood entries to the corresponding dates
    dates.forEach((date, index) => {
      // Find a mood entry for this date
      const entry = moodData.find(entry => 
        entry.date.getDate() === date.getDate() &&
        entry.date.getMonth() === date.getMonth() &&
        entry.date.getFullYear() === date.getFullYear()
      )
      
      if (entry) {
        result[index] = {
          height: entry.height,
          color: entry.color,
          icon: entry.icon,
          show: true,
          data: entry
        }
      }
    })
    
    return result
  }, [dates, moodData])

  return (
    <div className="flex flex-col items-start gap-[32px] flex-1 p-[32px] rounded-[16px] border border-blue-100 bg-neutral-0 min-w-[min-content] overflow-x-auto">
      <h2 className="font-reddit text-[28px] lg:text-[32px] leading-[130%] font-bold text-neutral-900 tracking-[-0.3px]">
        Mood and sleep trends
      </h2>
      <div className="flex h-[312px] items-end gap-4 self-stretch relative min-w-[700px] md:min-w-[600px]">
        <SleepBar />
        <div className="flex h-full items-end gap-4 flex-1 relative">
          {[0, 1, 2, 3, 4].map((index) => (
            <TrendLine key={index} top={6 + index * 60} />
          ))}
          <div className="flex gap-4 w-full absolute bottom-0">
            {dates.map((date, index) => (
              <div key={date.toISOString()} className="relative flex flex-col items-center">
                <div className="absolute bottom-[43px]">
                  {processedMoodData[index].show && processedMoodData[index].data && (
                    <MoodBar 
                      height={processedMoodData[index].height} 
                      color={processedMoodData[index].color} 
                      iconSrc={processedMoodData[index].icon} 
                      moodData={{
                        mood: processedMoodData[index].data!.mood,
                        sleep: processedMoodData[index].data!.sleep,
                        journal: processedMoodData[index].data!.journal,
                        tags: processedMoodData[index].data!.tags
                      }}
                      barIndex={index}
                      totalBars={dates.length}
                    />
                  )}
                </div>
                <DateBar date={date} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 