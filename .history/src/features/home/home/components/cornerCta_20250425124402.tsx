export default function CornerCta({ color }: { color: string }) {
  return (
    <div className={`w-50 h-10 bg-[${color}] flex items-center justify-center`}>
      <h1>CornerCta</h1>
    </div>
  );
}