'use client';

import { ProfileFormData } from '../types/profile';

interface DetailProfilePreviewProps {
  formData: ProfileFormData;
}

export const DetailProfilePreview = ({ formData }: DetailProfilePreviewProps) => {
  return (
    <>
    <div className="flex flex-col w-full bg-white rounded-lg p-5 gap-4">
      <div className="flex gap-4">
        <img src={formData.avatarUrl} alt={formData.username} className="w-[200px] h-[200px] rounded-lg" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-400">One-Line Profile</p>
            <p className="text-gray-700">{formData.oneLine}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-base font-bold text-gray-400">Background</p>
            <p className="text-gray-700">{formData.background}</p>
          </div>
          
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-2 w-1/2 border-gray-100 border-2 rounded-lg p-4">
          <p className="text-base font-bold text-gray-400">What I'm Into</p>
          <div className="flex flex-wrap gap-2">
            {formData.interests?.map((interest) => (
              <span key={interest} className="text-base text-gray-400">#{interest}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2"></div>
      </div>
    </div>



















    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* One-Line Profile */}
      {formData.oneLine && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">One-Line Profile</h3>
          <p className="text-lg font-medium text-gray-800 italic">
            "{formData.oneLine}"
          </p>
        </div>
      )}

      {/* Background */}
      {formData.background && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">Background</h3>
          <p className="text-gray-700 leading-relaxed">
            {formData.background}
          </p>
        </div>
      )}

      {/* What I'm Into */}
      {formData.interests && formData.interests.length > 0 && (
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">What I'm Into</h3>
          <div className="flex flex-wrap gap-2">
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
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Core Skill Set</h3>
          <div className="flex flex-wrap gap-2">
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

      {/* SNS Links */}
      <div className="p-6 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Connect With Me</h3>
        <div className="flex flex-wrap gap-4">
          {formData.instagramUrl && (
            <a
              href={formData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-pink-500 hover:text-pink-600"
            >
              <span className="text-sm">Instagram</span>
            </a>
          )}
          {formData.websiteUrl && (
            <a
              href={formData.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-600 hover:text-gray-800"
            >
              <span className="text-sm">Website</span>
            </a>
          )}
          {formData.xUrl && (
            <a
              href={formData.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-800 hover:text-gray-900"
            >
              <span className="text-sm">X</span>
            </a>
          )}
          {formData.linkedinUrl && (
            <a
              href={formData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <span className="text-sm">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  );
}; 