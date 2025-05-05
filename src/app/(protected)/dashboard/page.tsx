'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { MoodLogModal } from '@/components/mood/MoodLogModal'
import { Header } from '@/components/home/Header'
import { TodaysMoodSection } from '@/components/home/TodaysMoodSection'
import { StatsAndTrendsSection } from '@/components/home/StatsAndTrendsSection'
import { useCurrentDate } from '@/hooks/useCurrentDate'
import { useMoodData } from '@/hooks/useMoodData'
import { useAuth } from '@/contexts/AuthContext'

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const currentDate = useCurrentDate()
  const { currentUser } = useAuth()
  const {
    moodEntries,
    todaysMood,
    todaysMoodIndex,
    getAverageMood,
    getAverageSleep,
    handleLogMood
  } = useMoodData()

  const avgMood = getAverageMood()
  const avgSleep = getAverageSleep()

  return (
    <>
      <Navbar />
      
      <main className="flex flex-col items-center gap-[64px] pb-[80px] w-full max-w-[375px] md:max-w-[768px] lg:max-w-[1440px] mx-auto px-4">
        <Header
          currentDate={currentDate}
          onLogMoodClick={() => setIsModalOpen(true)}
        />
        
        {/* Today's mood section and stats container wrapper */}
        <div className="flex flex-col w-full max-w-[1170px]">
          <TodaysMoodSection 
            todaysMood={todaysMood} 
            todaysMoodIndex={todaysMoodIndex}
          />
          
          <StatsAndTrendsSection
            moodData={moodEntries}
            averageMood={avgMood}
            averageSleep={avgSleep}
          />
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