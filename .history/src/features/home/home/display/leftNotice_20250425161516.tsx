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

  /* ─────────  ここから描画  ───────── */
  return (
    <div className="w-full h-full p-5 flex flex-col">
      {/* 見出し（固定） */}
      <h2 className="text-base font-bold text-gray-700 mb-6 flex-shrink-0">
        運営からのお知らせ
      </h2>

      {/* リスト（スクロールエリア） */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="bg-white rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            {/* タグ */}
            <div className="flex items-center gap-2 mb-2">
              {notice.tags.map(({ tag }) => (
                <span
                  key={tag.id}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: `${tag.color}20`, // 透明度 12.5%  (#RRGGBB20)
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* 本文 */}
            <h3 className="text-sm font-bold text-gray-800 mb-2">
              {notice.title}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-2">{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
