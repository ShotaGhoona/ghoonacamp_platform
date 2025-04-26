import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type SidePeakProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const SidePeak = ({ isOpen, onClose, children }: SidePeakProps) => {
  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* サイドパネル */}
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-gray-100 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* ヘッダー */}
          <div className="flex justify-end p-4 border-b border-gray-100">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1 p-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}; 