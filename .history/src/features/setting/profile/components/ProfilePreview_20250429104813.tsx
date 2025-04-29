'use client';

import { ProfileFormData } from '../types/profile';

interface ProfilePreviewProps {
  formData: ProfileFormData;
}

export const ProfilePreview = ({ formData }: ProfilePreviewProps) => {
  return (
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

        {formData.occupation && (
          <div className="text-center mb-4">
            <p className="text-gray-600">{formData.occupation}</p>
          </div>
        )}

        {/* スキル */}
        {formData.skills && formData.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap justify-center gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SNSリンク */}
        <div className="flex justify-center space-x-4 mt-4">
          {formData.githubUrl && (
            <a
              href={formData.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500"
            >
              GitHub
            </a>
          )}
          {formData.twitterUrl && (
            <a
              href={formData.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500"
            >
              Twitter
            </a>
          )}
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
        </div>

        {/* 自己紹介 */}
        {formData.selfIntroduction && (
          <div className="mt-6 text-gray-600">
            <p className="whitespace-pre-wrap text-sm">
              {formData.selfIntroduction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}; 