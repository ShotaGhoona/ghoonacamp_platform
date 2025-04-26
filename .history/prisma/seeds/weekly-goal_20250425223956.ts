const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedWeeklyGoals(users) {
  const goals = [];
  const today = new Date('2024-04-25');

  // 目標のテンプレート
  const goalTemplates = [
    {
      content: "毎日朝5時に起床して、朝活を始める習慣を身につける。目標は週5日の達成を目指します。",
    },
    {
      content: "朝30分のジョギングまたはストレッチを行い、健康的な一日をスタートさせます。週4日の実施を目標とします。",
    },
    {
      content: "朝30分の読書時間を確保し、自己啓発本を読んで自己成長を図ります。週3日の実施を目指します。",
    },
    {
      content: "栄養バランスの良い朝食を毎日摂取し、健康的な生活リズムを作ります。週6日の達成が目標です。",
    },
    {
      content: "朝10分間の瞑想を行い、精神的な安定を図ります。週4日の実施を目標とします。",
    },
    {
      content: "朝の時間を使ってプログラミングの学習を進め、スキルアップを図ります。週3日の実施を目指します。",
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
            weekStart: lastWeekStart,
            content: template.content,
            isPublic: true,
            isPast: true,
            reflection: "目標を達成できました。来週も継続して頑張ります。",
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
            weekStart: thisWeekStart,
            content: template.content,
            isPublic: true,
            isPast: false,
            reflection: null,
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
            weekStart: nextWeekStart,
            content: template.content,
            isPublic: true,
            isPast: false,
            reflection: null,
          }
        })
      );
    }
  }

  const createdGoals = await Promise.all(goals);
  console.log(`Created ${createdGoals.length} weekly goals`);
  return createdGoals;
}

module.exports = {
  seedWeeklyGoals
}; 