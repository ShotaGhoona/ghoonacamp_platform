export default function PersonalInfo() {
    return (
        <div className="flex gap-10 w-full h-full">
            <div className="h-[100%] aspect-square flex justify-center items-center bg-white rounded-lg">
                <img src="/svg/tier/2.svg" alt="tier1" className="w-[80%] h-[80%]"/>
            </div>
            <div className="flex-1 bg-white rounded-lg p-5">
                <p className="text-sm text-gray-400">今週の目標</p>
            </div>
            <div className="flex-1 bg-white rounded-lg p-5">
                <p className="text-sm text-gray-400">今週の目標</p>
            </div>
        </div>
    )
}