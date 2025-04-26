import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const count = await prisma.attendanceLog.count({
      where: {
        user: {
          email: session.user.email
        },
        status: "PRESENT",
      }
    });

    const totalUsers = await prisma.user.count({
      where: {
        status: "ACTIVE",
      }
    });

    return NextResponse.json({ count, totalUsers });
  } catch (error) {
    console.error('出席回数の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '出席回数の取得に失敗しました' },
      { status: 500 }
    );
  }
} 