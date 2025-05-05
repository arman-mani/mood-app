'use client'

import { Button } from '@/components/ui/button'
import { AverageMoodCard } from '@/components/mood/AverageMoodCard'
import { StatsContainer } from '@/components/mood/StatsContainer'
import { TrendsSection } from '@/components/mood/TrendsSection'
import { MoodLogModal } from '@/components/mood/MoodLogModal'
import { TodaysMoodCard } from '@/components/mood/TodaysMoodCard'
import { TodaysReflectionCard } from '@/components/mood/TodaysReflectionCard'
import { TodaysSleepCard } from '@/components/mood/TodaysSleepCard'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/layout/Navbar'

// Define the type for a mood entry
type MoodEntry = {
  date: Date;
  mood: string;
  color: string;
  icon: string;
  height: number; // The height for the chart bar
  journal?: string; // Optional journal entry
  sleep?: string; // Optional sleep duration
  tags?: string[]; // Optional tags
};

// Helper function to check if two dates are the same day
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Map mood strings to mood index for quotes
const moodToIndex: Record<string, number> = {
  'Very Happy': 2,
  'Happy': 1,
  'Neutral': 0,
  'Sad': -1,
  'Very Sad': -2
};

// Define colors and icons mapping for different moods (for the modal and new entries)
const moodConfig: Record<string, { color: string; icon: string; height: number }> = {
  'Very Happy': { color: '#FFC97C', icon: '/assets/images/icon-happy-white.svg', height: 263 },
  'Happy': { color: '#88FF7B', icon: '/assets/images/icon-happy-white.svg', height: 214 },
  'Neutral': { color: '#85CAFF', icon: '/assets/images/icon-neutral-white.svg', height: 165 },
  'Sad': { color: '#B8B1FF', icon: '/assets/images/icon-sad-white.svg', height: 104 },
  'Very Sad': { color: '#FF9B99', icon: '/assets/images/icon-sad-white.svg', height: 104 }
};

export default function Home() {
  const [currentDate, setCurrentDate] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])

  // Check if user has already logged mood today
  const todaysMood = useMemo(() => {
    const today = new Date();
    return moodEntries.find(entry => isSameDay(entry.date, today));
  }, [moodEntries]);

  // Get the mood index for quotes based on today's mood
  const todaysMoodIndex = useMemo(() => {
    if (!todaysMood) return null;
    return moodToIndex[todaysMood.mood] || null;
  }, [todaysMood]);

  // Calculate average mood for display in the stats card
  const getAverageMood = () => {
    if (moodEntries.length < 5) {
      return { 
        mood: null,
        message: "Neutral", 
        description: "Log 5 check-ins to see your average mood.",
        color: '#85CAFF', // Default blue color
        icon: '/assets/images/icon-neutral-white.svg',
        comparison: 'same' as const
      };
    }
    
    // Logic to determine average mood
    const recentEntries = [...moodEntries].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    const moodValues = {
      'Very Happy': 5,
      'Happy': 4,
      'Neutral': 3,
      'Sad': 2,
      'Very Sad': 1
    };
    
    console.log('Recent mood entries (newest first):', 
      recentEntries.map(entry => ({
        date: entry.date.toLocaleDateString(),
        mood: entry.mood,
        value: moodValues[entry.mood as keyof typeof moodValues]
      }))
    );
    
    const avgValue = recentEntries.reduce((sum, entry) => sum + moodValues[entry.mood as keyof typeof moodValues], 0) / recentEntries.length;
    console.log('Average value calculated:', avgValue.toFixed(2));
    
    let avgMood = 'Neutral';
    
    if (avgValue >= 4.5) avgMood = 'Very Happy';
    else if (avgValue >= 3.5) avgMood = 'Happy';
    else if (avgValue >= 2.5) avgMood = 'Neutral';
    else if (avgValue >= 1.5) avgMood = 'Sad';
    else avgMood = 'Very Sad';

    console.log('Final avgMood selected:', avgMood);

    // Determine comparison with previous moods
    let comparison: 'increase' | 'same' | 'decrease' = 'same';
    
    // If we have more than 10 entries, we can compare current 5 with previous 5
    if (moodEntries.length >= 10) {
      const previousEntries = [...moodEntries]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(5, 10);
      
      const previousAvgValue = previousEntries.reduce((sum, entry) => sum + moodValues[entry.mood as keyof typeof moodValues], 0) / previousEntries.length;
      
      if (avgValue > previousAvgValue + 0.5) {
        comparison = 'increase';
      } else if (avgValue < previousAvgValue - 0.5) {
        comparison = 'decrease';
      } else {
        comparison = 'same';
      }
    }

    // Get the color and icon for the average mood
    const moodColor = moodConfig[avgMood].color;
    const moodIcon = avgMood === 'Very Happy' || avgMood === 'Happy' 
      ? '/assets/images/icon-happy-white.svg'
      : avgMood === 'Neutral' 
        ? '/assets/images/icon-neutral-white.svg'
        : '/assets/images/icon-sad-white.svg';
    
    return { 
      mood: avgMood,
      message: avgMood,
      description: "Based on your last 5 check-ins",
      color: moodColor,
      icon: moodIcon,
      comparison
    };
  };

  // Calculate average sleep for display in the stats card
  const getAverageSleep = () => {
    // Filter entries that have sleep data
    const entriesWithSleep = moodEntries.filter(entry => entry.sleep);
    
    if (entriesWithSleep.length < 5) {
      return {
        sleep: null,
        message: "5-6 Hours",
        description: "Track 5 nights to view average sleep.",
        color: '#4865DB', // Default blue color
        icon: '/assets/images/icon-sleep.svg',
        comparison: 'same' as const
      };
    }
    
    // Get the 5 most recent entries with sleep data
    const recentSleepEntries = [...entriesWithSleep]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
    
    // Map sleep strings to numeric values for calculation
    const sleepValues = {
      '9+ hours': 9,
      '7-8 hours': 7.5,
      '5-6 hours': 5.5,
      '3-4 hours': 3.5,
      '0-2 hours': 1
    };
    
    // Calculate average sleep hours
    const totalSleepHours = recentSleepEntries.reduce((sum, entry) => {
      const sleepHours = sleepValues[entry.sleep as keyof typeof sleepValues] || 0;
      return sum + sleepHours;
    }, 0);
    
    const avgSleepHours = totalSleepHours / recentSleepEntries.length;
    
    // Determine sleep category based on average hours
    let sleepCategory: string;
    let sleepColor: string;
    let comparison: 'increase' | 'same' | 'decrease' = 'same';
    
    if (avgSleepHours >= 9) {
      sleepCategory = '9+ hours';
      sleepColor = '#88FF7B'; // Green for optimal sleep
      comparison = 'increase';
    } else if (avgSleepHours >= 7) {
      sleepCategory = '7-8 hours';
      sleepColor = '#88FF7B'; // Green for good sleep
      comparison = 'increase';
    } else if (avgSleepHours >= 5) {
      sleepCategory = '5-6 hours';
      sleepColor = '#85CAFF'; // Blue for adequate sleep
      comparison = 'same';
    } else if (avgSleepHours >= 3) {
      sleepCategory = '3-4 hours';
      sleepColor = '#B8B1FF'; // Purple for poor sleep
      comparison = 'decrease';
    } else {
      sleepCategory = '0-2 hours';
      sleepColor = '#FF9B99'; // Red for very poor sleep
      comparison = 'decrease';
    }
    
    return {
      sleep: sleepCategory,
      message: sleepCategory,
      description: "Based on your last 5 check-ins",
      color: sleepColor,
      icon: '/assets/images/icon-sleep.svg',
      comparison
    };
  };

  const avgMood = getAverageMood();
  const avgSleep = getAverageSleep();

  console.log(`Average Mood - mood: ${avgMood.mood}, color: ${avgMood.mood ? moodConfig[avgMood.mood]?.color : 'null'}`);

  useEffect(() => {
    const updateDate = () => {
      const date = new Date()
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }
      setCurrentDate(date.toLocaleDateString('en-US', options))
    }
    
    updateDate()
    // Update every minute to keep the date current
    const interval = setInterval(updateDate, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const handleLogMood = (mood: string, journal?: string, sleep?: string, tags?: string[]) => {
    const today = new Date();
    const newEntry: MoodEntry = {
      date: today,
      mood: mood,
      journal: journal,
      sleep: sleep,
      tags: tags,
      ...moodConfig[mood]
    };
    
    // Check if there's already an entry for today
    const updatedEntries = [...moodEntries];
    const todayIndex = updatedEntries.findIndex(entry => isSameDay(entry.date, today));
    
    if (todayIndex !== -1) {
      // Update existing entry
      updatedEntries[todayIndex] = newEntry;
    } else {
      // Add new entry
      updatedEntries.push(newEntry);
    }
    
    setMoodEntries(updatedEntries);
  }

  const getButtonText = () => {
    // Always show "Log today's mood" regardless of whether user is creating or updating
    return "Log today's mood";
  }

  return (
    <>
      {/* Use the Navbar component with popover functionality */}
      <Navbar />
      
      <main className="flex flex-col items-center gap-[64px] pb-[80px] w-[375px] md:w-[768px] lg:w-[1440px] mx-auto">
        <div className="flex flex-col items-center gap-4 w-full px-4 border-none">
          <p className="w-full text-[24px] leading-[130%] font-bold text-blue-600 text-center font-reddit tracking-[-0.3px] border-none">
            Hello, Lisa!
          </p>
          <h1 className="w-full text-[46px] lg:text-[52px] leading-[120%] font-bold text-neutral-900 text-center font-reddit tracking-[-2px] lg:tracking-normal">
            How are you feeling today?
          </h1>
          <p className="w-full font-reddit text-[18px] leading-[120%] font-medium text-neutral-600 text-center">
            {currentDate}
          </p>
        </div>
        <Button 
          className="font-reddit text-[20px] font-semibold leading-[140%] text-neutral-0"
          onClick={() => setIsModalOpen(true)}
        >
          {getButtonText()}
        </Button>
        
        {/* Today's mood card and stats container wrapper */}
        <div className="flex flex-col w-full max-w-[1170px] px-4">
          {/* Today's mood card - only visible when mood is logged for today */}
          {todaysMood && (
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
          )}
          
          <div className="flex flex-col lg:flex-row w-full gap-[20px] lg:gap-[32px]">
            <div className="flex flex-col gap-[20px] w-full lg:gap-[32px] lg:w-auto">
              <StatsContainer>
                <AverageMoodCard
                  title="Average Mood"
                  subtitle="Last 5 Check-ins"
                  message={avgMood.message}
                  description={avgMood.description}
                  color={avgMood.color}
                  icon={avgMood.icon}
                  comparison={avgMood.comparison}
                  variant="mood"
                />
                <AverageMoodCard
                  title="Average Sleep"
                  subtitle="Last 5 Check-ins"
                  message={avgSleep.message}
                  description={avgSleep.description}
                  color={avgSleep.color}
                  icon={avgSleep.icon}
                  comparison={avgSleep.comparison}
                />
              </StatsContainer>
            </div>
            <div className="w-full lg:flex-1 overflow-x-auto">
              <TrendsSection moodData={moodEntries} />
            </div>
          </div>
        </div>
        
        <MoodLogModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleLogMood}
          initialMood={todaysMood?.mood}
        />
      </main>
    </>
  )
}
