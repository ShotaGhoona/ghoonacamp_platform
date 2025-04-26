import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/nextjs';

type UpdateGoalInput = {
  content: string;
  isPublic: boolean;
};

export const useUpdateWeeklyGoal = () => {
  const { userId } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: updateGoal, isLoading } = useMutation({
    mutationFn: async (input: UpdateGoalInput) => {
      const response = await fetch(`/api/goals/weekly`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Failed to update weekly goal');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weeklyGoal', userId] });
    },
  });

  return { updateGoal, isLoading };
}; 