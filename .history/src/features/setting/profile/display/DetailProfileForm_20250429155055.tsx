'use client';

import { useState } from 'react';
import { ProfileFormData } from '../types/profile';

interface DetailProfileFormProps {
  formData: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
  onPrev: () => void;
  onNext: () => void;
}

type SnsField = {
  id: keyof Pick<ProfileFormData, 'instagramUrl' | 'websiteUrl' | 'xUrl' | 'linkedinUrl'>;
  label: string;
  placeholder: string;
};

const SNS_FIELDS: SnsField[] = [
  {
    id: 'instagramUrl',
    label: 'Instagram',
    placeholder: 'https://instagram.com/username'
  },
  {
    id: 'websiteUrl',
    label: 'Website',
    placeholder: 'https://your-website.com'
  },
  {
    id: 'xUrl',
    label: 'X',
    placeholder: 'https://x.com/username'
  },
  {
    id: 'linkedinUrl',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/username'
  }
];

export const DetailProfileForm = ({
  formData,
  onUpdate,
  onPrev,
  onNext,
}: DetailProfileFormProps) => {
  const [newInterest, setNewInterest] = useState('');
  const [newSkill, setNewSkill] = useState('');
  const [isSnsOpen, setIsSnsOpen] = useState(false);

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
          <button
            type="button"
            onClick={() => setIsSnsOpen(!isSnsOpen)}
            className="flex items-center w-full text-left"
          >
            <h3 className="text-base font-bold text-gray-900">SNSリンク（任意）</h3>
            <span className="text-gray-500">{isSnsOpen ? '▼' : '▶'}</span>
          </button>
          
          {isSnsOpen && (
            <div className="space-y-4 pt-4">
              {SNS_FIELDS.map(({ id, label, placeholder }) => (
                <div key={id} className="flex gap-4 items-center">
                  <label
                    htmlFor={id}
                    className="block text-base font-bold min-w-[100px] text-gray-700"
                  >
                    {label}
                  </label>
                  <input
                    type="url"
                    id={id}
                    value={formData[id] || ''}
                    onChange={(e) => onUpdate({ [id]: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ナビゲーションボタン */}
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
        >
          戻る
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 bg-[#374559] text-white rounded-md hover:bg-[#D68897]"
        >
          次へ
        </button>
      </div>
    </div>
  );
}; 