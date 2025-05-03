interface DateBarProps {
  date: Date
}

export function DateBar({ date }: DateBarProps) {
  const month = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()

  return (
    <div className="flex w-[40px] h-[312px] flex-col justify-end items-center gap-[12px] self-stretch">
      <span className="font-reddit text-[12px] leading-[110%] text-neutral-900 text-center opacity-70 self-stretch">
        {month}
      </span>
      <span className="font-reddit text-[13px] font-semibold leading-[100%] text-neutral-900 text-center self-stretch">
        {day}
      </span>
    </div>
  )
} 