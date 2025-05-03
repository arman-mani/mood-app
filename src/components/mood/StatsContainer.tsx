interface StatsContainerProps {
  children: React.ReactNode
}

export function StatsContainer({ children }: StatsContainerProps) {
  return (
    <div className="flex w-full lg:w-[370px] p-[32px] flex-col items-start gap-[32px] self-stretch rounded-[16px] border border-blue-100 bg-neutral-0">
      {children}
    </div>
  )
} 