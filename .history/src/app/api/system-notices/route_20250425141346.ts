import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const notices = await prisma.SystemNotice.findMany({
      include: {
        tags: {
          include: {
            tag: true
          }
        }
      },
      where: {
        isPublic: true,
        publishStartAt: {
          lte: new Date()
        },
        publishEndAt: {
          gte: new Date()
        },
        deletedAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(notices);
  } catch (error) {
    console.error('システム通知の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'システム通知の取得に失敗しました' },
      { status: 500 }
    );
  }
} 