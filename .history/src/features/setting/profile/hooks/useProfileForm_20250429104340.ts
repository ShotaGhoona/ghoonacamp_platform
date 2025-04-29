'use client';

import { useState } from 'react';
import { ProfileFormData, Step } from '../types/profile';

export const useProfileForm = () => {
  const [currentStep, setCurrentStep] = useState<Step>('basic');
  const [formData, setFormData] = useState<ProfileFormData>({
    username: '',
    bio: '',
  });

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

  return {
    currentStep,
    formData,
    updateFormData,
    handleNextStep,
    handlePrevStep,
    handleAvatarChange,
  };
}; 