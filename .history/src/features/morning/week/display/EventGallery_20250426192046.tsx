
export default function EventGallery() {
    return (
        <div className="flex flex-col gap-5 w-full h-full bg-white rounded-lg p-5">
            <div className="flex justify-between items-center">
                <p className="text-base font-bold">今週のイベント一覧</p>
                <button className="w-[200px] flex justify-center items-center bg-[#5F7392] rounded-full p-2">
                    <p className="text-white">+ Add new event</p>
                </button>
            </div>
            <div className="grid grid-cols-4 gap-5">
                <div className="h-[200px] bg-gray-100 rounded-lg p-5">
                    <div className="flex justify-between">
                        <p className="text-base font-bold">2/14</p>
                        <p className="text-base font-bold">chat-room-3</p>
                    </div>
                    <h2>Notionを学ぼう</h2>
                </div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                <div className="h-[200px] bg-gray-100 rounded-lg"></div>
                
            </div>
        </div>
    )
}