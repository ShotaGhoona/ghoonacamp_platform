type ActivityData = {
  day: 'M' | 'T' | 'W' | 'T' | 'F' | 'S' | 'S';
  me: number;
  rival: number;
  average: number;
};

type ActivityGraphProps = {
  data: ActivityData[];
};

export const ActivityGraph = ({ data }: ActivityGraphProps) => {
  const maxValue = Math.max(
    ...data.flatMap((d) => [d.me, d.rival, d.average])
  );

  return (
    <div className="bg-white rounded-2xl p-6">
      {/* ヘッダー */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-lg font-bold text-gray-700">Weekly Activity</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-400" />
            <span className="text-sm text-gray-600">Me</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-sm text-gray-600">Rival</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-300" />
            <span className="text-sm text-gray-600">Average</span>
          </div>
        </div>
      </div>

      {/* グラフ */}
      <div className="flex items-end justify-between h-48">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            {/* バー */}
            <div className="flex gap-1">
              <div
                className="w-4 bg-blue-600 rounded-t"
                style={{
                  height: `${(item.rival / maxValue) * 100}%`,
                }}
              />
              <div
                className="w-4 bg-pink-400 rounded-t"
                style={{
                  height: `${(item.me / maxValue) * 100}%`,
                }}
              />
              <div
                className="w-4 bg-gray-300 rounded-t"
                style={{
                  height: `${(item.average / maxValue) * 100}%`,
                }}
              />
            </div>
            {/* 曜日 */}
            <div className="text-sm text-gray-500">{item.day}</div>
          </div>
        ))}
      </div>
    </div>
  );
}; 