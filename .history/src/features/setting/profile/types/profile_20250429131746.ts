export type Step = 'basic' | 'detail' | 'confirm';

export interface ProfileFormData {
  // 基本プロフィール
  avatar?: File;
  avatarUrl?: string;
  username: string;
  bio: string;

  // 詳細プロフィール
  oneLine?: string;          // 一言プロフィール（30文字）
  background?: string;       // 経歴・背景（140文字）
  interests?: string[];      // 興味・関心事
  coreSkills?: string[];    // コアスキル
  
  // SNSリンク
  instagramUrl?: string;
  websiteUrl?: string;
  xUrl?: string;
  linkedinUrl?: string;
}

export interface StepInfo {
  id: Step;
  number: number;
  title: string;
}

export const PROFILE_STEPS: StepInfo[] = [
  { id: 'basic', number: 1, title: '基本プロフィール' },
  { id: 'detail', number: 2, title: '詳細プロフィール' },
  { id: 'confirm', number: 3, title: '最終確認' },
]; 