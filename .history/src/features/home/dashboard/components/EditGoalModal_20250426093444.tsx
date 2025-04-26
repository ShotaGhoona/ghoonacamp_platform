import { useState } from 'react';
import { PopUp } from '@/components/display/PopUp';
import { Button } from '@/components/ui/button';
import { useWeeklyGoal } from '../hooks/useWeeklyGoal';
import { useUpdateWeeklyGoal } from '../hooks/useUpdateWeeklyGoal';
import { useDeleteWeeklyGoal } from '../hooks/useDeleteWeeklyGoal';
import { useToast } from '@/components/ui/use-toast';

type EditGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const EditGoalModal = ({ isOpen, onClose }: EditGoalModalProps) => {
  const { toast } = useToast();
  const { goal } = useWeeklyGoal();
  const { updateGoal, isLoading: isUpdating } = useUpdateWeeklyGoal();
  const { deleteGoal, isLoading: isDeleting } = useDeleteWeeklyGoal();
  const [content, setContent] = useState(goal?.content || '');
  const [isPublic, setIsPublic] = useState(goal?.isPublic || false);
  const [showMemberGoals, setShowMemberGoals] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      toast({
        title: 'エラー',
        description: '目標を入力してください',
        variant: 'destructive',
      });
      return;
    }

    try {
      await updateGoal({ content, isPublic });
      toast({
        title: '成功',
        description: '目標を更新しました',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'エラー',
        description: '目標の更新に失敗しました',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGoal();
      toast({
        title: '成功',
        description: '目標を削除しました',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'エラー',
        description: '目標の削除に失敗しました',
        variant: 'destructive',
      });
    }
  };

  return (
    <PopUp isOpen={isOpen} onClose={onClose} showMemberGoals={showMemberGoals}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">今週の目標を編集</h2>
          <p className="mt-1 text-sm text-gray-500">
            今週の目標を設定して、チームメンバーと共有しましょう。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="goal"
              className="block text-sm font-medium text-gray-700"
            >
              目標
            </label>
            <textarea
              id="goal"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="今週の目標を入力してください"
            />
          </div>

          <div className="flex items-center">
            <input
              id="public"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label
              htmlFor="public"
              className="ml-2 block text-sm text-gray-900"
            >
              目標を公開する
            </label>
          </div>

          <div className="flex justify-between items-center pt-4">
            <div className="space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowMemberGoals(!showMemberGoals)}
              >
                メンバーの目標を覗く
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                削除
              </Button>
            </div>
            <Button type="submit" disabled={isUpdating}>
              保存
            </Button>
          </div>
        </form>
      </div>
    </PopUp>
  );
}; 