import { useQuery } from '@tanstack/react-query';
import { prisma } from '@/lib/prisma';
import { useAuth } from '@clerk/nextjs';

type WeeklyGoal = {
  id: string;
  content: string;
  isPublic: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export const useWeeklyGoal = () => {
  const { userId } = useAuth();

  const { data: goal, isLoading } = useQuery<WeeklyGoal>({
    queryKey: ['weeklyGoal', userId],
    queryFn: async () => {
      if (!userId) return null;
      const response = await fetch(`/api/goals/weekly`);
      if (!response.ok) {
        throw new Error('Failed to fetch weekly goal');
      }
      return response.json();
    },
    enabled: !!userId,
  });

  return { goal, isLoading };
}; 