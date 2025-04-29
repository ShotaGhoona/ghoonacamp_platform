'use client';

import { ProfileFormData } from '../types/profile';
import { Button } from '@/components/ui/button';

interface ConfirmationViewProps {
  formData: ProfileFormData;
  onPrev: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ConfirmationView = ({
  formData,
  onPrev,
  onSubmit,
  isSubmitting,
}: ConfirmationViewProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">確認画面</h2>
        <p className="mt-1 text-sm text-gray-500">
          入力内容を確認してください。問題なければ「保存」ボタンを押してください。
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700">基本情報</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">ユーザー名：</span>
              {formData.username}
            </p>
            <p>
              <span className="font-medium">ひとこと：</span>
              {formData.bio || '未設定'}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">詳細情報</h3>
          <div className="mt-2 space-y-2">
            <p>
              <span className="font-medium">一行プロフィール：</span>
              {formData.oneLine || '未設定'}
            </p>
            <p>
              <span className="font-medium">バックグラウンド：</span>
              {formData.background || '未設定'}
            </p>
            <div>
              <span className="font-medium">興味・関心：</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.interests?.map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 text-sm bg-pink-100 text-pink-800 rounded"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">コアスキル：</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.coreSkills?.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">SNSリンク</h3>
          <div className="mt-2 space-y-2">
            {formData.websiteUrl && (
              <p>
                <span className="font-medium">ウェブサイト：</span>
                {formData.websiteUrl}
              </p>
            )}
            {formData.xUrl && (
              <p>
                <span className="font-medium">X：</span>
                {formData.xUrl}
              </p>
            )}
            {formData.instagramUrl && (
              <p>
                <span className="font-medium">Instagram：</span>
                {formData.instagramUrl}
              </p>
            )}
            {formData.linkedinUrl && (
              <p>
                <span className="font-medium">LinkedIn：</span>
                {formData.linkedinUrl}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
        >
          戻る
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '保存中...' : '保存'}
        </Button>
      </div>
    </div>
  );
}; 