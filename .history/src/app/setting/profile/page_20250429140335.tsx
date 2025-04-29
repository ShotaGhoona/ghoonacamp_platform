'use client';

import { useEffect } from 'react';
import { StepIndicator } from '@/features/setting/profile/components/StepIndicator';
import { BasicProfileForm } from '@/features/setting/profile/display/BasicProfileForm';
import { DetailProfileForm } from '@/features/setting/profile/display/DetailProfileForm';
import { ConfirmationView } from '@/features/setting/profile/display/ConfirmationView';
import { ProfilePreview } from '@/features/setting/profile/components/ProfilePreview';
import { DetailProfilePreview } from '@/features/setting/profile/components/DetailProfilePreview';
import { useProfileForm } from '@/features/setting/profile/hooks/useProfileForm';

export default function ProfileSettingPage() {
  const {
    currentStep,
    formData,
    isLoading,
    error,
    updateFormData,
    handleNextStep,
    handlePrevStep,
    handleAvatarChange,
    saveProfile,
    loadProfile,
  } = useProfileForm();

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* 左側：フォーム */}
      <div className="w-1/2 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">プロフィール設定</h1>
        
        {/* ステップインジケーター */}
        <StepIndicator currentStep={currentStep} />
        
        {/* フォームコンテンツ */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mt-8">
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500" />
            </div>
          )}

          {!isLoading && (
            <>
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
                  isLoading={isLoading}
                  error={error}
                  onPrev={handlePrevStep}
                  onSubmit={saveProfile}
                />
              )}
            </>
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