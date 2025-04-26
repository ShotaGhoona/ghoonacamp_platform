import useSWR from 'swr';
import { WeeklyGoal } from '@prisma/client';

type WeeklyGoalResponse = {
  content: string;
};

export const useWeeklyGoal = () => {
  const { data, error, isLoading } = useSWR<WeeklyGoalResponse>('/api/goals/weekly');

  return {
    data,
    isLoading,
    error,
  };
}; 