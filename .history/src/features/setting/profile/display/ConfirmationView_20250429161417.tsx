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
    <div className="flex flex-col justify-between h-full">
      <h2 className="text-2xl font-bold">最終確認</h2>

      <div className="bg-gray-50 p-6 rounded-lg">
        {/* ボタン */}
        <div className="flex justify-between">
          <button
            onClick={onPrev}
            className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
            disabled={isSubmitting}
          >
            戻る
          </button>
          <button
            onClick={onSubmit}
            className="px-6 py-2 bg-[#374559] text-white rounded-md hover:bg-[#D68897] disabled:bg-pink-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? '保存中...' : 'プロフィールを更新'}
          </button>
        </div>
      </div>
    </div>
  );
}; 