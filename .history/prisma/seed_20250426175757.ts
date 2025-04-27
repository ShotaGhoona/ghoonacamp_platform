const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Tierの作成
  const tiers = await Promise.all([
    prisma.tier.create({
      data: {
        level: 1,
        titleJa: 'まどろみ見習い',
        titleEn: 'Sleeper',
        cardImageUrl: '/svg/tier/1',
        badgeColor: '#C9C8E1',
        minDays: 0,
        maxDays: 29,
      },
    }),
    prisma.tier.create({
      data: {
        level: 2,
        titleJa: '夜明けの旅人',
        titleEn: 'Dawn Wanderer',
        cardImageUrl: '/svg/tier/2',
        badgeColor: '#A8E6CF',
        minDays: 30,
        maxDays: 59,
      },
    }),
    prisma.tier.create({
      data: {
        level: 3,
        titleJa: '朝焼け探検家',
        titleEn: 'Aurora Scout',
        cardImageUrl: '/svg/tier/3',
        badgeColor: '#F6C089',
        minDays: 60,
        maxDays: 89,
      },
    }),
    prisma.tier.create({
      data: {
        level: 4,
        titleJa: 'サンライズ職人',
        titleEn: 'Sunrise Crafter',
        cardImageUrl: '/svg/tier/4',
        badgeColor: '#4FA7B3',
        minDays: 90,
        maxDays: 119,
      },
    }),
    prisma.tier.create({
      data: {
        level: 5,
        titleJa: '太陽追い',
        titleEn: 'Sun Chaser',
        cardImageUrl: '/svg/tier/5',
        badgeColor: '#FF3B30',
        minDays: 120,
        maxDays: 149,
      },
    }),
    prisma.tier.create({
      data: {
        level: 6,
        titleJa: '暁の達人',
        titleEn: 'Daybreak Master',
        cardImageUrl: '/svg/tier/6',
        badgeColor: '#2363D1',
        minDays: 150,
        maxDays: 179,
      },
    }),
    prisma.tier.create({
      data: {
        level: 7,
        titleJa: '曙光の守護者',
        titleEn: 'Aurora Guardian',
        cardImageUrl: '/svg/tier/7',
        badgeColor: '#7046B3',
        minDays: 180,
        maxDays: 209,
      },
    }),
    prisma.tier.create({
      data: {
        level: 8,
        titleJa: '太陽賢者',
        titleEn: 'Solar Sage',
        cardImageUrl: '/svg/tier/8',
        badgeColor: '#FFA52D',
        minDays: 210,
        maxDays: null,
      },
    }),
  ]);

  // 日本人名リスト
  const firstNames = [
    "太郎", "花子", "一郎", "美咲", "健太", "さくら", "翔太", "葵", "大輔", "結衣",
    "悠斗", "陽菜", "蓮", "美月", "颯太", "愛", "陸", "心愛", "海斗", "美優"
  ];
  const lastNames = [
    "山田", "佐藤", "鈴木", "高橋", "田中", "伊藤", "渡辺", "中村", "小林", "加藤",
    "吉田", "山本", "斎藤", "木村", "林", "清水", "山口", "松本", "井上", "阿部"
  ];

  // ユーザー20人を作成（日本人名でユニークに）
  const users = [];
  for (let i = 0; i < 20; i++) {
    users.push(
      await prisma.user.create({
        data: {
          clerkId: `user_dummy_${i+1}`,
          email: `user${i+1}@example.com`,
          firstName: firstNames[i],
          lastName: lastNames[i],
          role: 'USER',
          status: 'ACTIVE',
          currentTierId: tiers[i % tiers.length].id,
        },
      })
    );
  }

  // 2025/1/1〜2025/4/26（116日分）の出席データを全ユーザー分作成
  const startDate = new Date('2025-01-01');
  const endDate = new Date('2025-04-26');
  const attendanceLogs = [];
  let totalAttendance = 0;
  let totalPossible = 0;
  for (const user of users) {
    // 各ユーザーごとに出席率を30%～90%でランダムに割り当て
    const attendanceRate = Math.round((Math.random() * 0.6 + 0.3) * 100) / 100; // 0.3～0.9
    let date = new Date(startDate);
    while (date <= endDate) {
      totalPossible++;
      if (Math.random() < attendanceRate) {
        attendanceLogs.push(
          await prisma.attendanceLog.create({
            data: {
              userId: user.id,
              attendedDate: new Date(date),
              status: 'PRESENT',
            },
          })
        );
        totalAttendance++;
      }
      date.setDate(date.getDate() + 1);
    }
    console.log(`${user.lastName} ${user.firstName} 出席率: ${(attendanceRate*100).toFixed(1)}%`);
  }
  console.log(`全体平均出席率: ${(totalAttendance/totalPossible*100).toFixed(1)}%`);

  // システム通知タグの作成
  const tags = await Promise.all([
    prisma.systemNoticeTag.create({
      data: {
        name: "重要",
        color: "#FF4B4B",
      },
    }),
    prisma.systemNoticeTag.create({
      data: {
        name: "アップデート",
        color: "#4B7BFF",
      },
    }),
    prisma.systemNoticeTag.create({
      data: {
        name: "お知らせ",
        color: "#47B881",
      },
    }),
  ]);

  // システム通知のダミーデータ
  const notices = [];
  const titles = [
    "新機能「朝活ダッシュボード」リリース",
    "システムメンテナンスのお知らせ",
    "アップデート完了のお知らせ",
    "セキュリティ強化のお知らせ",
    "新しい朝活イベントの追加"
  ];
  
  const contents = [
    "新しい機能「朝活ダッシュボード」がリリースされました。\n\n・出席回数の可視化\n・目標達成度の確認\n・コミュニティの活性化\n\nぜひご利用ください。",
    "システムメンテナンスを実施いたします。\n\n日時：2024年4月25日（木）2:00-4:00\n\nこの時間帯はサービスが利用できませんので、ご注意ください。",
    "最新バージョンへのアップデートが完了しました。\n\n・パフォーマンスの改善\n・UIの改善\n・バグの修正\n\nより快適にご利用いただけます。",
    "セキュリティ強化のための更新を行いました。\n\n・二要素認証の強化\n・パスワードポリシーの更新\n・不正アクセス対策の強化\n\n安心してご利用ください。",
    "新しい朝活イベントのカテゴリーを追加しました。\n\n・プログラミング\n・読書\n・運動\n・瞑想\n\nぜひご参加ください。"
  ];

  for (let i = 0; i < 20; i++) {
    const titleIndex = i % titles.length;
    const contentIndex = i % contents.length;
    const randomTag = tags[Math.floor(Math.random() * tags.length)];
    
    const notice = await prisma.systemNotice.create({
      data: {
        title: `${titles[titleIndex]}`,
        content: contents[contentIndex],
        isPublic: true,
        tags: {
          create: {
            tagId: randomTag.id
          }
        }
      },
    });
    
    notices.push(notice);
  }

  // WeeklyGoalのダミーデータ
  const weeklyGoals = [];
  const goals = [
    "FastAPIを使って新機能を3つ実装する",
    "朝5時に起床して朝活を継続する",
    "技術書を2冊読破する",
    "新しいチームメンバーのメンタリングを行う",
    "プロジェクトのドキュメントを整備する"
  ];

  const reflections = [
    "目標を達成できた。特にドキュメント作成が効率的に進んだ。",
    "予定より1日遅れたが、品質は確保できた。",
    "朝活を5日間継続できた。来週は7日間を目指す。",
    null, // 振り返りなしのケース
    "チームの協力もあり、予定以上の成果を出せた。"
  ];

  // 過去4週間分のデータを作成
  for (const user of users) {
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i * 7));
      weekStart.setHours(0, 0, 0, 0);
      
      const goalIndex = Math.floor(Math.random() * goals.length);
      const reflectionIndex = Math.floor(Math.random() * reflections.length);

      weeklyGoals.push(
        await prisma.weeklyGoal.create({
          data: {
            userId: user.id,
            weekStart,
            content: goals[goalIndex],
            isPublic: Math.random() > 0.2, // 80%の確率でpublic
            isPast: i > 0, // 現在の週以外は過去の目標
            reflection: i > 0 ? reflections[reflectionIndex] : null, // 過去の目標のみ振り返りあり
          },
        })
      );
    }
  }

  console.log(`Created ${tiers.length} tiers`);
  console.log(`Created ${users.length} users`);
  console.log(`Created ${tags.length} tags`);
  console.log(`Created ${notices.length} notices`);
  console.log(`Created ${attendanceLogs.length} attendance logs`);
  console.log(`Created ${weeklyGoals.length} weekly goals`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 