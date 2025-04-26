'use client';

import { useState, useEffect } from 'react';
import { useSaveWeeklyGoal, WeeklyGoalInput } from '../hooks/useSaveWeeklyGoal';
import { useWeeklyGoals } from '../hooks/useWeeklyGoals';

type EditGoalModalProps = {
  onClose: () => void;
};

export const EditGoalModal = ({ onClose }: EditGoalModalProps) => {
  const { saveGoals, isLoading: isSaving, error: saveError } = useSaveWeeklyGoal();
  const { goals: currentGoals, isLoading: isLoadingGoals } = useWeeklyGoals();
  const [goals, setGoals] = useState<string[]>(['', '', '']);
  const [isPublic, setIsPublic] = useState(true);

  // 既存の目標をフォームに設定
  useEffect(() => {
    if (currentGoals && currentGoals.length > 0) {
      // 現在の目標をフォームに設定
      const contents = currentGoals.map(goal => goal.content);
      // 3つに満たない場合は空文字で埋める
      while (contents.length < 3) {
        contents.push('');
      }
      setGoals(contents);
      // 公開設定も既存の設定を使用
      setIsPublic(currentGoals[0]?.isPublic ?? true);
    }
  }, [currentGoals]);

  const handleSave = async () => {
    const input: WeeklyGoalInput = {
      goals: goals.filter(goal => goal.trim() !== ''),
      isPublic,
    };

    const success = await saveGoals(input);
    if (success) {
      onClose();
    }
  };

  if (isLoadingGoals) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-[100%]">
      <div className="">
        {/* タイトル */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">今週の目標を設定</h2>
        <div className="w-full border border-gray-300 rounded-lg p-5 flex flex-col mb-5">
            <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
            <p className="
            flex-1 text-3xl font-bold text-center flex items-center justify-center
            text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
            ">AIの民主化によって世界を、生活を、1段階進化させる</p>
        </div>

        {/* エラーメッセージ */}
        {saveError && (
          <div className="mb-4 text-red-500 text-sm">
            {saveError.message}
          </div>
        )}

        {/* フォーム */}
        <div className="space-y-4">
            {/* 目標1 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                placeholder="目標を入力（必須）"
                value={goals[0]}
                onChange={(e) => setGoals([e.target.value, goals[1], goals[2]])}
            />
            </div>

            {/* 目標2 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                placeholder="目標を入力（任意）"
                value={goals[1]}
                onChange={(e) => setGoals([goals[0], e.target.value, goals[2]])}
            />
            </div>

            {/* 目標3 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                placeholder="目標を入力（任意）"
                value={goals[2]}
                onChange={(e) => setGoals([goals[0], goals[1], e.target.value])}
            />
            </div>

            {/* 公開設定 */}
            <div className="flex items-center gap-2 mt-4">
            <input
                type="checkbox"
                id="isPublic"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
                目標を他のメンバーに公開する
            </label>
            </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          onClick={handleSave}
          disabled={isSaving || !goals[0].trim()}
          className={`px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isSaving || !goals[0].trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#5D6B80] hover:bg-[#4D5B70]'
          }`}
        >
          {isSaving ? '保存中...' : '保存する'}
        </button>
      </div>
    </div>
  );
}; 