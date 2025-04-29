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
    <div className="flex flex-col justify-between h-full z-2">
      
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-2"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm px-4 py-2"
            placeholder="あなたを表す一言を入力"
          />
        </div>
      </div>

      {/* 次へボタン */}
      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500 transition-colors"
        >
          次へ
        </button>
      </div>
    </div>
  );
}; 