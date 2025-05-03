interface TrendLineProps {
  top: number
}

export function TrendLine({ top }: TrendLineProps) {
  return (
    <div 
      className="absolute right-0 w-[619px] h-[1px] opacity-30 bg-blue-100"
      style={{ top: `${top}px` }}
    />
  )
} 