type ProfileSectionProps = {
  name: string;
  title: string;
  avatarUrl: string;
  vision: string;
};

export const ProfileSection = ({
  name,
  title,
  avatarUrl,
  vision,
}: ProfileSectionProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 flex gap-8 items-start">
      {/* アバター画像 */}
      <div className="w-48 h-48 bg-cyan-50 rounded-2xl overflow-hidden flex-shrink-0">
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* プロフィール情報 */}
      <div className="flex-1 space-y-4">
        {/* タイトルと名前 */}
        <div>
          <h2 className="text-gray-600 text-lg mb-1">{title}</h2>
          <h1 className="text-3xl font-bold text-white">{name}</h1>
        </div>

        {/* ビジョン */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-400">将来なりたい姿・ビジョン</h3>
          <p className="text-lg text-gray-700 font-medium">{vision}</p>
        </div>
      </div>
    </div>
  );
}; 