import { useState, useEffect, useMemo } from 'react';
import { MoodEntry, AverageStats } from '@/types/mood';
import { isSameDay } from '@/utils/date';
import { moodConfig, moodToIndex, moodValues, sleepValues } from '@/utils/moodConfig';
import { useAuth } from '@/contexts/AuthContext';

export const useMoodData = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load mood data from API when component mounts
  useEffect(() => {
    const loadMoodData = async () => {
      try {
        const idToken = await currentUser?.getIdToken();
        if (!idToken) {
          throw new Error('No authentication token available');
        }

        const response = await fetch('/api/mood', {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch mood data');
        }

        const logs = await response.json();
        console.log('Loaded mood logs:', logs);
        
        // Convert logs to MoodEntry format
        const entries = logs.map((log: any) => {
          const moodValue = log.mood;
          const moodName = Object.entries(moodValues).find(([_, value]) => value === moodValue)?.[0] || 'Neutral';
          return {
            date: new Date(log.date),
            mood: moodName,
            journal: log.notes,
            sleep: log.sleepHours ? `${log.sleepHours} hours` : undefined,
            tags: log.tags,
            ...moodConfig[moodName]
          };
        });
        
        setMoodEntries(entries);
      } catch (error) {
        console.error('Error loading mood data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMoodData();
  }, []);

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
  
  const getAverageMood = (): AverageStats => {
    if (moodEntries.length < 5) {
      return { 
        mood: null,
        message: "Neutral", 
        description: "Log 5 check-ins to see your average mood.",
        color: '#85CAFF', // Default blue color
        icon: '/assets/images/icon-neutral-white.svg',
        comparison: 'same'
      };
    }
    
    // Logic to determine average mood
    const recentEntries = [...moodEntries].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    
    const avgValue = recentEntries.reduce((sum, entry) => {
      return sum + (moodValues[entry.mood as keyof typeof moodValues] || 3);
    }, 0) / recentEntries.length;
    
    let avgMood = 'Neutral';
    
    if (avgValue >= 4.5) avgMood = 'Very Happy';
    else if (avgValue >= 3.5) avgMood = 'Happy';
    else if (avgValue >= 2.5) avgMood = 'Neutral';
    else if (avgValue >= 1.5) avgMood = 'Sad';
    else avgMood = 'Very Sad';

    // Determine comparison with previous moods
    let comparison: 'increase' | 'same' | 'decrease' = 'same';
    
    // If we have more than 10 entries, we can compare current 5 with previous 5
    if (moodEntries.length >= 10) {
      const previousEntries = [...moodEntries]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(5, 10);
      
      const previousAvgValue = previousEntries.reduce((sum, entry) => {
        return sum + (moodValues[entry.mood as keyof typeof moodValues] || 3);
      }, 0) / previousEntries.length;
      
      if (avgValue > previousAvgValue + 0.5) {
        comparison = 'increase';
      } else if (avgValue < previousAvgValue - 0.5) {
        comparison = 'decrease';
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
  
  const getAverageSleep = (): AverageStats => {
    // Filter entries that have sleep data
    const entriesWithSleep = moodEntries.filter(entry => entry.sleep);
    
    if (entriesWithSleep.length < 5) {
      return {
        mood: null,
        message: "5-6 Hours",
        description: "Track 5 nights to view average sleep.",
        color: '#4865DB', // Default blue color
        icon: '/assets/images/icon-sleep.svg',
        comparison: 'same'
      };
    }
    
    // Get the 5 most recent entries with sleep data
    const recentSleepEntries = [...entriesWithSleep]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);
    
    // Calculate average sleep hours
    const totalSleepHours = recentSleepEntries.reduce((sum, entry) => {
      if (!entry.sleep) return sum;
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
      mood: sleepCategory,
      message: sleepCategory,
      description: "Based on your last 5 check-ins",
      color: sleepColor,
      icon: '/assets/images/icon-sleep.svg',
      comparison
    };
  };
  
  const handleLogMood = async (mood: string, journal?: string, sleep?: string, tags?: string[]) => {
    try {
      const idToken = await currentUser?.getIdToken();
      if (!idToken) {
        throw new Error('No authentication token available');
      }

      // First, update local state immediately for better UX
      const today = new Date();
      const newEntry: MoodEntry = {
        date: today,
        mood: mood,
        journal: journal,
        sleep: sleep,
        tags: tags,
        ...moodConfig[mood as keyof typeof moodConfig]
      };

      // Update local state
      setMoodEntries(prev => {
        const updatedEntries = [...prev];
        const todayIndex = updatedEntries.findIndex(entry => isSameDay(entry.date, today));
        
        if (todayIndex !== -1) {
          updatedEntries[todayIndex] = newEntry;
        } else {
          updatedEntries.unshift(newEntry);
        }
        
        return updatedEntries;
      });

      // Then save to MongoDB
      const response = await fetch('/api/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          mood,
          journal,
          sleep,
          tags
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save mood data');
      }

      const savedLog = await response.json();
      console.log('Successfully saved mood:', savedLog);
    } catch (error) {
      console.error('Error saving mood:', error);
      // Optionally, you could revert the local state here if the save failed
    }
  };

  return {
    moodEntries,
    loading,
    todaysMood,
    todaysMoodIndex,
    getAverageMood,
    getAverageSleep,
    handleLogMood
  };
}; 