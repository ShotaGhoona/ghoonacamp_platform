export type Step = 'basic' | 'detail' | 'confirm';

export interface ProfileFormData {
  avatar?: File;
  avatarUrl?: string;
  username: string;
  bio: string;
  // 詳細プロフィール用のフィールドは後で追加
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