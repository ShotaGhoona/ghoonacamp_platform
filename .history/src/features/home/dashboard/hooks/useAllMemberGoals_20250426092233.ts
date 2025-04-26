import { useState, useEffect } from 'react';

type MemberGoal = {
  id: string;
  content: string;
  isPublic: boolean;
  user: {
    name: string;
    image: string;
  };
};

export const useAllMemberGoals = () => {
  const [goals, setGoals] = useState<MemberGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch('/api/goals/all');
        if (!response.ok) {
          throw new Error('目標の取得に失敗しました');
        }
        const data = await response.json();
        setGoals(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  return { goals, isLoading, error };
}; 