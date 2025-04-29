'use client';

import { useState } from 'react';
import { ProfileFormData } from '../types/profile';

interface DetailProfileFormProps {
  formData: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

export const DetailProfileForm = ({
  formData,
  onUpdate,
  onPrev,
  onNext,
}: DetailProfileFormProps) => {
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleAddInterest = () => {
    if (newInterest.trim() && (!formData.interests?.includes(newInterest))) {
      onUpdate({ interests: [...(formData.interests || []), newInterest.trim()] });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    onUpdate({
      interests: formData.interests?.filter(interest => interest !== interestToRemove)
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && (!formData.coreSkills?.includes(newSkill))) {
      onUpdate({ coreSkills: [...(formData.coreSkills || []), newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate({
      coreSkills: formData.coreSkills?.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8">
        {/* One-Line Profile */}
        <div className="space-y-2">
          <label
            htmlFor="oneLine"
            className="block text-base font-bold text-gray-700"
          >
            One-Line Profile
            <span className="text-sm text-gray-500 ml-2">
              (30文字以内)
            </span>
          </label>
          <input
            type="text"
            id="oneLine"
            maxLength={30}
            value={formData.oneLine || ''}
            onChange={(e) => onUpdate({ oneLine: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
            placeholder="自分を一言で表現してください"
          />
        </div>
        {/* Background */}
        <div className="space-y-2">
          <label
            htmlFor="background"
            className="block text-base font-bold text-gray-700"
          >
            Background
            <span className="text-sm text-gray-500 ml-2">
              (140文字以内)
            </span>
          </label>
          <textarea
            id="background"
            maxLength={140}
            value={formData.background || ''}
            onChange={(e) => onUpdate({ background: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
            placeholder="あなたの経歴や背景を教えてください"
          />
        </div>
        
        <div className="flex gap-4">
          {/* What I'm Into */}
          <div className="space-y-2">
            <label className="block text-base font-bold text-gray-700">
            What I'm Into
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
              placeholder="興味のあることを入力"
              onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
            />
            <button
              onClick={handleAddInterest}
              className="mt-1 px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.interests?.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-2 text-pink-600 hover:text-pink-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Core Skill Set */}
        <div className="space-y-2">
          <label className="block text-base font-bold text-gray-700">
            Core Skill Set
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
              placeholder="スキルを入力"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <button
              onClick={handleAddSkill}
              className="mt-1 px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.coreSkills?.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
        </div>
        {/* SNSリンク */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">SNSリンク</h3>
          
          {/* Instagram */}
          <div className="space-y-2">
            <label
              htmlFor="instagramUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Instagram
            </label>
            <input
              type="url"
              id="instagramUrl"
              value={formData.instagramUrl || ''}
              onChange={(e) => onUpdate({ instagramUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://instagram.com/username"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            <input
              type="url"
              id="websiteUrl"
              value={formData.websiteUrl || ''}
              onChange={(e) => onUpdate({ websiteUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://your-website.com"
            />
          </div>

          {/* X (Twitter) */}
          <div className="space-y-2">
            <label
              htmlFor="xUrl"
              className="block text-sm font-medium text-gray-700"
            >
              X
            </label>
            <input
              type="url"
              id="xUrl"
              value={formData.xUrl || ''}
              onChange={(e) => onUpdate({ xUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://x.com/username"
            />
          </div>

          {/* LinkedIn */}
          <div className="space-y-2">
            <label
              htmlFor="linkedinUrl"
              className="block text-sm font-medium text-gray-700"
            >
              LinkedIn
            </label>
            <input
              type="url"
              id="linkedinUrl"
              value={formData.linkedinUrl || ''}
              onChange={(e) => onUpdate({ linkedinUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
        >
          戻る
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
        >
          次へ
        </button>
      </div>
    </div>
  );
}; 