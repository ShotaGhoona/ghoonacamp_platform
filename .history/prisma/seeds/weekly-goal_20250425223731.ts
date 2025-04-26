import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedWeeklyGoals(users: any[]) {
  const goals = [];
  const today = new Date('2024-04-25');

  // 目標のテンプレート
  const goalTemplates = [
    {
      title: "朝5時起床を習慣化",
      description: "毎日朝5時に起床して、朝活を始める習慣を身につける",
      targetDays: 5
    },
    {
      title: "朝の運動習慣",
      description: "朝30分のジョギングまたはストレッチを行う",
      targetDays: 4
    },
    {
      title: "朝の読書時間確保",
      description: "朝30分の読書時間を確保し、自己啓発本を読む",
      targetDays: 3
    },
    {
      title: "朝食を毎日摂取",
      description: "栄養バランスの良い朝食を毎日摂取する",
      targetDays: 6
    },
    {
      title: "瞑想の習慣化",
      description: "朝10分間の瞑想を行い、精神的な安定を図る",
      targetDays: 4
    },
    {
      title: "プログラミング学習",
      description: "朝の時間を使ってプログラミングの学習を進める",
      targetDays: 3
    }
  ];

  // 各ユーザーに対して目標を作成
  for (const user of users) {
    // 先週の目標
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);
    for (let i = 0; i < 3; i++) {
      const template = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
      goals.push(
        prisma.weeklyGoal.create({
          data: {
            userId: user.id,
            title: template.title,
            description: template.description,
            targetDays: template.targetDays,
            achievedDays: Math.floor(Math.random() * (template.targetDays + 1)), // ランダムな達成日数
            startDate: lastWeekStart,
            endDate: new Date(lastWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000), // 7日後
            status: 'COMPLETED'
          }
        })
      );
    }

    // 今週の目標
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - 4); // 金曜日から4日前が月曜日
    for (let i = 0; i < 3; i++) {
      const template = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
      goals.push(
        prisma.weeklyGoal.create({
          data: {
            userId: user.id,
            title: template.title,
            description: template.description,
            targetDays: template.targetDays,
            achievedDays: Math.floor(Math.random() * Math.min(5, template.targetDays + 1)), // 金曜日なので最大5日まで
            startDate: thisWeekStart,
            endDate: new Date(thisWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
            status: 'IN_PROGRESS'
          }
        })
      );
    }

    // 来週の目標
    const nextWeekStart = new Date(today);
    nextWeekStart.setDate(today.getDate() + 3); // 金曜日から3日後が月曜日
    for (let i = 0; i < 3; i++) {
      const template = goalTemplates[Math.floor(Math.random() * goalTemplates.length)];
      goals.push(
        prisma.weeklyGoal.create({
          data: {
            userId: user.id,
            title: template.title,
            description: template.description,
            targetDays: template.targetDays,
            achievedDays: 0,
            startDate: nextWeekStart,
            endDate: new Date(nextWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000),
            status: 'NOT_STARTED'
          }
        })
      );
    }
  }

  const createdGoals = await Promise.all(goals);
  console.log(`Created ${createdGoals.length} weekly goals`);
  return createdGoals;
} 