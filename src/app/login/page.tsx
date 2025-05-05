'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const router = useRouter();

  // Validate email format when it changes
  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  }, [email]);

  // Validate password
  useEffect(() => {
    if (password && password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    } else {
      setPasswordError('');
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (emailError || passwordError) {
      setError('Please fix the errors before submitting');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await signIn(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-custom">
      {/* Logo */}
      <div className="mb-12 md:mb-12 lg:mb-12 text-center">
        <div className="flex items-center justify-center">
          <Image 
            src="/assets/images/Logo icon.svg" 
            alt="Moody Logo" 
            width={40} 
            height={40}
            className="mr-4"
          />
          <h1 className="text-[#21214D] font-reddit text-[21px] font-bold leading-normal tracking-[-0.8px]">
            Moody
          </h1>
        </div>
      </div>
      
      <div className="w-full max-w-[530px] p-6 md:p-[40px_32px] flex flex-col items-start gap-[32px] rounded-[16px] bg-white shadow-[0px_8px_16px_0px_rgba(32,37,41,0.08)]">
        {/* Header */}
        <div className="flex flex-col gap-2 self-stretch">
          <h1 className="self-stretch text-[#21214D] font-reddit text-[32px] font-bold leading-[140%] tracking-[-0.3px]">
            Welcome back!
          </h1>
          <p className="self-stretch text-[#57577B] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px]">
            Log in to continue tracking your mood and sleep.
          </p>
        </div>
        
        {/* Form */}
        <form className="flex flex-col gap-6 self-stretch w-full" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="email" 
              className="self-stretch text-[#21214D] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px]"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex p-[12px_16px] items-start gap-[8px] self-stretch rounded-[10px] border ${emailError ? 'border-red-500' : 'border-[#9393B7]'} bg-white shadow-[0px_1px_2px_0px_rgba(33,33,77,0.05)] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px] text-[#57577B] focus:border-blue-600 focus:outline-none`}
              required
            />
            {emailError && (
              <div className="flex items-center gap-2 mt-1">
                <Image
                  src="/assets/images/info-circle.svg"
                  alt="Info"
                  width={16}
                  height={16}
                />
                <p className="text-red-500 text-sm">{emailError}</p>
              </div>
            )}
          </div>
          
          {/* Password Field */}
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="password" 
              className="self-stretch text-[#21214D] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px]"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`flex p-[12px_16px] items-start gap-[8px] self-stretch rounded-[10px] border ${passwordError ? 'border-red-500' : 'border-[#9393B7]'} bg-white shadow-[0px_1px_2px_0px_rgba(33,33,77,0.05)] font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px] focus:border-blue-600 focus:outline-none`}
              required
            />
            {passwordError && (
              <div className="flex items-center gap-2 mt-1">
                <Image
                  src="/assets/images/info-circle.svg"
                  alt="Info"
                  width={16}
                  height={16}
                />
                <p className="text-red-500 text-sm">{passwordError}</p>
              </div>
            )}
          </div>
          
          {/* General Error Message */}
          {error && (
            <div className="flex items-center gap-2">
              <Image
                src="/assets/images/info-circle.svg"
                alt="Info"
                width={16}
                height={16}
              />
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex p-[12px_32px] justify-center items-center gap-[10px] self-stretch rounded-[10px] bg-[#4865DB] text-white font-reddit text-[18px] font-semibold leading-[140%] tracking-[-0.3px] mt-2 hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        
        {/* Sign Up Link */}
        <p className="self-stretch text-[#57577B] text-center font-reddit text-[18px] font-normal leading-[140%] tracking-[-0.3px]">
          Haven&apos;t got an account? <Link href="/signup" className="text-[#4865DB] hover:underline">Sign up</Link>.
        </p>
      </div>
    </div>
  );
} 