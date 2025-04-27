

// ランキングデータ型
interface UserRanking {
  firstName: string;
  lastName: string;
  count: number;
}

export default function TopRanking() {

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ランキング</h1>

    </div>
  );
}