import Image from 'next/image';

interface TodaysReflectionCardProps {
  reflection: string | null;
}

export function TodaysReflectionCard({ reflection }: TodaysReflectionCardProps) {
  // If no reflection is set, don't show the card
  if (!reflection) return null;

  return (
    <div className="flex flex-col items-start gap-4 p-5 w-full rounded-[16px] border border-[#E0E6FA] bg-white mb-0 h-auto lg:h-[227px]" style={{ minWidth: 0 }}>
      <div className="flex items-center gap-2">
        <Image
          src="/assets/images/icon-reflection.svg"
          alt="Reflection icon"
          width={24}
          height={24}
        />
        <h2 className="font-reddit text-[18px] font-medium leading-[120%] text-[#57577B]">
          Reflection of the day
        </h2>
      </div>
      
      <div className="flex-1 w-full overflow-y-auto max-h-[200px] lg:max-h-[150px]" style={{ minWidth: 0 }}>
        <p 
          className="text-[#21214D] font-reddit text-[18px] font-medium leading-[120%] m-0"
          style={{ 
            overflowWrap: 'break-word', 
            wordBreak: 'break-word',
            hyphens: 'auto',
            maxWidth: '100%'
          }}
        >
          {reflection}
        </p>
      </div>
    </div>
  );
} 