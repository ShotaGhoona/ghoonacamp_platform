type EventDetailProps = {
  event: {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    tags: Array<{
      tag: {
        id: string;
        name: string;
        color: string;
      };
    }>;
  };
};

export const EventDetail = ({ event }: EventDetailProps) => {
  return (
    <div className="flex flex-col">
      {/* イメージエリア */}
      <div className="w-full aspect-[16/9] bg-gray-100">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            IMAGE
          </div>
        )}
      </div>

      {/* コンテンツエリア */}
      <div className="p-6 space-y-6">
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {event.tags.map(({ tag }) => (
            <span
              key={tag.id}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${tag.color}10`,
                color: tag.color,
              }}
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* タイトル */}
        <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>

        {/* 本文 */}
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
            {event.content}
          </p>
        </div>
      </div>
    </div>
  );
}; 