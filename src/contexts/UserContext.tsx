'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { updateProfile } from 'firebase/auth';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  User
} from 'firebase/auth';
import { app } from '@/firebase/firebaseConfig';

interface UserContextType {
  userName: string;
  userImage: string;
  updateUserName: (name: string) => Promise<void>;
  updateUserImage: (image: string) => Promise<void>;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('/assets/images/avatar-placeholder.svg');
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load user data when auth state changes
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Try to load from MongoDB first
        const response = await fetch(`/api/user?firebaseUid=${currentUser.uid}`);
        
        if (response.ok) {
          const userData = await response.json();
          setUserName(userData.displayName);
          setUserImage(userData.photoURL || '/assets/images/avatar-placeholder.svg');
        } else {
          // If no MongoDB data, use Firebase Auth data and create MongoDB record
          setUserName(currentUser.displayName || '');
          setUserImage(currentUser.photoURL || '/assets/images/avatar-placeholder.svg');
          
          // Create initial MongoDB record
          await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              firebaseUid: currentUser.uid,
              displayName: currentUser.displayName || '',
              email: currentUser.email,
              photoURL: currentUser.photoURL || '/assets/images/avatar-placeholder.svg',
              lastLoginAt: new Date(),
            }),
          });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to Firebase Auth data
        setUserName(currentUser.displayName || '');
        setUserImage(currentUser.photoURL || '/assets/images/avatar-placeholder.svg');
      }
      
      setLoading(false);
    };

    loadUserData();
  }, [currentUser]);

  const updateUserName = async (name: string) => {
    if (!currentUser) return;

    try {
      // Update Firebase Auth
      await updateProfile(currentUser, { displayName: name });
      
      // Update MongoDB
      await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firebaseUid: currentUser.uid,
          displayName: name,
          email: currentUser.email,
          photoURL: userImage,
        }),
      });

      setUserName(name);
    } catch (error) {
      console.error('Error updating user name:', error);
      throw error;
    }
  };

  const updateUserData = async (uid: string, data: any) => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firebaseUid: uid,
        ...data
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Failed to update user in database: ${errorData.error || response.statusText}`);
    }

    const result = await response.json();
    return result;
  };

  const updateUserImage = async (imageDataUrl: string): Promise<void> => {
    if (!currentUser) {
      throw new Error('No user is signed in');
    }

    try {
      console.log('Starting profile update...');
      
      // First update MongoDB with the actual image data
      console.log('Updating MongoDB...');
      try {
        await updateUserData(currentUser.uid, { 
          photoURL: imageDataUrl,
          photoStorageURL: `/api/user/${currentUser.uid}/photo`, // URL where the photo can be accessed
          displayName: userName,
          email: currentUser.email
        });
        console.log('MongoDB updated successfully');
      } catch (mongoError) {
        console.error('MongoDB update failed:', mongoError);
        throw new Error('Failed to save profile data to database');
      }

      // Then update Firebase Auth with the API URL
      console.log('Updating Firebase Auth profile...');
      try {
        await currentUser.reload();
        
        // Use the API URL instead of the data URL for Firebase Auth
        await updateProfile(currentUser, {
          photoURL: `/api/user/${currentUser.uid}/photo`
        }).catch((error) => {
          console.error('Firebase Auth update error details:', error);
          throw error;
        });
        
        console.log('Firebase Auth profile updated successfully');
      } catch (firebaseError: any) {
        console.error('Firebase Auth update failed:', firebaseError);
        // If Firebase fails, we should revert MongoDB
        try {
          await updateUserData(currentUser.uid, { 
            photoURL: userImage,
            photoStorageURL: null,
            displayName: userName,
            email: currentUser.email
          });
        } catch (revertError) {
          console.error('Failed to revert MongoDB:', revertError);
        }
        throw new Error(firebaseError.message || 'Failed to update profile in authentication');
      }

      // If both succeed, update local state
      console.log('Updating local state...');
      setUserImage(imageDataUrl); // Keep using the data URL for local display
      console.log('Profile update completed successfully');
    } catch (error: any) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        userImage,
        updateUserName,
        updateUserImage,
        loading
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 