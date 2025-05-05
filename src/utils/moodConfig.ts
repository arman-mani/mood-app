import { MoodConfig } from "@/types/mood";

// Map mood strings to mood index for quotes
export const moodToIndex: Record<string, number> = {
  'Very Happy': 2,
  'Happy': 1,
  'Neutral': 0,
  'Sad': -1,
  'Very Sad': -2
};

// Define colors and icons mapping for different moods
export const moodConfig: MoodConfig = {
  'Very Happy': { color: '#FFC97C', icon: '/assets/images/icon-happy-white.svg', height: 263 },
  'Happy': { color: '#88FF7B', icon: '/assets/images/icon-happy-white.svg', height: 214 },
  'Neutral': { color: '#85CAFF', icon: '/assets/images/icon-neutral-white.svg', height: 165 },
  'Sad': { color: '#B8B1FF', icon: '/assets/images/icon-sad-white.svg', height: 104 },
  'Very Sad': { color: '#FF9B99', icon: '/assets/images/icon-sad-white.svg', height: 104 }
};

export const moodValues = {
  'Very Happy': 5,
  'Happy': 4,
  'Neutral': 3,
  'Sad': 2,
  'Very Sad': 1
};

export const sleepValues = {
  '9+ hours': 9,
  '7-8 hours': 7.5,
  '5-6 hours': 5.5,
  '3-4 hours': 3.5,
  '0-2 hours': 1
}; 