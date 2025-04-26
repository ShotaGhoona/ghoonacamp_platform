'use client';

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // ダミーユーザーの作成
  const user = await prisma.user.create({
    data: {
      clerkId: "user_2wDGFB2r7Qn3COy0uqPk1STlWcN", // 仮のClerkユーザーID
      email: "shota.yamashita@ghoona.com",
      firstName: "Shota",
      lastName: "Yamashita",
      role: "USER",
      status: "ACTIVE",
    },
  });

  // 出席ログの作成（過去30日分）
  const today = new Date();
  const attendanceLogs = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    // 80%の確率で出席
    if (Math.random() < 0.8) {
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
    "新機能のお知らせ",
    "システムメンテナンス予定",
    "アップデート完了のお知らせ",
    "重要なセキュリティ更新",
    "新しい朝活イベントの追加"
  ];
  
  const contents = [
    "新しい機能「朝活ダッシュボード」がリリースされました。",
    "システムメンテナンスを実施いたします。",
    "最新バージョンへのアップデートが完了しました。",
    "セキュリティ強化のための更新を行いました。",
    "新しい朝活イベントのカテゴリーを追加しました。"
  ];

  for (let i = 0; i < 20; i++) {
    const titleIndex = i % titles.length;
    const contentIndex = i % contents.length;
    const randomTag = tags[Math.floor(Math.random() * tags.length)];
    
    const notice = await prisma.systemNotice.create({
      data: {
        title: `${titles[titleIndex]} ${i + 1}`,
        content: `${contents[contentIndex]}\n\n詳細な内容は以下の通りです：\n・項目1\n・項目2\n・項目3\n\n今後ともよろしくお願いいたします。`,
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