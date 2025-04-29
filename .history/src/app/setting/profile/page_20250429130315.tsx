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
    <div className="min-h-screen flex bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
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
      </div>
      <div className="w-1/2">
        {/* プレビューがリアルタイムで見れるようにしたい */}
      </div>
    </div>
  );
}
