import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const PopUp = ({ isOpen, onClose, children }: PopUpProps) => {
  return (
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div className="flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
      w-[80%] h-[70%] rounded-lg shadow-xl transition-all duration-300 gap-10">
        {/* メンバーの目表を除くを押した時だけ表示 */}
        <div
            className={`
            w-[30%] h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300
            }`}
        >
            <div>
                <p>メンバーの目標</p>
            </div>
        </div>

        {/* ポップアップパネル */}
        <div
            className={`flex-1 h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300
                ${
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex flex-col h-[100%]">
            {/* ヘッダー */}
            <div className="flex justify-end p-4">
                <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                <XMarkIcon className="h-5 w-5" />
                </button>
            </div>

            {/* コンテンツエリア */}
            <div className="flex-1 px-6 pb-6">
                {children}
            </div>
            </div>
        </div>
      </div>
    </>
  );
};
