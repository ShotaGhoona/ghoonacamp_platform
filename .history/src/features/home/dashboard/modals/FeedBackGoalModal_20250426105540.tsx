'use client';

import { useState, useEffect } from 'react';
import { useWeeklyGoals } from '../hooks/useWeeklyGoals';

type FeedBackGoalModalProps = {
  onClose: () => void;
};

type GoalFeedback = {
  goalId: number;
  feedback: string;
};

export const FeedBackGoalModal = ({ onClose }: FeedBackGoalModalProps) => {
  const { goals: currentGoals, isLoading } = useWeeklyGoals();
  const [feedbacks, setFeedbacks] = useState<GoalFeedback[]>([]);

  // 目標のフィードバックを初期化
  useEffect(() => {
    if (currentGoals) {
      setFeedbacks(
        currentGoals.map(goal => ({
          goalId: goal.id,
          feedback: goal.reflection || ''
        }))
      );
    }
  }, [currentGoals]);

  const updateFeedback = (goalId: number, feedback: string) => {
    setFeedbacks(prev =>
      prev.map(item =>
        item.goalId === goalId ? { ...item, feedback } : item
      )
    );
  };

  const handleSave = async () => {
    // TODO: フィードバックを保存するAPIを実装
    onClose();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-6 flex-1 flex flex-col">
        {/* タイトル */}
        <h2 className="text-2xl font-bold text-gray-800">先週の目標へのフィードバック</h2>

        {/* ビジョン */}
        <div className="w-full border border-gray-300 rounded-lg p-5 flex flex-col">
          <p className="text-sm text-gray-400">将来なりたい姿・ビジョン</p>
          <p className="
          flex-1 text-3xl font-bold text-center flex items-center justify-center
          text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
          ">AIの民主化によって世界を、生活を、1段階進化させる</p>
        </div>

        {/* 目標とフィードバック */}
        <div className="max-h-[500px] flex-1 space-y-4 overflow-y-auto">
          {currentGoals.map((goal) => (
            <div key={goal.id} className="space-y-2 bg-gray-100 rounded-lg px-5 py-3 min-h-[050px]">
              {/* 目標（読み取り専用） */}
              <div className="border-b border-gray-500 pb-2">
                <p className="text-gray-700 text-xl">{goal.content}</p>
              </div>
              {/* フィードバック入力 */}
              <div className="flex-1">
                <input
                  type="text"
                  className="w-full py-2 focus:outline-none focus:ring-none"
                  placeholder="フィードバックを入力"
                  value={feedbacks.find(f => f.goalId === goal.id)?.feedback || ''}
                  onChange={(e) => updateFeedback(goal.id, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ボタン */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm font-medium text-white bg-[#5D6B80] border border-transparent rounded-md shadow-sm hover:bg-[#4D5B70] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存
        </button>
      </div>
    </div>
  );
};
