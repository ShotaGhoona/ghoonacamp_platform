import { useState } from 'react';
import { PopUp } from '@/components/display/PopUp';
import { useWeeklyGoal } from '../hooks/useWeeklyGoal';
import { useUpdateWeeklyGoal } from '../hooks/useUpdateWeeklyGoal';
import { useDeleteWeeklyGoal } from '../hooks/useDeleteWeeklyGoal';

type EditGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditGoalModal = ({ isOpen, onClose }: EditGoalModalProps) => {
  const { goal, isLoading: isLoadingGoal } = useWeeklyGoal();
  const { updateGoal, isLoading: isUpdating } = useUpdateWeeklyGoal();
  const { deleteGoal, isLoading: isDeleting } = useDeleteWeeklyGoal();
  const [content, setContent] = useState(goal?.content || '');
  const [isPublic, setIsPublic] = useState(goal?.isPublic || false);
  const [showMemberGoals, setShowMemberGoals] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    await updateGoal({
      id: goal.id,
      content,
      isPublic,
    });
    onClose();
  };

  const handleDelete = async () => {
    if (!goal) return;
    await deleteGoal(goal.id);
    onClose();
  };

  const isLoading = isLoadingGoal || isUpdating || isDeleting;

  return (
    <PopUp isOpen={isOpen} onClose={onClose} showMemberGoals={showMemberGoals}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">今週の目標を編集</h2>
          <button
            onClick={() => setShowMemberGoals(!showMemberGoals)}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            メンバーの目標を覗く
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              目標
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-32 p-2 border border-gray-300 rounded-md"
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              disabled={isLoading}
            />
            <label htmlFor="isPublic" className="ml-2 text-sm text-gray-700">
              他のメンバーに公開する
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              disabled={isLoading}
            >
              削除
            </button>
            <div className="space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 transition-colors"
                disabled={isLoading}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                disabled={isLoading}
              >
                保存
              </button>
            </div>
          </div>
        </form>
      </div>
    </PopUp>
  );
}; 