// コンポーネント
import CornerCta from "../components/cornerCta";
// ページ遷移
import Link from "next/link";


export default function Hero() {
  return (
    <div className="w-full h-full p-10 flex flex-col justify-between relative">
        <div className="flex-1 text-white mt-10">
            <p className="text-xs font-bold">朝から今日から人生を豊かに</p>
        </div>
        <div>
          <p>765人</p>
        </div>
        <img src="/svg/jpmap.svg" alt="jpmap" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto h-[80%] " />
        <Link href="/dashboard" className="absolute -bottom-5 -right-5 flex flex-col gap-4">
            <CornerCta  color="D68897"  text="Dashboard"  subText="ダッシュボードへ" subText2="visit your" />
        </Link>
    </div>
  );
}