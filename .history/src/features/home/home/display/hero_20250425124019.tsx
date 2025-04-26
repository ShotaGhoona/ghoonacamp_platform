// コンポーネント
import CornerCta from "../components/cornerCta";

export default function Hero() {
  return (
    <div className="w-full h-full p-10 flex justify-between">
        <div className="flex-1 text-white mt-10">
            <p className="text-xs font-bold">朝から今日から人生を豊かに</p>
            <p className="text-9xl font-bold">2/23</p>
        </div>
        <div className=""></div>
        <div className="absolute bottom-0 right-0">
            <CornerCta />
        </div>
    </div>
  );
}