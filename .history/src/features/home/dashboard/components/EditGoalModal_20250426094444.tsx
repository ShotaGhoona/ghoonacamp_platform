import { useState } from 'react';
import { PopUp } from '@/components/display/PopUp';
import { useWeeklyGoal } from '../hooks/useWeeklyGoal';
import { useAllMemberGoals } from '../hooks/useAllMemberGoals';
import { LoadingSpinner } from '@/components/display/LoadingSpinner';

type EditGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditGoalModal = ({ isOpen, onClose }: EditGoalModalProps) => {
  const [showMemberGoals, setShowMemberGoals] = useState(false);
  const { data: weeklyGoal, isLoading: isLoadingGoal } = useWeeklyGoal();
  const { data: memberGoals, isLoading: isLoadingMemberGoals } = useAllMemberGoals();

  const MemberGoalsPanel = () => {
    if (isLoadingMemberGoals) {
      return (
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      );
    }

    return (
      <div className="p-4 h-full overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">メンバーの目標</h2>
        <div className="space-y-4">
          {memberGoals?.map((goal) => (
            <div key={goal.userId} className="border rounded-lg p-4">
              <h3 className="font-semibold">{goal.user.name}</h3>
              <p className="mt-2 text-gray-600">{goal.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoadingGoal) {
    return (
      <PopUp isOpen={isOpen} onClose={onClose}>
        <div className="flex justify-center items-center h-full">
          <LoadingSpinner />
        </div>
      </PopUp>
    );
  }

  return (
    <PopUp
      isOpen={isOpen}
      onClose={onClose}
      showLeftPanel={showMemberGoals}
      leftPanelContent={<MemberGoalsPanel />}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">今週の目標</h2>
          <button
            onClick={() => setShowMemberGoals(!showMemberGoals)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            メンバーの目標を覗く
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg">{weeklyGoal?.content}</p>
        </div>
      </div>
    </PopUp>
  );
}; 