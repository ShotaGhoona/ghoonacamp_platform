'use client';

import { useSystemNoticeList } from '../hooks/useSystemNoticeList';

export default function LeftNotice() {
  const { notices, isLoading, error } = useSystemNoticeList();

  if (isLoading) {
    return (
      <div className="w-full h-full p-10">
        <p>読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full p-10">
        <p className="text-red-500">エラーが発生しました</p>
      </div>
    );
  }

  return (
    <div className="w-full h- p-10 overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">運営からのお知らせ</h2>
      <div className="space-y-4">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              {notice.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: tag.color + '20', color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">{notice.title}</h3>
            <p className="text-gray-600 line-clamp-2">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}