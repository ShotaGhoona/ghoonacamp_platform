export const ProfileSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="w-full h-[20%] bg-white rounded-lg p-5 flex flex-col">
            <p className="text-sm text-gray-400">将来の夢・ビジョン</p>
            <p className="
            flex-1 text-3xl font-bold text-center flex items-center justify-center
            text-transparent bg-clip-text bg-gradient-to-r from-[#5F7392] to-[#BF6375]
            ">AIの民主化によって世界を、生活を、1段階進化させる</p>
        </div>
        <div className="w-full flex-1 gap-5 flex">
            <div className="w-[70%] h-full bg-white rounded-lg p-5">
                <p>今週の目標</p>
            </div>
            <div className="w-[30%] h-full gap-2 flex flex-col">
                <div className="flex-1 bg-gray-300 rounded-lg w-full"></div>
                <div className="flex-1 bg-gray-300 rounded-lg w-full"></div>
                <div className="flex-1 bg-gray-300 rounded-lg w-full"></div>
                <div className="flex-1 bg-gray-300 rounded-lg w-full"></div>
            </div>
        </div>
        <div className="w-full h-[20%] bg-white rounded-lg p-5">
            <p>メモ</p>
        </div>
    </div>
  );
};
