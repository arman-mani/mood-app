import Image from 'next/image';

interface MoodPopoverProps {
  mood: string;
  sleep?: string;
  reflection?: string;
  tags?: string[];
  position: 'left' | 'right';
}

export function MoodPopover({ mood, sleep, reflection, tags, position = 'right' }: MoodPopoverProps) {
  if (!mood) return null;

  // Mood to icon mapping
  const moodIcons = {
    'Very Happy': '/assets/images/icon-very-happy-color.svg',
    'Happy': '/assets/images/icon-happy-color.svg',
    'Neutral': '/assets/images/icon-neutral-color.svg',
    'Sad': '/assets/images/icon-sad-color.svg',
    'Very Sad': '/assets/images/icon-very-sad-color.svg'
  };

  // Get the correct icon based on mood
  const iconSrc = moodIcons[mood as keyof typeof moodIcons] || '/assets/images/icon-neutral-color.svg';

  return (
    <div 
      className={`absolute z-50 w-[175px] flex flex-col items-start p-3 gap-3 
                 rounded-[10px] border border-[#E0E6FA] bg-white shadow-md
                 ${position === 'left' ? 'right-12 -top-4' : 'left-12 -top-4'}`}
      style={{ boxShadow: '0px 4px 7px 0px rgba(33, 33, 77, 0.16)' }}
    >
      {/* Mood section */}
      <div className="flex flex-col gap-1 w-full">
        <span className="text-[#57577B] font-reddit text-[13px] font-semibold leading-[100%]">
          Mood
        </span>
        <div className="flex items-center gap-2">
          <Image
            src={iconSrc}
            alt={`${mood} icon`}
            width={16}
            height={16}
          />
          <span className="text-[#21214D] font-reddit text-[12px] font-normal leading-[110%]">{mood}</span>
        </div>
      </div>
      
      {/* Sleep section - only shown if sleep data exists */}
      {sleep && (
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[#57577B] font-reddit text-[13px] font-semibold leading-[100%]">
            Sleep
          </span>
          <span className="text-[#21214D] font-reddit text-[12px] font-normal leading-[110%]">{sleep}</span>
        </div>
      )}
      
      {/* Reflection section - only shown if reflection data exists */}
      {reflection && (
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[#57577B] font-reddit text-[13px] font-semibold leading-[100%]">
            Reflection
          </span>
          <p className="text-[#21214D] font-reddit text-[12px] font-normal leading-[110%] line-clamp-3">{reflection}</p>
        </div>
      )}
      
      {/* Tags section - only shown if tags exist */}
      {tags && tags.length > 0 && (
        <div className="flex flex-col gap-1 w-full">
          <span className="text-[#57577B] font-reddit text-[13px] font-semibold leading-[100%]">
            Tags
          </span>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span key={index} className="text-[#21214D] font-reddit text-[12px] font-normal leading-[110%]">
                {tag}{index < tags.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Pointer triangle */}
      <div 
        className={`absolute top-4 w-3 h-3 bg-white border-l border-t border-[#E0E6FA] transform 
                   ${position === 'left' ? 'right-[-6px] rotate-45' : 'left-[-6px] rotate-[-135deg]'}`}
      />
    </div>
  );
} 