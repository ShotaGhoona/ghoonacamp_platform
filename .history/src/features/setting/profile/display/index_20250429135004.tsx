'use client';

import { useState } from 'react';
import { StepIndicator } from '@/features/setting/profile/components/StepIndicator';
import { BasicProfileForm } from '@/features/setting/profile/display/BasicProfileForm';
import { DetailProfileForm } from '@/features/setting/profile/display/DetailProfileForm';
import { ConfirmationView } from '@/features/setting/profile/display/ConfirmationView';
import { ProfilePreview } from '@/features/setting/profile/components/ProfilePreview';
import { DetailProfilePreview } from '@/features/setting/profile/components/DetailProfilePreview';
import { useProfileForm } from '@/features/setting/profile/hooks/useProfileForm';

export const IndexPage = () => {
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
    <div className="flex">
      {/* 左側：フォーム */}
      <div className="w-1/2 p-8 overflow-y-auto bg-white rounded-lg h-full">
        
        {/* ステップインジケーター */}
        <StepIndicator currentStep={currentStep} />
        
        {/* フォームコンテンツ */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-8 h-full">
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

      {/* 右側：プレビュー */}
      <div className="w-1/2 bg-gray-100 p-8 overflow-y-auto border-l border-gray-200">
        <div className="sticky top-8 space-y-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">プレビュー</h2>
          
          {/* 基本プロフィールプレビュー */}
          <ProfilePreview formData={formData} />
          
          {/* 詳細プロフィールプレビュー */}
          <DetailProfilePreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
