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
            <div className="w-[70%] h-full bg-white rounded-lg p-5 flex flex-col">
                <p className="text-sm text-gray-400">今週の目標</p>
                <div className="flex-1 flex flex-col justify-center gap-2">
                    <p>目標1</p>
                    <p>目標2</p>
                    <p>目標3</p>
                </div>
            </div>
            <div className="w-[30%] h-full gap-2 flex flex-col">
                <div className="flex-1 bg-gray-200 rounded-lg w-full flex items-center gap-2 ml-5">
                    <img src="/svg/edit.svg" alt="" className="w-5 h-5"/>
                    <p>今週の目標を設定</p>
                </div>
                <div className="flex-1 bg-gray-200 rounded-lg w-full"></div>
                <div className="flex-1 bg-gray-200 rounded-lg w-full"></div>
                <div className="flex-1 bg-gray-200 rounded-lg w-full"></div>
            </div>
        </div>
        <div className="w-full h-[20%] bg-white rounded-lg p-5">
            <p>メモ</p>
        </div>
    </div>
  );
};
