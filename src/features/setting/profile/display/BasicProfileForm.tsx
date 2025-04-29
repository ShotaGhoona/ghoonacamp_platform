'use client';

import { ProfileFormData } from '../types/profile';
import { AvatarUpload } from '../components/AvatarUpload';

interface BasicProfileFormProps {
  formData: ProfileFormData;
  onUpdate: (data: Partial<ProfileFormData>) => void;
  onAvatarChange: (file: File) => void;
  onNext: () => void;
}

export const BasicProfileForm = ({
  formData,
  onUpdate,
  onAvatarChange,
  onNext,
}: BasicProfileFormProps) => {
  return (
    <div className="flex flex-col justify-between h-full">
      
      <div className="space-y-8">
        {/* アバターアップロード */}
        <div className="space-y-4">
          <label className="block text-base font-bold text-gray-700">
            Ghoona Campプロフィールアバター
          </label>
          <AvatarUpload
            onFileSelect={onAvatarChange}
            previewUrl={formData.avatarUrl}
          />
        </div>

        {/* ユーザーネーム */}
        <div className="space-y-2">
          <label
            htmlFor="username"
            className="block text-base font-bold text-gray-700"
          >
            ユーザーネーム
          </label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={(e) => onUpdate({ username: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
            placeholder="ユーザーネームを入力"
          />
        </div>

        {/* ひとこと */}
        <div className="space-y-2">
          <label
            htmlFor="bio"
            className="block text-base font-bold text-gray-700"
          >
            公開フレーズ｜ひとこと
          </label>
          <input
            type="text"
            id="bio"
            value={formData.bio}
            onChange={(e) => onUpdate({ bio: e.target.value })}
            className="mt-1 block w-full rounded-md bg-[#f9f9f9] px-4 py-2"
            placeholder="あなたを表す一言を入力"
          />
        </div>
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
            className="block text-base font-bold text-gray-700 "
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











      </div>

      {/* 次へボタン */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-[#374559] text-white px-6 py-2 rounded-md hover:bg-[#374559] transition-colors"
        >
          次へ
        </button>
      </div>
    </div>
  );
}; 