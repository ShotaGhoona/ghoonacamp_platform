'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { ProfileFormData, Step } from '../types/profile';
import { profileService } from '../services/profileService';

export const useProfileForm = () => {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFormData = (data: Partial<ProfileFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNextStep = () => {
    if (currentStep === 'basic') setCurrentStep('detail');
    else if (currentStep === 'detail') setCurrentStep('confirm');
  };

  const handlePrevStep = () => {
    if (currentStep === 'detail') setCurrentStep('basic');
    else if (currentStep === 'confirm') setCurrentStep('detail');
  };

  const handleAvatarChange = (file: File) => {
    const url = URL.createObjectURL(file);
    updateFormData({ avatar: file, avatarUrl: url });
  };

  const saveProfile = async () => {
    if (!userId) {
      setError('ユーザーIDが見つかりません');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await profileService.updateProfile(userId, formData);
      // 成功時の処理（例：リダイレクト）
    } catch (err) {
      setError('プロフィールの保存に失敗しました');
      console.error('保存エラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProfile = async () => {
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const profile = await profileService.getProfile(userId);
      if (profile) {
        setFormData({
          username: profile.username,
          bio: profile.bio,
          oneLine: profile.oneLine || undefined,
          background: profile.background || undefined,
          interests: profile.interests,
          coreSkills: profile.coreSkills,
          websiteUrl: profile.websiteUrl || undefined,
          xUrl: profile.xUrl || undefined,
          instagramUrl: profile.instagramUrl || undefined,
          linkedinUrl: profile.linkedinUrl || undefined,
        });
      }
    } catch (err) {
      setError('プロフィールの読み込みに失敗しました');
      console.error('読み込みエラー:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}; 