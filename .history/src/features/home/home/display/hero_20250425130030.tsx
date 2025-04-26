// コンポーネント
import CornerCta from "../components/cornerCta";
// ページ遷移
import Link from "next/link";


export default function Hero() {
  return (
    <div className="w-full h-full p-10 flex justify-between relative">
      <div className="flex-1 text-white mt-10">
        <div className="flex flex-col">
            <p className="text-xs font-bold">朝から今日から人生を豊かに</p>
            <p className="text-9xl font-bold">4/23</p>
        </div>
        <div className="mt-20 flex gap-4">
          <div>
            <p className="text-sm">Your count</p>
            <p className="text-4xl font-bold">136</p>
          </div>
          <div>
            <p className="text-sm">Population</p>
            <p className="text-4xl font-bold">754</p>
          </div>
        </div>
      </div>
      <Link href="/dashboard" className="absolute -bottom-5 -right-5 flex flex-col gap-4">
        <CornerCta  color="D68897"  text="Dashboard"  subText="ダッシュボードへ" subText2="visit your" />
      </Link>
    </div>
  );
}