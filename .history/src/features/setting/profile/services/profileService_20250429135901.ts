import { ProfileFormData } from '../types/profile';

export type ProfileResponse = {
  id: string;
  userId: string;
  username: string;
  bio: string;
  oneLine: string | null;
  background: string | null;
  interests: string[];
  coreSkills: string[];
  websiteUrl: string | null;
  xUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export const profileService = {
  // プロフィールの取得
  async getProfile(userId: string): Promise<ProfileResponse | null> {
    try {
      const response = await fetch(`/api/users/${userId}/profile`);
      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('プロフィールの取得に失敗しました');
      }
      return response.json();
    } catch (error) {
      console.error('プロフィール取得エラー:', error);
      throw error;
    }
  },

  // プロフィールの更新
  async updateProfile(userId: string, data: Partial<ProfileFormData>): Promise<ProfileResponse> {
    try {
      const formData = new FormData();
      
      // アバター画像の処理
      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      // その他のデータの処理
      const profileData = { ...data };
      delete profileData.avatar;
      delete profileData.avatarUrl;
      formData.append('data', JSON.stringify(profileData));

      const response = await fetch(`/api/users/${userId}/profile`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('プロフィールの更新に失敗しました');
      }

      return response.json();
    } catch (error) {
      console.error('プロフィール更新エラー:', error);
      throw error;
    }
  },
}; 