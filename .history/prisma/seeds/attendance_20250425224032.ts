const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedAttendanceLogs(users) {
  const today = new Date();
  const logs = [];

  // 各ユーザーに対して過去30日分のログを作成
  for (const user of users) {
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // 80%の確率でPRESENT、20%の確率でABSENTを設定
      const status = Math.random() < 0.8 ? 'PRESENT' : 'ABSENT';
      
      logs.push(
        prisma.attendanceLog.create({
          data: {
            userId: user.id,
            attendedDate: date,
            status: status,
          },
        })
      );
    }
  }

  const createdLogs = await Promise.all(logs);
  console.log(`Created ${createdLogs.length} attendance logs`);
  return createdLogs;
}

module.exports = {
  seedAttendanceLogs
}; 