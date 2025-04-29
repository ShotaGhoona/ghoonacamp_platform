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
    <div className="flex h-full gap-10 overflow-hidden">
      {/* 左側：フォーム */}
      <div className="w-1/2 p-8 bg-white rounded-lg h-full flex flex-col z-10 shadow-lg">
        
        {/* ステップインジケーター */}
        <div className="border-b-5 border-[#f9f9f9]">
          <StepIndicator currentStep={currentStep} />
        </div>
        
        {/* フォームコンテンツ */}
        <div className="mt-8 flex-1">
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
      <div className="w-1/2 h-full flex flex-col z-0">
          <h1 className="text-5xl font-bold text-center text-gray-300 mt-10">Preview</h1>
          <div className="flex flex-col gap-5 h-full justify-center items-center">
            {/* 基本プロフィールプレビュー */}
            {currentStep === 'basic' && (
              <ProfilePreview formData={formData} />
            )}
            
            {/* 詳細プロフィールプレビュー */}
            <DetailProfilePreview formData={formData} />
          </div>
        </div>
    </div>
  );
}
