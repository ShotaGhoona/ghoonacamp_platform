import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type PopUpProps = {
  isOpen: boolean;
  mode: 'edit' | 'view';
  onClose: () => void;
  children: ReactNode;
  children2: ReactNode;
};

export const PopUp = ({ isOpen, mode, onClose, children, children2 }: PopUpProps) => {
  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className={`flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      w-[60%] h-[70%] rounded-lg shadow-xl transition-all duration-300 gap-10 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`}
      >
        {/* メンバーの目標を覗くパネル */}
        {mode === 'edit' && (
          <div className="w-[30%] h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300">
            <div className="flex flex-col h-[100%]">
              {/* ヘッダー */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-lg font-bold text-gray-800">メンバーの目標</h3>
              </div>

              {/* コンテンツエリア */}
              <div className="flex-1 overflow-y-auto">
                {children2}
              </div>
            </div>
          </div>
        )}

        {/* メインパネル */}
        <div className={`${mode === 'edit' ? 'flex-1' : 'w-[70%]'} h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300`}>
          <div className="flex flex-col h-[100%]">
            {/* ヘッダー */}
            <div className="flex justify-end p-4 border-b">
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* コンテンツエリア */}
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
