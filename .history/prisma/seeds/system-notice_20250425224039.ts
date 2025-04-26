const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedSystemNotices() {
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

  const notices = [];
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

  console.log(`Created ${tags.length} tags`);
  console.log(`Created ${notices.length} notices`);
  return { tags, notices };
}

module.exports = {
  seedSystemNotices
}; 