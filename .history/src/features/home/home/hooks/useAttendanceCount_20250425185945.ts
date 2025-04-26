'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

type AttendanceCount = {
  count: number;
  totalUsers: number;
};

export const useAttendanceCount = () => {
  const { userId } = useAuth();
  const [counts, setCounts] = useState<AttendanceCount>({ count: 0, totalUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      console.log('Fetching counts with userId:', userId);
      try {
        const response = await fetch('/api/attendance/count');
        console.log('API Response:', response);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '出席回数の取得に失敗しました');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setCounts(data);
      } catch (err) {
        console.error('Error fetching attendance:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchCounts();
    } else {
      console.log('No userId available');
    }
  }, [userId]);

  return { counts, isLoading, error };
}; 