import Image from 'next/image';
import { useEffect, useState } from 'react';
import quotesData from '@/api/data.json';

interface TodaysMoodCardProps {
  mood: string | null;
  moodIndex: number | null; // -2 to 2 index for quotes
}

export function TodaysMoodCard({ mood, moodIndex }: TodaysMoodCardProps) {
  const [quote, setQuote] = useState<string>("");

  // Map mood string to icon and color
  const moodConfig: Record<string, { icon: string; color: string }> = {
    'Very Happy': { icon: '/assets/images/icon-very-happy-color.svg', color: '#FFC97C' },
    'Happy': { icon: '/assets/images/icon-happy-color.svg', color: '#88FF7B' },
    'Neutral': { icon: '/assets/images/icon-neutral-color.svg', color: '#85CAFF' },
    'Sad': { icon: '/assets/images/icon-sad-color.svg', color: '#B8B1FF' },
    'Very Sad': { icon: '/assets/images/icon-very-sad-color.svg', color: '#FF9B99' },
  };

  // Get a random quote based on mood
  useEffect(() => {
    if (moodIndex === null) return;
    
    try {
      // Convert moodIndex to string key for quotes object
      const moodKey = moodIndex.toString();
      
      // Get quotes array for this mood
      const quotes = quotesData.moodQuotes[moodKey as keyof typeof quotesData.moodQuotes];
      
      if (quotes && quotes.length > 0) {
        // Select a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }
    } catch (error) {
      console.error('Error getting quote:', error);
      setQuote("When your heart is full, share your light with the world.");
    }
  }, [moodIndex]);

  // If no mood is set, don't show the card
  if (!mood) return null;

  const moodData = moodConfig[mood] || { icon: '/assets/images/icon-neutral-color.svg', color: '#85CAFF' };

  return (
    <>
      {/* Mobile & Tablet Layout (centered) */}
      <div className="lg:hidden w-full flex flex-col justify-center items-center gap-8 p-8 rounded-[16px] border border-[#E0E6FA] bg-white relative overflow-hidden">
        {/* Content */}
        <div className="flex flex-col items-center z-10">
          <h2 className="font-reddit text-[32px] font-bold leading-[140%] tracking-[-0.3px] text-center text-[#21214D] opacity-70">
            I'm feeling
          </h2>
          <h1 className="font-reddit text-[46px] font-bold leading-[120%] text-center mt-1" style={{ color: moodData.color }}>
            {mood}
          </h1>
        </div>

        {/* Centered Icon */}
        <div className="flex justify-center z-10">
          <Image
            src={moodData.icon}
            alt={`${mood} mood icon`}
            width={200}
            height={200}
            priority
          />
        </div>
        
        {/* Quote at the bottom */}
        <div className="flex flex-col items-center gap-4 z-10 w-full">
          <Image
            src="/assets/images/icon-quote.svg"
            alt="Quote icon"
            width={30}
            height={30}
          />
          <p className="font-reddit text-[18px] leading-[150%] text-[#57577B] italic text-center">
            "{quote}"
          </p>
        </div>
      </div>

      {/* Desktop Layout (original) */}
      <div 
        className="hidden lg:flex relative w-[670px] h-[356px] p-8 pr-[60px] flex-col justify-between items-start flex-shrink-0 rounded-[16px] border border-[#E0E6FA] bg-white mb-0 overflow-hidden"
      >
        {/* Content */}
        <div className="w-full z-10 relative">
          <h2 className="text-[#21214D] font-reddit text-[32px] font-bold leading-[140%] tracking-[-0.3px] opacity-70">
            I'm feeling
          </h2>
          <h1 className="font-reddit text-[46px] font-bold leading-[120%] mt-1" style={{ color: moodData.color }}>
            {mood}
          </h1>
        </div>
        
        {/* Quote at the bottom */}
        <div className="relative z-10 max-w-[270px] mt-auto">
          <Image
            src="/assets/images/icon-quote.svg"
            alt="Quote icon"
            width={30}
            height={30}
            className="mb-2"
          />
          <p className="font-reddit text-[18px] leading-[150%] text-[#57577B] italic">
            "{quote}"
          </p>
        </div>
        
        {/* Mood icon positioned at bottom right, partially hidden */}
        <div className="absolute right-5 bottom-[-40px] z-1">
          <Image
            src={moodData.icon}
            alt={`${mood} mood icon`}
            width={320}
            height={320}
            priority
          />
        </div>
      </div>
    </>
  );
} 