const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedUsers(tiers) {
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

  console.log(`Created ${users.length} users`);
  return users;
}

module.exports = {
  seedUsers
}; 