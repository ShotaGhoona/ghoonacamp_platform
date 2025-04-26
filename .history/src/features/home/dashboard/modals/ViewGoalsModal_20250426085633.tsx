'use client';

import { useWeeklyGoals } from '../hooks/useWeeklyGoals';

type ViewGoalsModalProps = {
  onClose: () => void;
};

export const ViewGoalsModal = ({ onClose }: ViewGoalsModalProps) => {
  const { goals, isLoading, error } = useWeeklyGoals();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">エラーが発生しました</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-5">みんなの目標</h2>
      
      <div className="space-y-6">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">今週</span>
              <span className="text-sm font-medium text-gray-700">{goal.userId}</span>
            </div>
            <p className="text-gray-800">{goal.content}</p>
          </div>
        ))}

        {goals.length === 0 && (
          <p className="text-center text-gray-500">
            公開されている目標はありません
          </p>
        )}
      </div>
    </div>
  );
}; 