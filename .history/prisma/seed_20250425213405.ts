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

  // ダミーユーザーの作成
  const users = await Promise.all([
    prisma.user.create({
      data: {
        clerkId: "user_2wDGFB2r7Qn3COy0uqPk1STlWcN",
        email: "shota.yamashita@ghoona.com",
        firstName: "Shota",
        lastName: "Yamashita",
        role: "USER",
        status: "ACTIVE",
        currentTierId: tiers[1].id, // Level 2: Dawn Wanderer
      },
    }),
    prisma.user.create({
      data: {
        clerkId: "user_2wDGFB2r7Qn3COy0uqPk1STlWcN2",
        email: "taro.yamada@ghoona.com",
        firstName: "Taro",
        lastName: "Yamada",
        role: "USER",
        status: "ACTIVE",
        currentTierId: tiers[2].id, // Level 3: Aurora Scout
      },
    }),
    prisma.user.create({
      data: {
        clerkId: "user_2wDGFB2r7Qn3COy0uqPk1STlWcN3",
        email: "hanako.sato@ghoona.com",
        firstName: "Hanako",
        lastName: "Sato",
        role: "USER",
        status: "ACTIVE",
        currentTierId: tiers[0].id, // Level 1: Sleeper
      },
    }),
  ]);

  // 各ユーザーの出席ログを作成（過去30日分）
  const today = new Date();
  const attendanceLogs = [];

  for (const user of users) {
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // ユーザーごとに異なる出席率を設定
      let attendanceRate = 0.8;
      if (user.email === "taro.yamada@ghoona.com") {
        attendanceRate = 0.9; // 高出席率
      } else if (user.email === "hanako.sato@ghoona.com") {
        attendanceRate = 0.7; // 低出席率
      }

      if (Math.random() < attendanceRate) {
        attendanceLogs.push(
          await prisma.attendanceLog.create({
            data: {
              userId: user.id,
              attendedDate: date,
              status: "PRESENT",
            },
          })
        );
      }
    }
  }

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

  console.log(`Created ${tiers.length} tiers`);
  console.log(`Created ${users.length} users`);
  console.log(`Created ${tags.length} tags`);
  console.log(`Created ${notices.length} notices`);
  console.log(`Created ${attendanceLogs.length} attendance logs`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 