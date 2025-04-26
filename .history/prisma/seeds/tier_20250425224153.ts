const prisma = require('./prisma');

async function seedTiers() {
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

  console.log(`Created ${tiers.length} tiers`);
  return tiers;
}

module.exports = {
  seedTiers
}; 