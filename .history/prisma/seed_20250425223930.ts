const { PrismaClient } = require('@prisma/client');
const { seedTiers } = require('./seeds/tier');
const { seedUsers } = require('./seeds/user');
const { seedAttendanceLogs } = require('./seeds/attendance');
const { seedSystemNotices } = require('./seeds/system-notice');
const { seedWeeklyGoals } = require('./seeds/weekly-goal');

const prisma = new PrismaClient();

async function main() {
  const tiers = await seedTiers();
  const users = await seedUsers(tiers);
  await seedAttendanceLogs(users);
  await seedSystemNotices();
  await seedWeeklyGoals(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 