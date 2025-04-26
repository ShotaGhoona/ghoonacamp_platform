const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 