import { useQuery } from '@tanstack/react-query';

type MemberGoal = {
  id: string;
  content: string;
  isPublic: boolean;
  user: {
    name: string;
  };
};

export const useAllMemberGoals = () => {
  const { data: goals, isLoading, error } = useQuery<MemberGoal[]>({
    queryKey: ['allMemberGoals'],
    queryFn: async () => {
      const response = await fetch('/api/user/weekly-goals/all');
      if (!response.ok) {
        throw new Error('Failed to fetch member goals');
      }
      return response.json();
    },
  });

  return {
    goals: goals || [],
    isLoading,
    error,
  };
}; 