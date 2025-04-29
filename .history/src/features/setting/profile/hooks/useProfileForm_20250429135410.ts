'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProfileFormData } from '../types/profile';

export const useProfileForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'basic' | 'detail' | 'confirm'>('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
    avatarUrl: '',
    oneLine: '',
    background: '',
    interests: [],
    coreSkills: [],
    websiteUrl: '',
    xUrl: '',
    instagramUrl: '',
    linkedinUrl: '',
  });

  // プロフィールデータの取得
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setFormData(prevData => ({
              ...prevData,
              ...data,
            }));
          }
        }
      } catch (error) {
        console.error('プロフィール取得エラー:', error);
      }
    };

    fetchProfile();
  }, []);

  const updateFormData = (newData: Partial<ProfileFormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleAvatarChange = (url: string) => {
    setFormData(prev => ({ ...prev, avatarUrl: url }));
  };

  const handleNextStep = () => {
    if (currentStep === 'basic') setCurrentStep('detail');
    else if (currentStep === 'detail') setCurrentStep('confirm');
  };

  const handlePrevStep = () => {
    if (currentStep === 'detail') setCurrentStep('basic');
    else if (currentStep === 'confirm') setCurrentStep('detail');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('プロフィールの更新に失敗しました');
      }

      // 成功時の処理
      router.push('/dashboard');
    } catch (error) {
      console.error('プロフィール更新エラー:', error);
      // エラー処理（必要に応じてエラーメッセージを表示）
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    isSubmitting,
    updateFormData,
    handleNextStep,
    handlePrevStep,
    handleAvatarChange,
    handleSubmit,
  };
}; 