'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { SettingsModal } from './SettingsModal';
import { useUser } from '@/contexts/UserContext';
import { useAuth } from '@/contexts/AuthContext';

interface ProfilePopoverProps {
  isOpen: boolean;
  onUserImageUpdate?: (image: string) => void;
}

export function ProfilePopover({ isOpen, onUserImageUpdate }: ProfilePopoverProps) {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');
  const { userName, userImage, updateUserName, updateUserImage } = useUser();
  const { logOut, currentUser } = useAuth();
  const router = useRouter();
  
  if (!isOpen) return null;
  
  const handleSettings = () => {
    setIsSettingsModalOpen(true);
  };
  
  const handleLogout = async () => {
    try {
      setLogoutError('');
      await logOut();
      router.push('/login');
    } catch (error: any) {
      setLogoutError(error.message);
      console.error('Logout error:', error);
    }
  };

  const handleSaveSettings = async (name: string, image: string) => {
    try {
      // Only update name if it has changed
      if (name !== userName) {
        await updateUserName(name);
      }
      
      // Only update image if it has changed
      if (image !== userImage) {
        await updateUserImage(image);
        if (onUserImageUpdate) {
          onUserImageUpdate(image);
        }
      }
      
      setIsSettingsModalOpen(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      throw error; // Let the SettingsModal handle the error display
    }
  };

  return (
    <>
      <div className="absolute top-12 right-0 md:right-0 left-auto md:left-auto z-50 flex w-[335px] md:w-[200px] flex-col items-start justify-center gap-[24px] md:gap-[12px] rounded-[16px] md:rounded-[8px] bg-white p-[40px_20px] md:p-[12px_16px] shadow-[0px_8px_16px_0px_rgba(32,37,41,0.08)] md:shadow-[0px_5px_8px_0px_rgba(33,33,77,0.16)] animate-in fade-in slide-in-from-top-2 duration-200">
        {/* User info */}
        <div className="self-stretch">
          <p className="font-reddit text-[18px] font-medium leading-[120%] text-[#21214D]">
            {userName}
          </p>
          <p className="font-reddit text-[15px] font-normal leading-[140%] tracking-[-0.3px] text-[#9393B7]">
            {currentUser?.email || 'user@example.com'}
          </p>
        </div>
        
        {/* Divider */}
        <div className="h-[1px] self-stretch bg-[#E0E6FA]"></div>
        
        {/* Settings */}
        <div 
          className="flex w-full cursor-pointer items-center gap-2 hover:bg-blue-100/20 p-2 rounded transition-colors duration-200"
          onClick={handleSettings}
        >
          <Image 
            src="/assets/images/icon-settings.svg" 
            alt="Settings" 
            width={16} 
            height={16} 
          />
          <span className="font-reddit text-[15px] font-normal leading-[140%] tracking-[-0.3px] text-[#21214D]">
            Settings
          </span>
        </div>
        
        {/* Logout */}
        <div 
          className="flex w-full cursor-pointer items-center gap-2 hover:bg-blue-100/20 p-2 rounded transition-colors duration-200"
          onClick={handleLogout}
        >
          <Image 
            src="/assets/images/icon-logout.svg" 
            alt="Logout" 
            width={16} 
            height={16} 
          />
          <span className="font-reddit text-[15px] font-normal leading-[140%] tracking-[-0.3px] text-[#21214D]">
            Logout
          </span>
        </div>
        
        {/* Logout Error */}
        {logoutError && (
          <p className="text-red-500 text-sm self-stretch text-center">{logoutError}</p>
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        initialName={userName}
        initialImage={userImage}
        onSave={handleSaveSettings}
      />
    </>
  );
} 