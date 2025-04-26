// コンポーネント
import CornerCta from "../components/cornerCta";
// ページ遷移
import Link from "next/link";


export default function Hero() {
  return (
    <div className="w-full h-full p-10 flex flex-col justify-between relative">
        <div className="flex-1 text-white mt-10">
                <p className="text-xs font-bold">朝から今日から人生を豊かに</p>
                <p className="text-9xl font-bold">4/23</p>
        </div>
        <div className="flex gap-4">
            <div className="flex flex-col bg-[#ffffff55] rounded-[10px] p-2 text-white items-center">
                <p className="text-xs">Your count</p>
                <p className="text-3xl font-bold">136</p>
            </div>
            <div className="flex flex-col bg-[#ffffff55] rounded-[10px] p-2 text-white items-center">
                <p className="text-xs">Population</p>
                <p className="text-3xl font-bold">754</p>
            </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="/svg/hero.svg" alt="tier1" className="" />
        </div>
        <Link href="/dashboard" className="absolute -bottom-5 -right-5 flex flex-col gap-4">
            <CornerCta  color="D68897"  text="Dashboard"  subText="ダッシュボードへ" subText2="visit your" />
        </Link>
    </div>
  );
}