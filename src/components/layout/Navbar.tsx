'use client'

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { ProfilePopover } from '@/components/layout/ProfilePopover';
import { useUser } from '@/contexts/UserContext';

export function Navbar() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { userImage } = useUser();
  const popoverRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the popover to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    }

    // Only add the event listener when the popover is open
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  const togglePopover = () => {
    setIsPopoverOpen(prev => !prev);
  };

  return (
    <nav className="w-full py-10">
      <div className="mx-auto w-full max-w-[343px] md:max-w-[704px] lg:max-w-[1138px] flex justify-between items-center px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image 
            src="/assets/images/Logo icon.svg" 
            alt="Moody Logo" 
            width={24} 
            height={24} 
          />
          <span className="font-reddit text-[21px] font-bold leading-normal tracking-[-0.8px] text-[#21214D]">
            Moody
          </span>
        </div>

        {/* Avatar and dropdown */}
        <div className="relative flex justify-end" ref={popoverRef}>
          <div 
            className="flex items-center gap-[10px] cursor-pointer"
            onClick={togglePopover}
            role="button"
            tabIndex={0}
            aria-expanded={isPopoverOpen}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                togglePopover();
              }
            }}
          >
            <div className="flex w-[40px] h-[40px] justify-center items-center overflow-hidden rounded-full">
              <Image 
                src={userImage}
                alt="User Avatar" 
                width={40} 
                height={40}
                className="object-cover"
              />
            </div>
            <Image 
              src="/assets/images/icon-dropdown-arrow.svg" 
              alt="Dropdown Arrow" 
              width={12} 
              height={6}
              className={`transition-transform duration-200 ${isPopoverOpen ? 'rotate-180' : ''}`}
            />
          </div>
          
          <ProfilePopover 
            isOpen={isPopoverOpen} 
            onUserImageUpdate={() => {}} // This is no longer needed as we're using context
          />
        </div>
      </div>
    </nav>
  );
} 