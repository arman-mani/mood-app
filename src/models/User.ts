import mongoose from 'mongoose';

export interface IUser {
  firebaseUid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  photoStorageURL?: string; // URL in Firebase Storage
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  firebaseUid: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: { type: String },
  photoStorageURL: { type: String },
  lastLoginAt: { type: Date },
}, {
  timestamps: true
});

// Create indexes for efficient querying
userSchema.index({ firebaseUid: 1 });
userSchema.index({ email: 1 });

export const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema); 