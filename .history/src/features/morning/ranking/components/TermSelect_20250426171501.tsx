import { useState } from "react";

const options = ["All Members", "New Members"];

export default function DateSelect() {
    const [selected, setSelected] = useState(0);


    return (
        <div className="relative flex bg-white rounded-full">
            {/* アニメーション付きの選択背景 */}
            <div
                className="absolute top-0 left-0 h-[100%] rounded-full bg-white transition-all duration-300"
                style={{
                    width: `calc(100% / 2)`,
                    transform: `translateX(${selected * 100}%)`,
                    zIndex: 1,
                    padding:"5px",
                }}
            >
                <div className="w-[100%] h-[100%] rounded-full bg-gray-100"></div>
            </div>
            {options.map((label, idx) => (
                <button
                    key={label}
                    className={`flex-1 relative z-10 min-w-50 py-4 text-base rounded-full transition-colors duration-300 ${selected === idx ? 'text-black' : 'text-gray-300'}`}
                    onClick={() => setSelected(idx)}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}