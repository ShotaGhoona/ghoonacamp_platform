import { ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useAllMemberGoals } from '@/features/home/dashboard/hooks/useAllMemberGoals';

type PopUpProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showMemberGoals: boolean;
};

export const PopUp = ({ isOpen, onClose, children, showMemberGoals }: PopUpProps) => {
  const { goals: memberGoals, isLoading, error } = useAllMemberGoals();

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
        {/* メンバーの目標パネル */}
        <div
            className={`
            w-[30%] h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300
            ${showMemberGoals ? 'opacity-100 scale-100' : 'opacity-0 scale-95 w-0 hidden'}
            `}
        >
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">メンバーの目標</h3>
                <div className="space-y-4">
                    {isLoading ? (
                        <p className="text-gray-500">読み込み中...</p>
                    ) : error ? (
                        <p className="text-red-500">エラーが発生しました</p>
                    ) : memberGoals.length === 0 ? (
                        <p className="text-gray-500">公開されている目標はありません</p>
                    ) : (
                        memberGoals.map((goal) => (
                            <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-600">{goal.user.name}</p>
                                <p className="text-gray-800">{goal.content}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

        {/* ポップアップパネル */}
        <div
            className={`flex-1 h-[100%] bg-white rounded-lg shadow-xl transition-all duration-300`}
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
