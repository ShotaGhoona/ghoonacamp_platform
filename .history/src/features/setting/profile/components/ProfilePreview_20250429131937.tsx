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
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">
            {formData.username || 'ユーザー名未設定'}
          </h3>
          <p className="text-gray-600 mt-1">{formData.bio || 'ひとこと未設定'}</p>
        </div>

        {/* One-Line Profile */}
        {formData.oneLine && (
          <div className="text-center mb-6">
            <p className="text-lg font-medium text-gray-800 italic">
              "{formData.oneLine}"
            </p>
          </div>
        )}

        {/* Background */}
        {formData.background && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Background</h4>
            <p className="text-gray-600">{formData.background}</p>
          </div>
        )}

        {/* What I'm Into */}
        {formData.interests && formData.interests.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">What I'm Into</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {formData.interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Core Skills */}
        {formData.coreSkills && formData.coreSkills.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Core Skill Set</h4>
            <div className="flex flex-wrap justify-center gap-2">
              {formData.coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* SNSリンク */}
        <div className="flex justify-center space-x-4 mt-6">
          {formData.instagramUrl && (
            <a
              href={formData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-600"
            >
              Instagram
            </a>
          )}
          {formData.websiteUrl && (
            <a
              href={formData.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              Website
            </a>
          )}
          {formData.xUrl && (
            <a
              href={formData.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900"
            >
              X
            </a>
          )}
          {formData.linkedinUrl && (
            <a
              href={formData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </div>
  );
}; 