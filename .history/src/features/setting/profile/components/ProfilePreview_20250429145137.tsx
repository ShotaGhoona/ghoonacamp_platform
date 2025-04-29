'use client';

import { ProfileFormData } from '../types/profile';
import { ProfileCard } from '@/components/common/profileCard';
interface ProfilePreviewProps {
  formData: ProfileFormData;
}

export const ProfilePreview = ({ formData }: ProfilePreviewProps) => {
  return (
    <>
    <div className="flex justify-center  w-full gap-4 relative">
      <div className="w-[300px] top-0 left-0">
        <ProfileCard />
      </div>
      <div className="w-[300px] absolute top-0 -left-[50px]">
        <ProfileCard />
      </div>
      <div className="w-[300px] absolute top-0 -right-[50px]">
        <ProfileCard />
      </div>
      <div className="w-[300px] h-full absolute top-0 -left-[50px] bg-red z-10"></div>
      <div className="w-[300px] h-full absolute top-0 -right-[50px] bg-linear-gradient-to-r from-white to-transparent z-10"></div>
    </div>






    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ヘッダー部分 */}
      <div className="relative h-32 bg-gradient-to-r from-pink-400 to-pink-600">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt={formData.username}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-4xl text-gray-400">👤</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="pt-20 px-6 pb-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {formData.username || 'ユーザー名未設定'}
          </h3>
          <p className="text-gray-600 mt-1">{formData.bio || 'ひとこと未設定'}</p>
        </div>

        {/* SNSリンク */}
        {/* <div className="flex justify-center space-x-4 mt-4">
          {formData.websiteUrl && (
            <a
              href={formData.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500"
            >
              Website
            </a>
          )}
        </div> */}
      </div>
    </div>
    </>
  );
}; 