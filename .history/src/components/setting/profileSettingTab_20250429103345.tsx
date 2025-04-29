"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';

type Step = 'basic' | 'detail' | 'confirm';

export const ProfileSettingTab = () => {
  const [currentStep, setCurrentStep] = useState<Step>('basic');

  const steps = [
    { id: 'basic', number: 1, title: '基本プロフィール' },
    { id: 'detail', number: 2, title: '詳細プロフィール' },
    { id: 'confirm', number: 3, title: '最終確認' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* ステップインジケーター */}
      <div className="flex items-center justify-center mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            {/* ステップサークル */}
            <div
              className={cn(
                'w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold',
                currentStep === step.id
                  ? 'bg-pink-400 text-white'
                  : 'bg-slate-600 text-white'
              )}
            >
              {step.number}
            </div>
            
            {/* ステップタイトル */}
            <div className="text-center mt-2 absolute -bottom-8 w-32">
              <span className="text-sm font-medium">{step.title}</span>
            </div>

            {/* 接続線 */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'h-[2px] w-32 mx-4',
                  currentStep === steps[index + 1].id || currentStep === step.id
                    ? 'bg-pink-400'
                    : 'bg-slate-600'
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* コンテンツエリア */}
      <div className="mt-12">
        {currentStep === 'basic' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">基本プロフィール</h2>
            {/* ここに基本プロフィールのフォームを実装 */}
            <button
              onClick={() => setCurrentStep('detail')}
              className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500"
            >
              次へ
            </button>
          </div>
        )}

        {currentStep === 'detail' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">詳細プロフィール</h2>
            {/* ここに詳細プロフィールのフォームを実装 */}
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('basic')}
                className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700"
              >
                戻る
              </button>
              <button
                onClick={() => setCurrentStep('confirm')}
                className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500"
              >
                次へ
              </button>
            </div>
          </div>
        )}

        {currentStep === 'confirm' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">最終確認</h2>
            {/* ここに確認画面を実装 */}
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentStep('detail')}
                className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700"
              >
                戻る
              </button>
              <button
                className="bg-pink-400 text-white px-6 py-2 rounded-md hover:bg-pink-500"
              >
                保存
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
