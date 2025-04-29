'use client';

import { useState } from 'react';
import { StepIndicator } from '@/features/setting/profile/components/StepIndicator';
import { BasicProfileForm } from '@/features/setting/profile/display/BasicProfileForm';
import { DetailProfileForm } from '@/features/setting/profile/display/DetailProfileForm';
import { ConfirmationView } from '@/features/setting/profile/display/ConfirmationView';
import { useProfileForm } from '@/features/setting/profile/hooks/useProfileForm';

export default function ProfileSettingPage() {
  const {
    currentStep,
    formData,
    updateFormData,
    handleNextStep,
    handlePrevStep,
    handleAvatarChange,
  } = useProfileForm();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: APIを呼び出してプロフィールを更新
      await new Promise(resolve => setTimeout(resolve, 1000)); // 仮の遅延
      // 成功時の処理（例：ダッシュボードへリダイレクト）
    } catch (error) {
      console.error('プロフィールの更新に失敗しました:', error);
      // エラー処理
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">プロフィール設定</h1>
          <p className="mt-2 text-gray-600">
            Ghoona Campでのあなたのプロフィールを設定しましょう
          </p>
        </div>

        {/* ステップインジケーター */}
        <StepIndicator currentStep={currentStep} />

        {/* フォームコンテンツ */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          {currentStep === 'basic' && (
            <BasicProfileForm
              formData={formData}
              onUpdate={updateFormData}
              onAvatarChange={handleAvatarChange}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 'detail' && (
            <DetailProfileForm
              formData={formData}
              onUpdate={updateFormData}
              onPrev={handlePrevStep}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 'confirm' && (
            <ConfirmationView
              formData={formData}
              onPrev={handlePrevStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* プログレスバー */}
        <div className="mt-8">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-pink-400 transition-all duration-300"
              style={{
                width: `${
                  currentStep === 'basic'
                    ? '33.33%'
                    : currentStep === 'detail'
                    ? '66.66%'
                    : '100%'
                }`,
              }}
            />
          </div>
          <div className="mt-2 text-right text-sm text-gray-600">
            {currentStep === 'basic'
              ? '1/3'
              : currentStep === 'detail'
              ? '2/3'
              : '3/3'}
          </div>
        </div>
      </div>
    </div>
  );
}
