import { useState, useEffect } from 'react';
import { formatCurrentDate } from '@/utils/date';

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(formatCurrentDate());
    };
    
    updateDate();
    // Update every minute to keep the date current
    const interval = setInterval(updateDate, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return currentDate;
}; 