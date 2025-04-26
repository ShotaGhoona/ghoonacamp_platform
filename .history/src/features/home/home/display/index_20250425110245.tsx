
// コンポーネント
import Hero from "./hero";

export default function IndexPage() {
  return (
    <div className="flex gap-10 h-full">
      <div className="flex-1 flex flex-col gap-10 h-full rounded-lg">
        <div className="flex flex-col bg-gradient-to-br from-[#ABBDD8] to-[#DFBEC4] h-[60%] rounded-lg">

        </div>
        <div className="w-full h-[40%] bg-white rounded-lg">
          <Hero />
        </div>
      </div>
      <div className="w-[400px] h-full bg-white rounded-lg">

      </div>
    </div>
  );
}