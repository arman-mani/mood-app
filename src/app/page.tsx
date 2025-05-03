'use client'

import { Button } from '@/components/ui/button'
import { AverageMoodCard } from '@/components/mood/AverageMoodCard'
import { StatsContainer } from '@/components/mood/StatsContainer'
import { TrendsSection } from '@/components/mood/TrendsSection'
import { useEffect, useState } from 'react'

export default function Home() {
  const [currentDate, setCurrentDate] = useState('')

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

  return (
    <main className="min-h-screen bg-gradient-custom flex flex-col items-center gap-[64px] pb-[80px] w-full pt-[64px]">
      <div className="flex flex-col items-center gap-4">
        <p className="font-reddit text-preset-3 text-blue-600">
          Hello, Lisa!
        </p>
        <h1 className="text-header text-neutral-800">
          How are you feeling today?
        </h1>
        <p className="font-reddit text-preset-6 text-neutral-600 text-center">
          {currentDate}
        </p>
      </div>
      <Button>Primary Button</Button>
      <div className="flex flex-col lg:flex-row w-full max-w-[1170px] gap-[32px] px-4">
        <div className="flex flex-col gap-[32px] w-full lg:w-auto">
          <StatsContainer>
            <AverageMoodCard
              title="Average Mood"
              subtitle="Last 5 Check-ins"
              message="Keep tracking!"
              description="Log 5 check-ins to see your average mood."
            />
            <AverageMoodCard
              title="Average Sleep"
              subtitle="Last 5 Check-ins"
              message="Not enough data yet!"
              description="Track 5 nights to view average sleep."
            />
          </StatsContainer>
        </div>
        <div className="w-full lg:flex-1 overflow-x-auto">
          <TrendsSection />
        </div>
      </div>
    </main>
  )
}
