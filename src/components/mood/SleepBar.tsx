import Image from 'next/image'

const SLEEP_RANGES = [
  '9+ hours',
  '7-8 hours',
  '5-6 hours',
  '3-4 hours',
  '0-2 hours'
]

export function SleepBar() {
  return (
    <div className="flex h-[312px] flex-col items-start gap-[40px]">
      {SLEEP_RANGES.map((range) => (
        <div 
          key={range}
          className="flex items-center gap-2"
        >
          <Image 
            src="/assets/images/icon-sleep.svg"
            alt="Sleep icon"
            width={16}
            height={16}
          />
          <span className="font-reddit text-[12px] leading-[110%] text-neutral-600 text-center">
            {range}
          </span>
        </div>
      ))}
    </div>
  )
} 