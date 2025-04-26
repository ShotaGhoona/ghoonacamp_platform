'use client';

import { ProfileSection } from './ProfileSection';
import { GoalsSection } from './GoalsSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';

const mockData = {
  profile: {
    name: 'Dawn Wanderer',
    title: '夜明けの旅人',
    avatarUrl: '/path/to/avatar.png',
    vision: 'AIの民主化によって世界を、生活を、1段階進化させる',
  },
  goals: [
    { id: '1', content: 'FastAPIを理解し使いこなせるようになる' },
    { id: '2', content: 'StarUpの開発で貢献し、人事評価を向上させる' },
    { id: '3', content: '毎朝朝活を続ける' },
  ],
  activities: [
    { day: 'M', me: 60, rival: 80, average: 50 },
    { day: 'T', me: 70, rival: 60, average: 50 },
    { day: 'W', me: 65, rival: 70, average: 50 },
    { day: 'T', me: 80, rival: 75, average: 50 },
    { day: 'F', me: 55, rival: 45, average: 50 },
    { day: 'S', me: 30, rival: 40, average: 50 },
    { day: 'S', me: 75, rival: 65, average: 50 },
  ] as const,
  statusCards: [
    { id: '1', imageUrl: '/path/to/card1.png' },
    { id: '2', imageUrl: '/path/to/card2.png' },
    { id: '3', imageUrl: '/path/to/card3.png' },
    { id: '4', isLocked: true },
    { id: '5', isLocked: true },
  ],
};

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* プロフィールセクション */}
      <ProfileSection {...mockData.profile} />

      {/* 目標セクション */}
      <GoalsSection
        goals={mockData.goals}
        onSetGoal={() => {}}
        onViewPreviousGoals={() => {}}
        onViewAllGoals={() => {}}
        onRequestGoal={() => {}}
      />

      {/* アクティビティとステータス */}
      <div className="grid grid-cols-2 gap-6">
        <ActivityGraph data={mockData.activities} />
        <StatusCard cards={mockData.statusCards} />
      </div>
    </div>
  );
} 