'use client';

import { ProfileFormData } from '../types/profile';

interface DetailProfilePreviewProps {
  formData: ProfileFormData;
}

export const DetailProfilePreview = ({ formData }: DetailProfilePreviewProps) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-lg p-5 gap-4">
      <div className="flex gap-4">
        <img src={formData.avatarUrl} alt={formData.username} className="w-[200px] h-[200px] rounded-lg" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-400">One-Line Profile</p>
            <p className="text-gray-700">{formData.oneLine}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-400">Background</p>
            <p className="text-gray-700">{formData.background}</p>
          </div>
          
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/2 border-gray-100 border-2 rounded-lg p-4">
          <p className="text-base font-bold text-gray-400">What I'm Into</p>
          <div className="flex flex-wrap gap-2">
            {formData.interests?.map((interest) => (
              <span key={interest} className="text-base text-gray-400">#{interest}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-1/2 border-gray-100 border-2 rounded-lg p-4">
          <p className="text-base font-bold text-gray-400">Core Skill Set</p>
          <div className="flex flex-wrap gap-2">
            {formData.coreSkills?.map((skill) => (
              <span key={skill} className="text-base text-gray-400">#{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 