export default function Week() {
    return (
        <div className="flex flex-col gap-10 w-full h-full">
            <div className="h-[20%] w-full bg-gray-100 rounded-lg">
                <PersonalInfo />
            </div>
            <div className="h-[10%] w-full bg-gray-100 rounded-lg">
                <WeekStatus />
            </div>
            <div className="flex-1 w-full bg-gray-100 rounded-lg">
                <EventGallery />
            </div>
        </div>
    )
}