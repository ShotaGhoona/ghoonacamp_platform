export default function CornerCta(
    { color, text, subText }: { color: string; text: string; subText: string }
) {
  return (
    <div 
      style={{ backgroundColor: `#${color}` }} 
      className="px-8 py-4 rounded-full text-white flex flex-col items-start cursor-pointer hover:opacity-90 transition-opacity"
    >
      <span className="text-sm">{subText}</span>
      <span className="text-2xl font-bold">{text}</span>
    </div>
  );
}