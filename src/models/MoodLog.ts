import mongoose from 'mongoose';

export interface IMoodLog {
  userId: string;
  mood: number;
  notes?: string;
  sleepHours?: number;
  date: Date;
  tags?: string[];
}

const moodLogSchema = new mongoose.Schema<IMoodLog>({
  userId: { type: String, required: true },
  mood: { type: Number, required: true, min: 1, max: 5 },
  notes: { type: String },
  sleepHours: { type: Number, min: 0, max: 24 },
  date: { type: Date, required: true },
  tags: [{ type: String }]
}, {
  timestamps: true
});

// Create compound index for efficient querying
moodLogSchema.index({ userId: 1, date: -1 });

export const MoodLog = mongoose.models.MoodLog || mongoose.model<IMoodLog>('MoodLog', moodLogSchema); 