
export default function EventGallery() {
    return (
        <div className="flex flex-col gap-5 w-full h-full bg-white rounded-lg p-5">
            <div className="flex justify-between items-center">
                <p className="text-base font-bold">今週のイベント一覧</p>
                <button className="text-sm text-gray-400">
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}