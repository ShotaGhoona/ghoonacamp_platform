export default function IndexPage() {
  return (
    <div className="w-full h-full flex">
      <div className="w-[50%] h-full bg-white rounded-lg">
        <SettingSection />
      </div>
      <div className="w-[50%] h-full">
        <PreviewSection />
      </div>
    </div>
  );
}
