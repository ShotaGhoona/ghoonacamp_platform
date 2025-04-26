type StatusCardProps = {
  cards: Array<{
    id: string;
    imageUrl: string;
    isLocked?: boolean;
  }>;
};

export const StatusCard = ({ cards }: StatusCardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      {/* ヘッダー */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-700">Your Status Card</h2>
      </div>

      {/* カードグリッド */}
      <div className="grid grid-cols-5 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`aspect-square rounded-lg overflow-hidden ${
              card.isLocked ? 'bg-gray-100' : ''
            }`}
          >
            {card.isLocked ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                not yet
              </div>
            ) : (
              <img
                src={card.imageUrl}
                alt="Status card"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}; 