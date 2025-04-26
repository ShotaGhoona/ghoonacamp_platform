'use client';

import { ProfileSection } from './ProfileSection';
import { GoalsSection } from './GoalsSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';



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