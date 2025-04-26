export default function CornerCta(
    { color, text, subText }: { color: string; text: string; subText: string }
) {
  return (
    <div 
      style={{ backgroundColor: `#${color}` }} 
      className="px-8 py-4 rounded-tl-800px] text-white flex items-end gap-4 cursor-pointer hover:opacity-90 transition-opacity"
    >
        <div>
            <span className="text-sm">visit your</span>
        </div>
        <div className="flex flex-col">
            <span className="text-sm">{subText}</span>
            <span className="text-4xl font-bold">{text}</span>
        </div>
    </div>
  );
}