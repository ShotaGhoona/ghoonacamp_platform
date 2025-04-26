// コンポーネント
import CornerCta from "../components/cornerCta";
// ページ遷移
import Link from "next/link";


export default function Hero() {
  return (
    <div className="w-full h-full px-10 py-5 flex flex-col justify-between relative">
        
        <p className="text-4xl text-[#5D6B80] font-bold">Member</p>
        <p className="text-6xl text-[#5D6B80] font-bold">765人</p>
        <img src="/svg/jpmap.svg" alt="jpmap" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto max-w-[80%] h-auto max-h-[80%] " />
        <Link href="/dashboard" className="absolute -bottom-5 -right-5 flex flex-col gap-4">
            <CornerCta  color="5D6B80"  text="Friends"  subText="友達を招待" subText2="invite your" />
        </Link>
    </div>
  );
}