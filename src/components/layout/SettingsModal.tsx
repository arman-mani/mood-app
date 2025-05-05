'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  initialName: string
  initialImage: string
  onSave: (name: string, image: string) => void
}

export function SettingsModal({
  isOpen,
  onClose,
  initialName,
  initialImage,
  onSave
}: SettingsModalProps) {
  const [name, setName] = useState(initialName)
  const [image, setImage] = useState(initialImage)
  const [previewImage, setPreviewImage] = useState(initialImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 250KB)
    if (file.size > 250 * 1024) {
      alert('File size must be less than 250KB')
      return
    }

    // Check file type (PNG or JPEG)
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Only PNG or JPEG files are allowed')
      return
    }

    // Create a preview
    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreviewImage(result)
      setImage(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSave = () => {
    onSave(name, image)
    onClose()
  }

  const handleClose = (e: React.MouseEvent) => {
    // Close only if clicking on the overlay, not the modal content
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div 
        className="relative flex w-[335px] md:w-full md:max-w-[600px] flex-col items-start gap-[24px] md:gap-[32px] rounded-[16px] bg-gradient-custom p-[40px_20px] md:p-[48px_40px] shadow-[0px_8px_16px_0px_rgba(32,37,41,0.08)] overflow-y-auto max-h-[90vh] mx-auto my-[20px] md:my-[80px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute right-4 top-4 text-neutral-600 hover:text-neutral-900"
          onClick={onClose}
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

        {/* Name input */}
        <div className="self-stretch">
          <label 
            className="mb-2 block font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px] text-[#21214D]"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex w-full items-start gap-[8px] rounded-[10px] border border-[#57577B] bg-white p-[12px_16px] shadow-[0px_1px_2px_0px_rgba(33,33,77,0.05)] focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Image upload */}
        <div className="flex flex-col gap-2 w-full">
          <label className="mb-2 block font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px] text-[#21214D]">
            Upload Image
          </label>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div 
              className="relative flex h-[64px] w-[64px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-gray-100"
              onClick={handleImageClick}
            >
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
                Max 250KB, PNG or JPEG
              </p>
              <button 
                className="mt-2 flex items-center justify-center gap-2 rounded-[8px] border border-[#9393B7] bg-white px-[16px] py-[8px] font-reddit text-[15px] shadow-[0px_1px_2px_0px_rgba(10,13,20,0.03)]"
                onClick={handleImageClick}
              >
                Upload
              </button>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/png, image/jpeg" 
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Save button */}
        <Button 
          className="mt-2 self-stretch font-reddit text-[20px] font-semibold leading-[140%] text-center flex justify-center"
          onClick={handleSave}
        >
          Save changes
        </Button>
      </div>
    </div>
  )
} 