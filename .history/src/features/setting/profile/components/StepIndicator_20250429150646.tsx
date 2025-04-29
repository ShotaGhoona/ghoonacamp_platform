'use client';

import { cn } from '@/lib/utils';
import { Step, PROFILE_STEPS } from '../types/profile';

interface StepIndicatorProps {
  currentStep: Step;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center mb-12">
      {PROFILE_STEPS.map((step, index) => (
        <div key={step.id} className="flex items-center">
          {/* ステップサークル */}
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold relative',
              currentStep === step.id
                ? 'bg-[#374559] text-white'
                : 'bg-slate-600 text-white'
            )}
          >
            {step.number}
            {/* ステップタイトル */}
            <div className="text-center absolute -bottom-8 w-32">
              <span className="text-sm font-medium text-gray-700">{step.title}</span>
            </div>
          </div>

          {/* 接続線 */}
          {index < PROFILE_STEPS.length - 1 && (
            <div
              className={cn(
                'h-[2px] w-32 mx-4',
                currentStep === PROFILE_STEPS[index + 1].id || currentStep === step.id
                  ? 'bg-[#D68897]'
                  : 'bg-slate-600'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}; 