const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export default function WeekStatus() {
    return (
        <div className="flex gap-5 w-full h-full">
            {days.map((d, i) => (
                <div key={i} className="flex-1 h-full bg-white rounded-lg p-5 flex justify-center items-center">
                    <p className="text-6xl font-bold opacity-20">{d}</p>
                </div>
            ))}
        </div>
    )
}