'use client';

import { useUserTier } from '../hooks/useUserTier';

export const TierCard = () => {
  const { tier, isLoading, error } = useUserTier();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-red-500">エラーが発生しました</div>
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-2xl">
        <div className="text-gray-500">Tierが設定されていません</div>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center relative rounded-2xl overflow-hidden bg-[${tier.badgeColor}]`}>
      <img
        src={`${tier.cardImageUrl}.svg`}
        alt={tier.titleEn}
        className="w-[80%] h-[80%] object-contain"
      />
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
        <div className="text-xl font-bold">{tier.titleJa}</div>
        <div className="text-2xl font-bold">{tier.titleEn}</div>
      </div>
    </div>
  );
};
