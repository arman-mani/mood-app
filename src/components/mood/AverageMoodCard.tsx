import Image from 'next/image'

interface AverageMoodCardProps {
  title: string
  subtitle: string
  message: string
  description: string
  variant?: 'mood' | 'sleep'
  color?: string
  icon?: string
  comparison?: 'increase' | 'same' | 'decrease'
}

export function AverageMoodCard({ 
  title, 
  subtitle, 
  message, 
  description, 
  variant = 'sleep', 
  color = variant === 'mood' ? '#85CAFF' : '#4865DB', 
  icon = variant === 'mood' ? '/assets/images/icon-neutral-white.svg' : '/assets/images/icon-sleep.svg',
  comparison = 'same'
}: AverageMoodCardProps) {
  // For all cards, text color is white if background is dark
  const isDarkBackground = ['#4865DB', '#B8B1FF', '#FF9B99'].includes(color);
  const textColor = isDarkBackground ? 'text-neutral-0' : 'text-neutral-900';
  const arrowFill = isDarkBackground ? "#FFFFFF" : "#21214D";

  // Comparison icon SVG paths based on trend
  const getComparisonArrow = (comp: 'increase' | 'same' | 'decrease', fill: string) => {
    // Pointing diagonally up-right for increase
    if (comp === 'increase') {
      return (
        <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.99658 4.52746C4.14663 4.37741 4.38671 4.3774 4.51675 4.52745L10.3289 10.2997C10.4789 10.4497 10.4789 10.6598 10.3289 10.8098L4.51675 16.432C4.3667 16.582 4.14662 16.582 3.99658 16.432L3.39638 15.8318C3.24633 15.6818 3.24633 15.4417 3.39638 15.3217L7.51584 11.0599L1.52661 5.1276C1.37656 4.97756 1.37656 4.73748 1.52661 4.58743L3.99658 4.52746Z" fill={fill}/>
        </svg>
      );
    }
    
    // Pointing horizontally right for same
    if (comp === 'same') {
      return (
        <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.53861 4.72761C7.65865 4.57756 7.89873 4.57756 8.04878 4.72761L14.3208 10.9997C14.4709 11.1497 14.4709 11.3598 14.3208 11.5098L8.04878 17.7819C7.89873 17.9319 7.65865 17.9319 7.53861 17.7819L6.93841 17.2117C6.78836 17.0617 6.78836 16.8216 6.93841 16.7015L11.5899 12.02L1.35658 12.02C1.14651 12.02 0.996464 11.8699 0.996464 11.6599L0.996465 10.8196C0.996464 10.6395 1.14651 10.4595 1.35658 10.4595L11.5899 10.4595L6.93841 5.80796C6.78836 5.68792 6.78836 5.44784 6.93841 5.2978L7.53861 4.72761Z" fill={fill}/>
        </svg>
      );
    }
    
    // Pointing diagonally down-right for decrease
    return (
      <svg width="15" height="22" viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.99658 17.4725C4.14663 17.6226 4.38671 17.6226 4.51675 17.4725L10.3289 11.7003C10.4789 11.5503 10.4789 11.3402 10.3289 11.1902L4.51675 5.56799C4.3667 5.41794 4.14662 5.41794 3.99658 5.56799L3.39638 6.16819C3.24633 6.31823 3.24633 6.55831 3.39638 6.67835L7.51584 10.9401L1.52661 16.8724C1.37656 17.0224 1.37656 17.2625 1.52661 17.4126L3.99658 17.4725Z" fill={fill}/>
      </svg>
    );
  };
  
  // Text for comparison
  const comparisonText = {
    'increase': 'Increase from the previous 5 check-ins',
    'same': 'Same as the previous 5 check-ins',
    'decrease': 'Decrease from the previous 5 check-ins'
  }[comparison];

  console.log('AverageMoodCard props:', { title, variant, comparison, color }); // Debug output

  if (variant === 'mood') {
    return (
      <div className="flex flex-col gap-[20px] self-stretch">
        <div className="flex items-center gap-2">
          <h2 className="font-reddit text-neutral-900 text-preset-5">{title}</h2>
          <span className="font-reddit text-neutral-600 text-preset-7">({subtitle})</span>
        </div>
        <div 
          className="flex flex-col p-[20px_64px_20px_20px] justify-center items-start gap-[12px] flex-1 self-stretch rounded-[20px] relative overflow-hidden"
          style={{ backgroundColor: color }}
        >
          {/* Pattern background - positioned at the far right edge */}
          <div className="absolute top-0 right-0 bottom-0 w-1/5 pointer-events-none">
            <Image 
              src="/assets/images/Pattern.png"
              alt="Background pattern"
              fill
              style={{ objectFit: 'cover', opacity: 0.65, objectPosition: 'right center' }}
              priority
            />
          </div>
          
          <div className="flex items-center gap-2 relative z-10">
            <Image 
              src={icon}
              alt={`${message} mood icon`}
              width={24}
              height={24}
            />
            <p className={`font-reddit text-[24px] leading-[140%] font-semibold ${textColor}`}>{message}</p>
          </div>
          <div className="flex items-center gap-2 flex-1 relative z-10">
            <span className="flex items-center justify-center w-[15px] h-[22px]">
              {getComparisonArrow(comparison, arrowFill)}
            </span>
            <p className={`font-reddit text-[15px] leading-[140%] tracking-[-0.3px] font-normal ${textColor}`}>{comparisonText}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-[20px] self-stretch">
      <div className="flex items-center gap-2">
        <h2 className="font-reddit text-neutral-900 text-preset-5">{title}</h2>
        <span className="font-reddit text-neutral-600 text-preset-7">({subtitle})</span>
      </div>
      <div 
        className="flex flex-col p-[20px_64px_20px_20px] justify-center items-start gap-[12px] flex-1 self-stretch rounded-[20px] relative overflow-hidden"
        style={{ backgroundColor: color }}
      >
        {/* Pattern background - positioned at the far right edge */}
        <div className="absolute top-0 right-0 bottom-0 w-1/5 pointer-events-none">
          <Image 
            src="/assets/images/Pattern.png"
            alt="Background pattern"
            fill
            style={{ objectFit: 'cover', opacity: 0.65, objectPosition: 'right center' }}
            priority
          />
        </div>
        
        <div className="flex items-center gap-2 relative z-10">
          <Image 
            src={icon}
            alt="Sleep icon"
            width={24}
            height={24}
          />
          <p className={`font-reddit text-[24px] leading-[140%] font-semibold ${textColor}`}>{message}</p>
        </div>
        <div className="flex items-center gap-2 flex-1 relative z-10">
          <span className="flex items-center justify-center w-[15px] h-[22px]">
            {getComparisonArrow(comparison, arrowFill)}
          </span>
          <p className={`font-reddit text-[15px] leading-[140%] tracking-[-0.3px] font-normal ${textColor}`}>{comparisonText}</p>
        </div>
      </div>
    </div>
  )
} 