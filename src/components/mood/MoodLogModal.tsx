import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type MoodOption = 'Very Happy' | 'Happy' | 'Neutral' | 'Sad' | 'Very Sad';
type MoodTag = 'Joyful' | 'Down' | 'Anxious' | 'Calm' | 'Excited' | 'Frustrated' | 'Lonely' | 'Grateful' | 'Overwhelmed' | 'Motivated' | 'Irritable' | 'Peaceful' | 'Tired' | 'Hopeful' | 'Confident' | 'Stressed' | 'Content' | 'Disappointed' | 'Optimistic' | 'Restless';
type SleepOption = '9+ hours' | '7-8 hours' | '5-6 hours' | '3-4 hours' | '0-2 hours';

interface MoodLogData {
  mood: MoodOption | null;
  tags: MoodTag[];
  journal: string;
  sleep: SleepOption | null;
}

interface MoodLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: MoodOption, journal?: string, sleep?: SleepOption, tags?: MoodTag[]) => void;
  initialMood?: string;
}

export function MoodLogModal({ isOpen, onClose, onSubmit, initialMood }: MoodLogModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [moodData, setMoodData] = useState<MoodLogData>({
    mood: null,
    tags: [],
    journal: '',
    sleep: null
  });
  const [isFocused, setIsFocused] = useState(false);

  // These colored icons are only for the modal UI
  const moodOptions: { value: MoodOption; color: string; icon: string }[] = [
    { value: 'Very Happy', color: '#FFC97C', icon: '/assets/images/icon-very-happy-color.svg' },
    { value: 'Happy', color: '#88FF7B', icon: '/assets/images/icon-happy-color.svg' },
    { value: 'Neutral', color: '#85CAFF', icon: '/assets/images/icon-neutral-color.svg' },
    { value: 'Sad', color: '#B8B1FF', icon: '/assets/images/icon-sad-color.svg' },
    { value: 'Very Sad', color: '#FF9B99', icon: '/assets/images/icon-very-sad-color.svg' }
  ];

  // Mood tags exactly matching the image
  const moodTags: MoodTag[] = [
    'Joyful', 'Down', 'Anxious', 'Calm',
    'Excited', 'Frustrated', 'Lonely',
    'Grateful', 'Overwhelmed', 'Motivated',
    'Irritable', 'Peaceful', 'Tired', 'Hopeful',
    'Confident', 'Stressed', 'Content',
    'Disappointed', 'Optimistic', 'Restless'
  ];

  // Sleep duration options
  const sleepOptions: SleepOption[] = [
    '9+ hours',
    '7-8 hours',
    '5-6 hours',
    '3-4 hours',
    '0-2 hours'
  ];

  // Update selected mood when initialMood changes or modal opens
  useEffect(() => {
    if (isOpen && initialMood) {
      setMoodData(prev => ({ ...prev, mood: initialMood as MoodOption }));
    } else if (isOpen) {
      // Reset selection when opening modal without initialMood
      setMoodData({ mood: null, tags: [], journal: '', sleep: null });
      setCurrentStep(1);
    }
  }, [isOpen, initialMood]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleMoodSelect = (mood: MoodOption) => {
    setMoodData(prev => ({ ...prev, mood }));
  };

  const handleTagToggle = (tag: MoodTag) => {
    setMoodData(prev => {
      // If tag already exists, remove it
      if (prev.tags.includes(tag)) {
        return { ...prev, tags: prev.tags.filter(t => t !== tag) };
      }
      
      // Enforce maximum of 3 tags
      if (prev.tags.length >= 3) {
        return prev;
      }
      
      // Add the new tag
      return { ...prev, tags: [...prev.tags, tag] };
    });
  };

  const handleJournalChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    
    // Limit to 150 characters
    if (text.length <= 150) {
      setMoodData(prev => ({ ...prev, journal: text }));
    }
  };

  const handleSleepSelect = (sleep: SleepOption) => {
    setMoodData(prev => ({ ...prev, sleep }));
  };

  const handleContinue = () => {
    if (currentStep === 1 && moodData.mood) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      if (moodData.mood) {
        onSubmit(
          moodData.mood, 
          moodData.journal, 
          moodData.sleep || undefined,
          moodData.tags.length > 0 ? moodData.tags : undefined
        );
        onClose();
      }
    }
  };

  // Function to handle navigation when clicking on progress steps
  const handleStepClick = (step: number) => {
    // Only allow navigating to step 2 if a mood has been selected
    if (step === 2 && !moodData.mood) {
      return;
    }
    
    // Only allow navigating to step 3 if we've already been there or are on step 2
    if (step === 3 && currentStep < 2) {
      return;
    }
    
    // Only allow navigating to step 4 if we've already been there or are on step 3
    if (step === 4 && currentStep < 3) {
      return;
    }
    
    setCurrentStep(step);
  };

  const renderProgressBar = () => (
    <div className="flex items-center w-full gap-2">
      {[1, 2, 3, 4].map((step) => (
        <div 
          key={step}
          className={`h-[6px] flex-1 rounded-[999px] ${
            step <= currentStep ? 'bg-blue-600' : 'bg-blue-200'
          } ${step <= Math.max(currentStep, step <= 3 ? Math.min(currentStep + 1, 3) : 4) ? 'cursor-pointer' : 'cursor-not-allowed'}`}
          onClick={() => handleStepClick(step)}
          role="button"
          aria-label={`Go to step ${step}`}
          tabIndex={0}
        />
      ))}
    </div>
  );

  const renderStepOne = () => (
    <>
      <h3 className="self-stretch text-[28px] md:text-[32px] leading-[130%] md:leading-[140%] font-bold text-neutral-900 font-reddit tracking-[-0.3px] mb-6">
        How was your mood today?
      </h3>
      
      <div className="flex flex-col gap-4">
        {moodOptions.map((option) => (
          <div 
            key={option.value} 
            className={`flex items-center justify-between p-[12px_20px] gap-[12px] self-stretch rounded-[10px] border-2 cursor-pointer ${
              moodData.mood === option.value 
                ? 'border-blue-600 bg-neutral-0' 
                : 'border-blue-100 bg-neutral-0 hover:border-blue-200'
            }`}
            onClick={() => handleMoodSelect(option.value)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                moodData.mood === option.value ? 'border-blue-600' : 'border-neutral-200'
              }`}>
                {moodData.mood === option.value && (
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                )}
              </div>
              <span className="font-reddit text-[18px] font-medium leading-[140%] text-neutral-900">
                {option.value}
              </span>
            </div>
            <Image 
              src={option.icon}
              alt={`${option.value} icon`}
              width={32}
              height={32}
            />
          </div>
        ))}
      </div>
    </>
  );

  const renderStepTwo = () => (
    <>
      <h3 className="self-stretch text-[28px] md:text-[32px] leading-[130%] md:leading-[140%] font-bold text-neutral-900 font-reddit tracking-[-0.3px] mb-1">
        How did you feel?
      </h3>
      
      <p className="self-stretch text-[18px] font-medium leading-[120%] text-neutral-600 font-reddit mb-5">
        Select up to three tags:
      </p>
      
      <div className="flex flex-wrap gap-3">
        {moodTags.map((tag) => {
          const isSelected = moodData.tags.includes(tag);
          return (
            <button
              key={tag}
              className={`flex justify-center items-center gap-[8px] py-[10px] px-[12px] rounded-[10px] border ${
                isSelected 
                  ? 'border-blue-600 bg-white' 
                  : 'border-blue-100 bg-white'
              }`}
              onClick={() => handleTagToggle(tag)}
              disabled={moodData.tags.length >= 3 && !isSelected}
            >
              <div className="flex items-center justify-center">
                {isSelected ? (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="18" height="18" rx="4" fill="#4865DB"/>
                      <path d="M7.5498 10.7256L4.63184 7.80762C4.45605 7.63184 4.45605 7.33301 4.63184 7.15723L5.26465 6.52441C5.44043 6.34863 5.72168 6.34863 5.89746 6.52441L7.88379 8.49316L12.1025 4.27441C12.2783 4.09863 12.5596 4.09863 12.7354 4.27441L13.3682 4.90723C13.5439 5.08301 13.5439 5.38184 13.3682 5.55762L8.2002 10.7256C8.02441 10.9014 7.72559 10.9014 7.5498 10.7256Z" fill="white"/>
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.5" y="0.5" width="17" height="17" rx="3.5" stroke="#C7D3F7"/>
                    </svg>
                  </div>
                )}
              </div>
              <span className="font-reddit text-[16px] font-medium text-neutral-900">{tag}</span>
            </button>
          );
        })}
      </div>
    </>
  );

  const renderStepThree = () => (
    <>
      <h3 className="self-stretch text-[28px] md:text-[32px] leading-[130%] md:leading-[140%] font-bold text-neutral-900 font-reddit tracking-[-0.3px] mb-6">
        Write about your day...
      </h3>
      
      <div className="flex flex-col w-full">
        <textarea
          className={`flex h-[150px] px-[16px] py-[12px] align-self-stretch items-start gap-[8px] 
            rounded-[10px] border bg-white w-full resize-none outline-none
            font-reddit text-[16px] leading-[150%] placeholder-neutral-300
            shadow-[0px_1px_2px_0px_rgba(33,33,77,0.05)]
            ${isFocused ? 'border-blue-600' : 'border-neutral-300'}`}
          placeholder="Today, I felt..."
          value={moodData.journal}
          onChange={handleJournalChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={150}
        />
        <div className="flex justify-end mt-2 text-neutral-600 font-reddit text-[14px]">
          {moodData.journal.length}/150
        </div>
      </div>
    </>
  );

  const renderStepFour = () => (
    <>
      <h3 className="self-stretch text-[28px] md:text-[32px] leading-[130%] md:leading-[140%] font-bold text-neutral-900 font-reddit tracking-[-0.3px] mb-6">
        How many hours did you sleep today?
      </h3>
      
      <div className="flex flex-col gap-4 w-full">
        {sleepOptions.map((option) => (
          <div 
            key={option} 
            className={`flex items-center px-[20px] py-[16px] gap-[12px] self-stretch rounded-[10px] border-2 cursor-pointer ${
              moodData.sleep === option 
                ? 'border-blue-600 bg-neutral-0' 
                : 'border-blue-100 bg-neutral-0 hover:border-blue-200'
            }`}
            onClick={() => handleSleepSelect(option)}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="w-[20px] h-[20px] rounded-full border-[1.5px] border-blue-200 flex items-center justify-center bg-white">
                {moodData.sleep === option && (
                  <div className="w-[10px] h-[10px] rounded-full bg-blue-600"></div>
                )}
              </div>
              <span className="font-reddit text-[20px] font-semibold leading-[140%] text-neutral-900 flex-1">
                {option}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="fixed inset-0 bg-neutral-900/50 flex items-start justify-center z-50 overflow-y-auto">
      <div 
        className="relative flex flex-col w-[335px] md:w-full md:max-w-[600px] 
          p-[32px_20px] md:p-[48px_40px] gap-[24px] md:gap-[32px] 
          rounded-[16px] bg-gradient-custom
          mx-auto my-[70px] md:my-[80px]"
      >
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 text-neutral-600 hover:text-neutral-900"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h2 className="self-stretch text-[32px] md:text-[40px] leading-[140%] md:leading-[120%] font-bold text-neutral-900 font-reddit tracking-[-0.3px]">
          Log your mood.
        </h2>
        
        {renderProgressBar()}
        
        <div className="w-full">
          {currentStep === 1 && renderStepOne()}
          {currentStep === 2 && renderStepTwo()}
          {currentStep === 3 && renderStepThree()}
          {currentStep === 4 && renderStepFour()}
        </div>
        
        <Button 
          onClick={handleContinue}
          disabled={currentStep === 1 ? !moodData.mood : false}
          className="w-full font-reddit text-[20px] font-semibold leading-[140%] mt-4 text-center flex justify-center"
        >
          {currentStep === 4 ? 'Submit' : 'Continue'}
        </Button>
      </div>
    </div>
  );
} 