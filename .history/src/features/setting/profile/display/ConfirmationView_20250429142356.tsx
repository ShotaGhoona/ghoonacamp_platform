'use client';

import { ProfileFormData } from '../types/profile';
import { ProfilePreview } from '../components/ProfilePreview';

interface ConfirmationViewProps {
  formData: ProfileFormData;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const ConfirmationView = ({
  formData,
  onPrev,
  onSubmit,
  isSubmitting = false,
}: ConfirmationViewProps) => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">最終確認</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600 mb-4">
          以下の内容でプロフィールを更新します。内容をご確認ください。
        </p>

        {/* プレビュー */}
        <div className="mb-8">
          <ProfilePreview formData={formData} />
        </div>

        {/* 確認項目リスト */}
        <div className="space-y-4 mb-8">
          <h3 className="font-medium text-gray-900">入力内容の確認</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">ユーザーネーム</span>
              <span className="font-medium">{formData.username}</span>
            </div>
            
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-600">ひとこと</span>
              <span className="font-medium">{formData.bio}</span>
            </div>

            {formData.occupation && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">職業</span>
                <span className="font-medium">{formData.occupation}</span>
              </div>
            )}

            {formData.skills && formData.skills.length > 0 && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">スキル</span>
                <span className="font-medium">{formData.skills.join(', ')}</span>
              </div>
            )}

            {formData.githubUrl && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">GitHub</span>
                <a
                  href={formData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  {formData.githubUrl}
                </a>
              </div>
            )}

            {formData.twitterUrl && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Twitter</span>
                <a
                  href={formData.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  {formData.twitterUrl}
                </a>
              </div>
            )}

            {formData.websiteUrl && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Webサイト</span>
                <a
                  href={formData.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600"
                >
                  {formData.websiteUrl}
                </a>
              </div>
            )}

            {formData.selfIntroduction && (
              <div className="py-2 border-b">
                <span className="text-gray-600 block mb-2">自己紹介</span>
                <p className="font-medium whitespace-pre-wrap">
                  {formData.selfIntroduction}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ボタン */}
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700"
            disabled={isSubmitting}
          >
            戻る
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-pink-400 text-white rounded-md hover:bg-pink-500 disabled:bg-pink-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? '保存中...' : 'プロフィールを更新'}
          </button>
        </div>
      </div>
    </div>
  );
}; 