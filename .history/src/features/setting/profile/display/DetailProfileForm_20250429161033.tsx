'use client';

import { useState } from 'react';
import { ProfileFormData, PRESET_INTERESTS, PRESET_SKILLS } from '../types/profile';

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
  const [showCustomInterest, setShowCustomInterest] = useState(false);
  const [showCustomSkill, setShowCustomSkill] = useState(false);

  const handleAddInterest = () => {
    if (newInterest.trim() && (!formData.interests?.includes(newInterest))) {
      onUpdate({ interests: [...(formData.interests || []), newInterest.trim()] });
      setNewInterest('');
      setShowCustomInterest(false);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && (!formData.coreSkills?.includes(newSkill))) {
      onUpdate({ coreSkills: [...(formData.coreSkills || []), newSkill.trim()] });
      setNewSkill('');
      setShowCustomSkill(false);
    }
  };

  const toggleInterest = (interest: string) => {
    const currentInterests = formData.interests || [];
    if (currentInterests.includes(interest)) {
      onUpdate({
        interests: currentInterests.filter(i => i !== interest)
      });
    } else {
      onUpdate({
        interests: [...currentInterests, interest]
      });
    }
  };

  const toggleSkill = (skill: string) => {
    const currentSkills = formData.coreSkills || [];
    if (currentSkills.includes(skill)) {
      onUpdate({
        coreSkills: currentSkills.filter(s => s !== skill)
      });
    } else {
      onUpdate({
        coreSkills: [...currentSkills, skill]
      });
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="space-y-8">
        {/* What I'm Into */}
        <div className="space-y-4">
          <label className="block text-base font-bold text-gray-700">
            What I'm Into
          </label>
          <div className="flex flex-wrap gap-2">
            {/* プリセットの興味・関心 */}
            {PRESET_INTERESTS.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.interests?.includes(interest)
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-100 text-pink-800 hover:bg-pink-200'
                }`}
              >
                {interest}
              </button>
            ))}
            {/* カスタム入力した興味・関心 */}
            {formData.interests?.filter(interest => !PRESET_INTERESTS.includes(interest)).map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className="px-3 py-1 rounded-full text-sm bg-gray-500 text-white hover:bg-gray-600"
              >
                {interest}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowCustomInterest(!showCustomInterest)}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              ＋ カスタム
            </button>
          </div>
          {showCustomInterest && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                className="block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
                placeholder="興味・関心を入力"
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
              />
              <button
                onClick={handleAddInterest}
                className="px-4 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500"
              >
                追加
              </button>
            </div>
          )}
        </div>

        {/* Core Skill Set */}
        <div className="space-y-4">
          <label className="block text-base font-bold text-gray-700">
            Core Skill Set
          </label>
          <div className="flex flex-wrap gap-2">
            {/* プリセットのスキル */}
            {PRESET_SKILLS.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  formData.coreSkills?.includes(skill)
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {skill}
              </button>
            ))}
            {/* カスタム入力したスキル */}
            {formData.coreSkills?.filter(skill => !PRESET_SKILLS.includes(skill)).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => toggleSkill(skill)}
                className="px-3 py-1 rounded-full text-sm bg-gray-500 text-white hover:bg-gray-600"
              >
                {skill}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowCustomSkill(!showCustomSkill)}
              className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              ＋ カスタム
            </button>
          </div>
          {showCustomSkill && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
                placeholder="スキルを入力"
                onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              />
              <button
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
              >
                追加
              </button>
            </div>
          )}
        </div>
        {/* SNSリンク */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={() => setIsSnsOpen(!isSnsOpen)}
            className="flex items-center w-full text-left"
          >
            <h3 className="text-base font-bold text-gray-900">SNSリンク（任意）</h3>
            <span className="text-gray-500 ml-2">{isSnsOpen ? '▼' : '▶'}</span>
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
      <div className="flex justify-between mt-8">
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