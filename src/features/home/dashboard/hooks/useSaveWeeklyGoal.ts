'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { getWeekStartDate } from '@/utils/date';

export type WeeklyGoalInput = {
  goals: string[];
  isPublic: boolean;
};

type UseSaveWeeklyGoalReturn = {
  saveGoals: (input: WeeklyGoalInput) => Promise<boolean>;
  isLoading: boolean;
  error: Error | null;
};

export const useSaveWeeklyGoal = (): UseSaveWeeklyGoalReturn => {
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveGoals = async (input: WeeklyGoalInput): Promise<boolean> => {
    if (!userId) {
      setError(new Error('ユーザーが認証されていません'));
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const weekStart = getWeekStartDate();
      
      const response = await fetch('/api/user/weekly-goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          goals: input.goals.filter(goal => goal.trim() !== ''),
          isPublic: input.isPublic,
          weekStart: weekStart.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '目標の保存に失敗しました');
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    saveGoals,
    isLoading,
    error,
  };
}; 