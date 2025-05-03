interface StatsContainerProps {
  children: React.ReactNode
}

export function StatsContainer({ children }: StatsContainerProps) {
  return (
    <div className="flex w-full lg:w-[370px] p-[20px_16px] flex-col items-start gap-[20px] self-stretch rounded-[16px] border border-blue-100 bg-neutral-0">
      {children}
    </div>
  )
} 