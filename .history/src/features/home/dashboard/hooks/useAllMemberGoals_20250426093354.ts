import { useEffect, useState } from 'react';

type MemberGoal = {
  id: string;
  content: string;
  isPublic: boolean;
  user: {
    name: string;
  };
};

export const useAllMemberGoals = () => {
  const [goals, setGoals] = useState<MemberGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('/api/user/weekly-goals/all');
        if (!response.ok) {
          throw new Error('Failed to fetch member goals');
        }
        const data = await response.json();
        setGoals(data.goals);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return {
    goals,
    isLoading,
    error,
  };
}; 