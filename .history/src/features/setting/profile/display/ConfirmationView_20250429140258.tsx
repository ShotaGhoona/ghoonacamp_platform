'use client';

import { ProfileFormData } from '../types/profile';
import { Button } from '@/components/ui/button';
import { ProfilePreview } from '../components/ProfilePreview';
import { DetailProfilePreview } from '../components/DetailProfilePreview';
import { useRouter } from 'next/navigation';

interface ConfirmationViewProps {
  formData: ProfileFormData;
  isLoading: boolean;
  error: string | null;
  onPrev: () => void;
  onSubmit: () => Promise<void>;
}

export const ConfirmationView = ({
  formData,
  isLoading,
  error,
  onPrev,
  onSubmit,
}: ConfirmationViewProps) => {
  const router = useRouter();

  const handleSubmit = async () => {
    await onSubmit();
    // 成功時はダッシュボードへリダイレクト
    router.push('/dashboard');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">プロフィールの確認</h2>
        <p className="text-sm text-gray-500">
          入力内容を確認してください。問題なければ「保存」ボタンを押してください。
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">基本プロフィール</h3>
          <ProfilePreview formData={formData} />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">詳細プロフィール</h3>
          <DetailProfilePreview formData={formData} />
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isLoading}
        >
          戻る
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? '保存中...' : '保存'}
        </Button>
      </div>
    </div>
  );
}; 