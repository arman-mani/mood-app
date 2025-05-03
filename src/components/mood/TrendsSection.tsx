import React, { useMemo } from 'react'
import { SleepBar } from './SleepBar'
import { DateBar } from './DateBar'
import { TrendLine } from './TrendLine'

export function TrendsSection() {
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

  return (
    <div className="flex flex-col items-start gap-[32px] flex-1 p-[32px] rounded-[16px] border border-blue-100 bg-neutral-0">
      <h2 className="font-reddit text-preset-3 text-neutral-900">
        Mood and sleep trends
      </h2>
      <div className="flex h-[312px] items-end gap-4 self-stretch relative min-w-[600px]">
        <SleepBar />
        <div className="flex h-full items-end gap-4 flex-1 relative">
          {[0, 1, 2, 3, 4].map((index) => (
            <TrendLine key={index} top={6 + index * 60} />
          ))}
          <div className="flex gap-4 w-full">
            {dates.map((date) => (
              <DateBar key={date.toISOString()} date={date} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 