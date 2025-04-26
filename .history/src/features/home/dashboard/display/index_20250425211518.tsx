'use client';

import { ProfileSection } from './ProfileSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';
import { TierCard } from './TierCard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <TierCard />
        <ProfileSection />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <ActivityGraph />
        <StatusCard/>
      </div>
    </div>
  );
} 