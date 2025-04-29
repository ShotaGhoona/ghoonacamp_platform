export type Step = 'basic' | 'detail' | 'confirm';

export const PRESET_INTERESTS = [
  'プログラミング',
  'デザイン',
  'マーケティング',
  'ビジネス',
  '起業',
  '投資',
  '自己啓発',
  '読書',
  '音楽',
  'アート',
  'スポーツ',
  '旅行',
  '料理',
  '写真',
  'ブログ',
  'ポッドキャスト',
  'AI',
  'ブロックチェーン',
  'Web3',
  'SDGs'
] as const;

export type PresetInterest = typeof PRESET_INTERESTS[number];
export type Interest = PresetInterest | string;

export const PRESET_SKILLS = [
  'JavaScript',
  'TypeScript',
  'Python',
  'React',
  'Next.js',
  'Node.js',
  'Vue.js',
  'Angular',
  'PHP',
  'Laravel',
  'Ruby',
  'Rails',
  'Java',
  'Spring',
  'AWS',
  'Docker',
  'Kubernetes',
  'SQL',
  'NoSQL',
  'Git'
] as const;

export type PresetSkill = typeof PRESET_SKILLS[number];
export type Skill = PresetSkill | string;

export interface ProfileFormData {
  // 基本プロフィール
  avatar?: File;
  avatarUrl?: string;
  username: string;
  bio: string;

  // 詳細プロフィール
  oneLine?: string;          // 一言プロフィール（30文字）
  background?: string;       // 経歴・背景（140文字）
  interests?: Interest[];    // 興味・関心事
  coreSkills?: Skill[];     // コアスキル
  
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