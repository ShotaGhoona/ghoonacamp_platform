import { ProfileSettingTab } from "@/components/setting/profileSettingTab";

export const SettingSection = () => {
  return (
    <div className="w-full h-full flex flex-col">
        <ProfileSettingTab />
        <div>
            <h2>GhoonaCamp用プロフィールアバター</h2>
            <div>
                {/* 画像アップロードの箱 */}
            </div>
        </div>
        <div>
            <h2>ユーザーネーム</h2>
            <div>
                <input type="text" />
            </div>
        </div>
        <div>
            <h2>公開フレーズ｜ひとこと</h2>
            <div>
                <input type="text" />
            </div>
        </div>
    </div>
  );
};
