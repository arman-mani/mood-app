export type MoodEntry = {
  date: Date;
  mood: string;
  color: string;
  icon: string;
  height: number; // The height for the chart bar
  journal?: string; // Optional journal entry
  sleep?: string; // Optional sleep duration
  tags?: string[]; // Optional tags
};

export type MoodConfig = Record<string, { color: string; icon: string; height: number }>;

export type MoodValue = {
  'Very Happy': 5,
  'Happy': 4,
  'Neutral': 3,
  'Sad': 2,
  'Very Sad': 1
};

export type SleepValue = {
  '9+ hours': 9,
  '7-8 hours': 7.5,
  '5-6 hours': 5.5,
  '3-4 hours': 3.5,
  '0-2 hours': 1
};

export type ComparisonType = 'increase' | 'same' | 'decrease';

export type AverageStats = {
  mood?: string | null;
  message: string;
  description: string;
  color: string;
  icon: string;
  comparison: ComparisonType;
}; 