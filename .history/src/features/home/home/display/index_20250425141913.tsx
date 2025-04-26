// コンポーネント
import Hero from "./hero";
import LeftNotice from "./leftNotice";

export default function IndexPage() {
  return (
    <div className="min-h-screen flex">
      {/* 左側: お知らせ */}
      <div className="w-[400px] h-screen bg-gray-50 border-r border-gray-200">
        <LeftNotice />
      </div>
      
      {/* 右側: メインコンテンツ */}
      <div className="flex-1 h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Hero />
      </div>
    </div>
  );
}