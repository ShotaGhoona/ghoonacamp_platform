'use client';

import { useAuth } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

type UserTier = {
  id: number;
  level: number;
  titleJa: string;
  titleEn: string;
  cardImageUrl: string;
  badgeColor: string;
};

export const useUserTier = () => {
  const { userId } = useAuth();
  const [tier, setTier] = useState<UserTier | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUserTier = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user/tier?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user tier');
        }
        const data = await response.json();
        setTier(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTier();
  }, [userId]);

  return { tier, isLoading, error };
}; 