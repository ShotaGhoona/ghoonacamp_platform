'use client';

import { ProfileSection } from './ProfileSection';
import { ActivityGraph } from './ActivityGraph';
import { StatusCard } from './StatusCard';
import { TierCard } from './TierCard';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex gap-10">
        <div className="w-[500px] h-[500px] bg-white rounded-lg">
          <TierCard />
        </div>
        <div className="flex-1 bg-white rounded-lg">
          <ProfileSection />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <ActivityGraph />
        <StatusCard/>
      </div>
    </div>
  );
} 