'use client';

type EditGoalModalProps = {
  onClose: () => void;
};

export const EditGoalModal = ({ onClose }: EditGoalModalProps) => {
  return (
    <div className="flex flex-col justify-between h-[100%]">
      <div className="">
        {/* タイトル */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">今週の目標を設定</h2>
        <div className="w-full border border-gray-300 rounded-lg p-5 flex flex-col mb-5">
            <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
            <p className="
            flex-1 text-3xl font-bold text-center flex items-center justify-center
            text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
            ">AIの民主化によって世界を、生活を、1段階進化させる</p>
        </div>

        {/* フォーム */}
        <div className="space-y-4">
            {/* 目標1 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例：FastAPIを使って新機能を3つ実装する"
            />
            </div>

            {/* 目標2 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例：技術書を2冊読破する"
            />
            </div>

            {/* 目標3 */}
            <div>
            <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="例：朝5時に起床して朝活を継続する"
            />
            </div>

            {/* 公開設定 */}
            <div className="flex items-center gap-2 mt-4">
            <input
                type="checkbox"
                id="isPublic"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
                目標を他のメンバーに公開する
            </label>
            </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存する
        </button>
      </div>
    </div>
  );
}; 