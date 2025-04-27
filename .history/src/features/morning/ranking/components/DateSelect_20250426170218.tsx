import { useState } from "react";

const options = ["this weekend", "this month", "all season"];

export default function DateSelect() {
    const [selected, setSelected] = useState(0);

    return (
        <div className="relative flex bg-white rounded-full">
            {/* アニメーション付きの選択背景 */}
            <div
                className="absolute top-0 left-0 h-full rounded-full bg-gray-100 transition-all duration-300"
                style={{
                    width: `calc(100% / 3)`,
                    transform: `translateX(${selected * 100}%)`,
                    zIndex: 1,
                }}
            />
            {options.map((label, idx) => (
                <button
                    key={label}
                    className={`flex-1 relative z-10 text-base rounded-full transition-colors duration-300 ${selected === idx ? 'text-black' : 'text-gray-300'}`}
                    onClick={() => setSelected(idx)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}