'use client';

import { useAllMemberGoal } from '../hooks/useAllMemberGoal';

type ViewAllMemberGoalModalProps = {
  onClose: () => void;
};

export const ViewAllMemberGoalModal = ({ onClose }: ViewAllMemberGoalModalProps) => {
  const { goals: memberGoals, isLoading: isLoadingMemberGoals, error: memberError } = useAllMemberGoal();

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">メンバーの目標</h3>
      <div className="space-y-4">
        {isLoadingMemberGoals ? (
          <p className="text-gray-500">読み込み中...</p>
        ) : memberError ? (
          <p className="text-red-500">エラーが発生しました</p>
        ) : !memberGoals ? (
          <p className="text-gray-400">データを読み込めませんでした</p>
        ) : memberGoals.length === 0 ? (
          <p className="text-gray-400">他のメンバーの目標はありません</p>
        ) : (
          memberGoals.map((member) => (
            <div key={member.id} className="border-b pb-4">
              <p className="font-medium text-gray-700 mb-2">{member.firstName} {member.lastName}</p>
              {member.weeklyGoals?.map((goal) => (
                <p key={goal.id} className="text-gray-600 pl-4">{goal.content}</p>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
