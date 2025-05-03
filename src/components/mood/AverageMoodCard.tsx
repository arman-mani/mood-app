interface AverageMoodCardProps {
  title: string
  subtitle: string
  message: string
  description: string
}

export function AverageMoodCard({ title, subtitle, message, description }: AverageMoodCardProps) {
  return (
    <div className="flex flex-col gap-[20px] self-stretch">
      <div className="flex items-center gap-2">
        <h2 className="font-reddit text-neutral-900 text-preset-5">{title}</h2>
        <span className="font-reddit text-neutral-600 text-preset-7">({subtitle})</span>
      </div>
      <div className="flex flex-col p-[20px_16px] justify-center items-start gap-[12px] self-stretch rounded-[16px] bg-blue-100">
        <p className="font-reddit text-neutral-900 text-preset-4 flex-1">{message}</p>
        <p className="font-reddit text-neutral-900 text-preset-7">{description}</p>
      </div>
    </div>
  )
} 