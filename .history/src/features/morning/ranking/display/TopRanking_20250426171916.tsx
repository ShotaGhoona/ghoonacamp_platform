import { useEffect, useState } from "react";
import axios from "axios";

// ランキングデータ型
interface UserRanking {
  firstName: string;
  lastName: string;
  count: number;
}

export default function TopRanking() {
  const [ranking, setRanking] = useState<UserRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      const res = await axios.get("/api/morning/ranking/top");
      setRanking(res.data);
      setLoading(false);
    };
    fetchRanking();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ランキング</h1>
      {loading ? (
        <div>読み込み中...</div>
      ) : (
        <ol className="space-y-2">
          {ranking.map((user, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <span className="text-lg font-bold w-6 text-right">{idx + 1}</span>
              <span className="text-base">{user.firstName} {user.lastName}</span>
              <span className="ml-auto text-gray-400 text-sm">{user.count}回</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}