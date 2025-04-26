import { useQuery } from "@tanstack/react-query";

interface WeeklyGoal {
  id: string;
  content: string;
  isPublic: boolean;
  isPast: boolean;
  weekStart: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface WeeklyGoalsResponse {
  weeklyGoals: WeeklyGoal[];
}

export const useWeeklyGoals = () => {
  return useQuery<WeeklyGoalsResponse>({
    queryKey: ["weeklyGoals", "current"],
    queryFn: async () => {
      const response = await fetch("/api/weekly-goals/current");
      if (!response.ok) {
        throw new Error("Failed to fetch weekly goals");
      }
      return response.json();
    },
  });
}; 