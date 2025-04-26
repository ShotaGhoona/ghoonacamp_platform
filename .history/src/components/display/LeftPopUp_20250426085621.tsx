import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type LeftPopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const LeftPopUp = ({ isOpen, onClose, children }: LeftPopUpProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/30"
        onClick={onClose}
      />

      {/* 左側ポップアップパネル */}
      <div
        className="fixed top-0 left-0 h-full w-[30%] bg-white shadow-xl"
      >
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="flex justify-end p-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* コンテンツエリア */}
          <div className="flex-1 px-6 pb-6 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}; 