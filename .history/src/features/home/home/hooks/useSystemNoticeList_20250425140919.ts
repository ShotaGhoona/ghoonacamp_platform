import { useEffect, useState } from 'react';

export type SystemNotice = {
  id: number;
  title: string;
  content: string;
  imageUrl: string | null;
  isPublic: boolean;
  publishStartAt: Date;
  publishEndAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  tags: {
    tag: {
      id: number;
      name: string;
      color: string;
    }
  }[];
};

export const useSystemNoticeList = () => {
  const [notices, setNotices] = useState<SystemNotice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/system-notices');
        if (!response.ok) {
          throw new Error('通知の取得に失敗しました');
        }
        const data = await response.json();
        setNotices(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return { notices, isLoading, error };
}; 