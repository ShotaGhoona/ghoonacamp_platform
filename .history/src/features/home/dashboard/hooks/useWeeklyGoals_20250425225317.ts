'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

type WeeklyGoal = {
  id: number;
  content: string;
  isPublic: boolean;
  isPast: boolean;
  reflection: string | null;
  weekStart: string;
};

export const useWeeklyGoals = () => {
  const { userId } = useAuth();
  const [goals, setGoals] = useState<WeeklyGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWeeklyGoals = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/weekly-goals');
        if (!response.ok) {
          throw new Error('週間目標の取得に失敗しました');
        }
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyGoals();
  }, [userId]);

  return { goals, isLoading, error };
}; 