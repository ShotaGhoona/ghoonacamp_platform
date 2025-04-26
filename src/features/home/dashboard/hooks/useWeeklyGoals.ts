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
    console.log('Hook - useEffect発火, userId:', userId);

    const fetchWeeklyGoals = async () => {
      if (!userId) {
        console.log('Hook - userIdが存在しないため、処理を中断');
        setIsLoading(false);
        return;
      }

      try {
        console.log('Hook - APIリクエスト開始');
        const response = await fetch('/api/user/weekly-goals');
        console.log('Hook - APIレスポンス:', response.status, response.statusText);
        
        if (!response.ok) {
          throw new Error('週間目標の取得に失敗しました');
        }
        const data = await response.json();
        console.log('Hook - 取得したデータ:', data);
        setGoals(data);
      } catch (err) {
        console.error('Hook - エラー発生:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyGoals();
  }, [userId]);

  return { goals, isLoading, error };
}; 