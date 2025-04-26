export default function CornerCta(
    { color }: { color: string }
) {
  return (
    <div style={{ backgroundColor: `#${color}` }} className="w-50 h-10 flex items-center justify-center">
      <h1>CornerCta</h1>
    </div>
  );
}