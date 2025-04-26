export const ProfileSection = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
        <div className="w-full h-[20%] bg-white rounded-lg p-2">
            <p>将来の夢・ビジョン</p>
        </div>
        <div className="w-full flex-1 gap-5 flex">
            <div className="w-[70%] h-full bg-white rounded-lg p-2">
                <p>今週の目標</p>
            </div>
            <div className="w-[30%] h-full gap-2 flex flex-col">
                <div className="flex-1 bg-gray-200 w-full"></div>
                <div className="flex-1 bg-gray-200 w-full"></div>
                <div className="flex-1 bg-gray-200 w-full"></div>
                <div className="flex-1 bg-gray-200 w-full"></div>
            </div>
        </div>
        <div className="w-full h-[20%] bg-white rounded-lg p-2">
            <p>メモ</p>
        </div>
    </div>
  );
};
