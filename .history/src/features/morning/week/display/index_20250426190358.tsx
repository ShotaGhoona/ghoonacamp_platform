import PersonalInfo from "./PersonalInfo";
import WeekStatus from "./WeekStatus";
import EventGallery from "./EventGallery";

export default function Week() {
    return (
        <div className="flex flex-col gap-10 w-full h-full">
            <div className="h-[20%] w-full rounded-lg">
                <PersonalInfo />
            </div>
            <div className="h-[15%] w-full rounded-lg">
                <WeekStatus />
            </div>
            <div className="flex-1 w-full rounded-lg">
                <EventGallery />
            </div>
        </div>
    )
}