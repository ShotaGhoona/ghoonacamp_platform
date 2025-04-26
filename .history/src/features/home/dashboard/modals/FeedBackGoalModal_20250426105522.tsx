'use client';

import { useState, useEffect } from 'react';
import { useWeeklyGoals } from '../hooks/useWeeklyGoals';

type FeedBackGoalModalProps = { onClose: () => void };
type GoalFeedback = { goalId: number; feedback: string };

export const FeedBackGoalModal = ({ onClose }: FeedBackGoalModalProps) => {
  /* ─── data ───────────────────────────────────────── */
  const { goals: currentGoals, isLoading } = useWeeklyGoals();
  const [feedbacks, setFeedbacks] = useState<GoalFeedback[]>([]);

  useEffect(() => {
    if (currentGoals) {
      setFeedbacks(
        currentGoals.map(g => ({
          goalId: g.id,
          feedback: g.reflection ?? '',
        })),
      );
    }
  }, [currentGoals]);

  const updateFeedback = (goalId: number, feedback: string) =>
    setFeedbacks(prev =>
      prev.map(f => (f.goalId === goalId ? { ...f, feedback } : f)),
    );

  const handleSave = async () => {
    /* TODO: 保存処理 */
    onClose();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-gray-500">読み込み中…</p>
      </div>
    );
  }

  /* ─── UI ─────────────────────────────────────────── */
  return (
    <div className="flex h-full flex-col">
      {/* ── ① 固定ヘッダー（スクロールさせない）── */}
      <header className="shrink-0 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">
          先週の目標へのフィードバック
        </h2>

        <div className="w-full rounded-lg border border-gray-300 p-5">
          <p className="text-sm text-gray-400 mb-3">将来なりたい姿・ビジョン</p>
          <p className="text-center text-3xl font-bold
                       bg-gradient-to-r from-[#5F7392] to-[#BF6375]
                       bg-clip-text text-transparent">
            AIの民主化によって世界を、生活を、1段階進化させる
          </p>
        </div>
      </header>

      {/* ── ② スクロール領域 ─────────────────── */}
      {/* flex-1 で残りを埋める → min-h-0 で縮められる → overflow-auto */}
      <section className="mt-6 flex-1 min-h-0 space-y-4 overflow-y-auto pr-1">
        {currentGoals.map(goal => (
          <div
            key={goal.id}
            className="space-y-2 rounded-lg bg-gray-100 px-5 py-3"
          >
            <div className="border-b border-gray-500 pb-2">
              <p className="text-xl text-gray-700">{goal.content}</p>
            </div>

            <input
              type="text"
              className="w-full bg-transparent py-2 focus:outline-none"
              placeholder="フィードバックを入力"
              value={feedbacks.find(f => f.goalId === goal.id)?.feedback ?? ''}
              onChange={e => updateFeedback(goal.id, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* ── ③ フッターボタン ─────────────────── */}
      <footer className="mt-6 flex shrink-0 justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white
                     px-4 py-2 text-sm font-medium text-gray-700
                     shadow-sm hover:bg-gray-50"
        >
          キャンセル
        </button>
        <button
          onClick={handleSave}
          className="rounded-md border border-transparent bg-[#5D6B80]
                     px-4 py-2 text-sm font-medium text-white shadow-sm
                     hover:bg-[#4D5B70]"
        >
          保存
        </button>
      </footer>
    </div>
  );
};
