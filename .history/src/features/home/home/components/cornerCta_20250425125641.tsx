export default function CornerCta(
    { color, text, subText }: { color: string; text: string; subText: string }
) {
  return (
    <div 
      style={{ backgroundColor: `#${color}` }} 
      className="px-8 py-4 rounded-full text-white flex items-end cursor-pointer hover:opacity-90 transition-opacity"
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