import { useEffect, useState } from "react";
import axios from "axios";

// ランキングデータ型
export interface UserRanking {
  firstName: string;
  lastName: string;
  count: number;
}

export function useTopRanking() {
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

  return { ranking, loading };
} 