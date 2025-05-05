import React from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';

interface HeaderProps {
  currentDate: string;
  onLogMoodClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentDate, onLogMoodClick }) => {
  const { userName } = useUser();
  
  // Extract first name if there's a space in the name
  const firstName = userName.split(' ')[0];
  
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full border-none">
        <p className="w-full text-[24px] leading-[130%] font-bold text-blue-600 text-center font-reddit tracking-[-0.3px] border-none">
          Hello, {firstName}!
        </p>
        <h1 className="w-full text-[46px] lg:text-[52px] leading-[120%] font-bold text-neutral-900 text-center font-reddit tracking-[-2px] lg:tracking-normal">
          How are you feeling today?
        </h1>
        <p className="w-full font-reddit text-[18px] leading-[120%] font-medium text-neutral-600 text-center">
          {currentDate}
        </p>
      </div>
      <Button 
        className="font-reddit text-[20px] font-semibold leading-[140%] text-neutral-0"
        onClick={onLogMoodClick}
      >
        Log today&apos;s mood
      </Button>
    </>
  );
}; 