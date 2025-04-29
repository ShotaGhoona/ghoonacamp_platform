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
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && (!formData.skills?.includes(newSkill))) {
      onUpdate({ skills: [...(formData.skills || []), newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onUpdate({
      skills: formData.skills?.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">詳細プロフィール</h2>
      
      <div className="space-y-8">
        {/* 職業 */}
        <div className="space-y-2">
          <label
            htmlFor="occupation"
            className="block text-sm font-medium text-gray-700"
          >
            職業
          </label>
          <input
            type="text"
            id="occupation"
            value={formData.occupation || ''}
            onChange={(e) => onUpdate({ occupation: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
            placeholder="現在の職業を入力"
          />
        </div>

        {/* スキル */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            スキル・技術
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
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
            {formData.skills?.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-pink-100 text-pink-800"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-pink-600 hover:text-pink-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* SNSリンク */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">SNSリンク</h3>
          
          {/* GitHub */}
          <div className="space-y-2">
            <label
              htmlFor="githubUrl"
              className="block text-sm font-medium text-gray-700"
            >
              GitHub
            </label>
            <input
              type="url"
              id="githubUrl"
              value={formData.githubUrl || ''}
              onChange={(e) => onUpdate({ githubUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://github.com/username"
            />
          </div>

          {/* Twitter */}
          <div className="space-y-2">
            <label
              htmlFor="twitterUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Twitter
            </label>
            <input
              type="url"
              id="twitterUrl"
              value={formData.twitterUrl || ''}
              onChange={(e) => onUpdate({ twitterUrl: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
              placeholder="https://twitter.com/username"
            />
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label
              htmlFor="websiteUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Webサイト
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
        </div>

        {/* 自己紹介 */}
        <div className="space-y-2">
          <label
            htmlFor="selfIntroduction"
            className="block text-sm font-medium text-gray-700"
          >
            自己紹介
          </label>
          <textarea
            id="selfIntroduction"
            value={formData.selfIntroduction || ''}
            onChange={(e) => onUpdate({ selfIntroduction: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-400 focus:ring-pink-400"
            placeholder="あなたについて詳しく教えてください"
          />
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