'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialName: string
  initialImage: string
  onSave: (name: string, image: string) => Promise<void>
}

export function SettingsModal({
  isOpen,
  onClose,
  initialName,
  initialImage,
  onSave
}: SettingsModalProps) {
  const [name, setName] = useState(initialName)
  const [previewImage, setPreviewImage] = useState(initialImage)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setName(initialName)
    setPreviewImage(initialImage)
  }, [initialName, initialImage])

  const handleClose = () => {
    if (loading) return
    setError('')
    onClose()
  }

  const handleImageClick = () => {
    if (loading) return
    fileInputRef.current?.click()
  }

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension
          const MAX_DIMENSION = 400;
          if (width > height && width > MAX_DIMENSION) {
            height = (height * MAX_DIMENSION) / width;
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width = (width * MAX_DIMENSION) / height;
            height = MAX_DIMENSION;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Failed to get canvas context'));
            return;
          }
          
          ctx.drawImage(img, 0, 0, width, height);
          // Compress as JPEG with 0.7 quality
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          resolve(dataUrl);
        };
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (loading) return
    const file = e.target.files?.[0]
    if (!file) return

    console.log('Selected file:', file.name, 'Size:', file.size, 'Type:', file.type)

    try {
      // Check file size (max 200KB)
      if (file.size > 200 * 1024) {
        setError('Image size must be less than 200KB')
        return
      }

      // Check file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Only JPEG and PNG images are allowed')
        return
      }

      // Compress and convert to data URL
      const compressedDataUrl = await compressImage(file);
      console.log('Created compressed data URL, length:', compressedDataUrl.length);
      
      if (compressedDataUrl.length > 240000) { // ~240KB limit for safety
        setError('Image too large after compression. Please use a smaller image.')
        return
      }
      
      setPreviewImage(compressedDataUrl)
      setError('')
    } catch (error) {
      console.error('Error handling file:', error)
      setError('Failed to process image')
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      setError('Name is required')
      return
    }

    try {
      setError('')
      setLoading(true)
      console.log('Saving profile with name:', name, 'and image data URL length:', previewImage.length)
      await onSave(name, previewImage)
      console.log('Profile saved successfully')
      onClose()
    } catch (error: any) {
      console.error('Error saving profile:', error)
      // Show a user-friendly error message based on the error type
      let errorMessage = 'Failed to save changes. Please try again.'
      
      if (error.message.includes('database')) {
        errorMessage = 'Failed to save to database. Please try again.'
      } else if (error.message.includes('authentication')) {
        errorMessage = 'Failed to update profile. Please try again or re-login.'
      } else if (error.message.includes('too large')) {
        errorMessage = 'Image is too large. Please choose a smaller image.'
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4 overflow-y-auto"
    >
      <div 
        className="relative flex w-[335px] md:w-full md:max-w-[600px] flex-col items-start gap-[24px] md:gap-[32px] rounded-[16px] bg-gradient-custom p-[40px_20px] md:p-[48px_40px] shadow-[0px_8px_16px_0px_rgba(32,37,41,0.08)] overflow-y-auto max-h-[90vh] mx-auto my-[20px] md:my-[80px]"
      >
        {/* Close button */}
        <button 
          className="absolute right-4 top-4 text-neutral-600 hover:text-neutral-900 disabled:opacity-50"
          onClick={onClose}
          disabled={loading}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Header */}
        <div className="self-stretch">
          <h2 className="font-reddit text-[24px] md:text-[32px] font-bold leading-[140%] tracking-[-0.3px] text-[#21214D]">
            Update your profile
          </h2>
          <p className="font-reddit text-[16px] md:text-[18px] font-normal leading-[140%] tracking-[-0.3px] text-[#57577B]">
            Personalize your account with your name and photo.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="flex flex-col gap-6 self-stretch w-full">
          {/* Name input */}
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="name" 
              className="text-[#21214D] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px]"
            >
              Display name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              required
              className="flex p-[12px_16px] items-start gap-[8px] self-stretch rounded-[10px] border border-[#9393B7] bg-white shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px] text-[#57577B] focus:border-blue-600 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Image upload */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div 
              className={`relative flex h-[64px] w-[64px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100 ${loading ? 'cursor-not-allowed' : ''}`}
              onClick={handleImageClick}
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : null}
              <Image 
                src={previewImage} 
                alt="User Avatar" 
                width={64} 
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-reddit text-[15px] font-normal leading-[140%] tracking-[-0.3px] text-[#57577B]">
                Max 200KB, PNG or JPEG
              </p>
              <button 
                type="button"
                className={`mt-2 flex items-center justify-center gap-2 rounded-[8px] border border-[#9393B7] bg-white px-[16px] py-[8px] font-reddit text-[15px] shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)] ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={handleImageClick}
                disabled={loading}
              >
                Upload
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/png, image/jpeg" 
                className="hidden"
                onChange={handleFileChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 self-stretch">
              <Image
                src="/assets/images/info-circle.svg"
                alt="Error"
                width={16}
                height={16}
                style={{ width: 'auto', height: 'auto' }}
              />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {/* Save button */}
          <Button 
            type="submit"
            className={`mt-2 self-stretch font-reddit text-[20px] font-semibold leading-[140%] text-center flex justify-center items-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              'Save changes'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
} 