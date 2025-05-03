import Image from 'next/image';

interface TodaysSleepCardProps {
  sleep: string | null;
}

export function TodaysSleepCard({ sleep }: TodaysSleepCardProps) {
  // If no sleep data is set, don't show the card
  if (!sleep) return null;

  return (
    <div className="flex flex-col items-start gap-4 p-5 w-full rounded-[16px] border border-[#E0E6FA] bg-white mb-0 h-auto lg:h-[113px]">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/images/icon-sleep.svg"
          alt="Sleep icon"
          width={24}
          height={24}
        />
        <h2 className="font-reddit text-[18px] font-medium leading-[120%] text-[#57577B]">
          Sleep
        </h2>
      </div>
      
      <p className="text-[#21214D] font-reddit text-[32px] font-bold leading-[140%] tracking-[-0.3px] text-left w-full m-0">
        {sleep}
      </p>
    </div>
  );
} 