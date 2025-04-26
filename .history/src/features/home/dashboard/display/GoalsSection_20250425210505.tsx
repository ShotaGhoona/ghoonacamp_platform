import { PencilIcon, ArrowPathIcon, ListBulletIcon } from '@heroicons/react/24/outline';

type Goal = {
  id: string;
  content: string;
};

type GoalsSectionProps = {
  goals: Goal[];
  onSetGoal: () => void;
  onViewPreviousGoals: () => void;
  onViewAllGoals: () => void;
  onRequestGoal: () => void;
};

export const GoalsSection = ({
  goals,
  onSetGoal,
  onViewPreviousGoals,
  onViewAllGoals,
  onRequestGoal,
}: GoalsSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      {/* ヘッダー */}
      <div className="mb-4">
        <h2 className="text-sm text-gray-400">今週の目標</h2>
      </div>

      {/* 目標リスト */}
      <div className="space-y-3 mb-6">
        {goals.map((goal) => (
          <div key={goal.id} className="text-gray-700">{goal.content}</div>
        ))}
      </div>

      {/* アクション */}
      <div className="flex gap-3">
        <button
          onClick={onSetGoal}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <PencilIcon className="w-4 h-4" />
          今週の目標を設定
        </button>
        <button
          onClick={onViewPreviousGoals}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowPathIcon className="w-4 h-4" />
          先週の目標を振り返る
        </button>
        <button
          onClick={onViewAllGoals}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ListBulletIcon className="w-4 h-4" />
          目標一覧を見る
        </button>
        <button
          onClick={onRequestGoal}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Ask for Reqtor
        </button>
      </div>
    </div>
  );
}; 