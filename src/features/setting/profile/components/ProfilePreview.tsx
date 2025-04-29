'use client';

import { ProfileFormData } from '../types/profile';
import { ProfileCard } from '@/components/common/profileCard';
interface ProfilePreviewProps {
  formData: ProfileFormData;
}

export const ProfilePreview = ({ formData }: ProfilePreviewProps) => {
  return (
    <div className="flex justify-center  w-full gap-4 relative">
      <div className="w-[300px] top-0 left-0">
        <ProfileCard href={formData.avatarUrl || ''} alt={formData.username || ''} username={formData.username || ''} bio={formData.bio || ''} />
      </div>
      <div className="w-[300px] absolute top-0 -left-[50px]">
        <ProfileCard href={formData.avatarUrl || ''} alt={formData.username || ''} username={formData.username || ''} bio={formData.bio || ''} />
      </div>
      <div className="w-[300px] absolute top-0 -right-[50px]">
        <ProfileCard href={formData.avatarUrl || ''} alt={formData.username || ''} username={formData.username || ''} bio={formData.bio || ''} />
      </div>
      <div className="w-[300px] h-full absolute top-0 -left-[50px] bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="w-[300px] h-full absolute top-0 -right-[50px] bg-gradient-to-r from-transparent to-white z-10"></div>
    </div>
  );
}; 