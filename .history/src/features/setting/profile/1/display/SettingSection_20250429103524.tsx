import { ProfileSettingTab } from "@/components/setting/profileSettingTab";

export const SettingSection = () => {
  return (
    <div className="w-full h-full flex flex-col">
        <ProfileSettingTab />
        <div>
            <h2>GhoonaCamp用プロフィールアバター</h2>
            <div>
                {/* 画像アップロードの箱 */}
                <div>
                    <p>画像をアップロード</p>
                    <input type="file" />
                </div>
            </div>
        </div>
    </div>
  );
};
