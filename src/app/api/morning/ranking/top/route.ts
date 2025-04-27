import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // ユーザーごとにAttendanceLogの件数を集計し、多い順で返す
  const ranking = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      attendanceLogs: {
        select: { id: true },
      },
    },
  });

  // 参加回数でソート
  const sorted = ranking
    .map(user => ({
      firstName: user.firstName,
      lastName: user.lastName,
      count: user.attendanceLogs.length,
    }))
    .sort((a, b) => b.count - a.count);

  return NextResponse.json(sorted);
} 