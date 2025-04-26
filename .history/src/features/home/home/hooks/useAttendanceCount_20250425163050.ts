'use client';

import { useEffect, useState } from 'react';

type AttendanceCount = {
  count: number;
  totalUsers: number;
};

export const useAttendanceCount = () => {
  const [counts, setCounts] = useState<AttendanceCount>({ count: 0, totalUsers: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await fetch('/api/attendance/count');
        if (!response.ok) {
          throw new Error('出席回数の取得に失敗しました');
        }
        const data = await response.json();
        setCounts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return { counts, isLoading, error };
}; 