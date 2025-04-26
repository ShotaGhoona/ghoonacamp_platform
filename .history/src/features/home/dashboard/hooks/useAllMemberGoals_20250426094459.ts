import useSWR from 'swr';

type MemberGoal = {
  userId: string;
  content: string;
  user: {
    name: string;
  };
};

type MemberGoalsResponse = MemberGoal[];

export const useAllMemberGoals = () => {
  const { data, error, isLoading } = useSWR<MemberGoalsResponse>('/api/goals/members');

  return {
    data,
    isLoading,
    error,
  };
}; 