type NoticeDetailProps = {
  notice: {
    id: string;
    title: string;
    content: string;
    tags: Array<{
      tag: {
        id: string;
        name: string;
        color: string;
      };
    }>;
  };
};

export const NoticeDetail = ({ notice }: NoticeDetailProps) => {
  return (
    <div className="space-y-6 bg-white">
      {/* タグ */}
      <div className="flex items-center gap-2">
        {notice.tags.map(({ tag }) => (
          <span
            key={tag.id}
            className="text-xs px-2 py-1 rounded"
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* タイトル */}
      <h2 className="text-xl font-bold text-gray-800">{notice.title}</h2>

      {/* 本文 */}
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-600 whitespace-pre-wrap">{notice.content}</p>
      </div>
    </div>
  );
}; 