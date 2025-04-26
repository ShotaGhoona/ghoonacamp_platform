import { PrismaClient } from '@prisma/client';
import { seedTiers } from './seeds/tier';
import { seedUsers } from './seeds/user';
import { seedAttendanceLogs } from './seeds/attendance';
import { seedSystemNotices } from './seeds/system-notice';
import { seedWeeklyGoals } from './seeds/weekly-goal';

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