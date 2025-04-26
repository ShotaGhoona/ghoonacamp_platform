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
    { day: 'M' as const, me: 60, rival: 80, average: 50 },
    { day: 'T' as const, me: 70, rival: 60, average: 50 },
    { day: 'W' as const, me: 65, rival: 70, average: 50 },
    { day: 'T' as const, me: 80, rival: 75, average: 50 },
    { day: 'F' as const, me: 55, rival: 45, average: 50 },
    { day: 'S' as const, me: 30, rival: 40, average: 50 },
    { day: 'S' as const, me: 75, rival: 65, average: 50 },
  ],
  statusCards: [
    { id: '1', imageUrl: '/path/to/card1.png' },
    { id: '2', imageUrl: '/path/to/card2.png' },
    { id: '3', imageUrl: '/path/to/card3.png' },
    { id: '4', imageUrl: '', isLocked: true },
    { id: '5', imageUrl: '', isLocked: true },
  ],
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
        <div>
          <TierSection />
          <ProfileSection />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <ActivityGraph data={mockData.activities} />
        <StatusCard cards={mockData.statusCards} />
      </div>
    </div>
  );
} 