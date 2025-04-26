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
      <div className="flex-1 gap-6">
        <div className="w-[500px] h-[500px] bg-white rounded-lg">
          <ActivityGraph />
        </div>
        <div className="w-[500px] h-[500px] bg-white rounded-lg">
          <StatusCard/>
        </div>
      </div>
    </div>
  );
} 