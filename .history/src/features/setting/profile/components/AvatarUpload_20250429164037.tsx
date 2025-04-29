'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface AvatarUploadProps {
  onFileSelect: (file: File) => void;
  previewUrl?: string;
}

export const AvatarUpload = ({ onFileSelect, previewUrl }: AvatarUploadProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-400 transition-colors"
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <div className="flex items-center justify-center">

            <div className="relative w-32 h-32 mx-auto">
              <img
                src={previewUrl}
                alt="アバタープレビュー"
                className="w-full h-full object-cover rounded-full"
                />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <p className="text-white text-sm">クリックして変更</p>
              </div>
            </div>
            <p>＞＞＞</p>
            <img src="生成後の画像を表示" alt="" className="w-10 h-10" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl text-gray-400">☁️</div>
            <p className="text-gray-600">
              {isDragActive
                ? 'ファイルをドロップしてください'
                : 'アップロードするファイルをドラッグ＆ドロップ'}
            </p>
            <button className="text-sm text-pink-400 hover:text-pink-500">
              またはクリックしてファイルを選択
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 