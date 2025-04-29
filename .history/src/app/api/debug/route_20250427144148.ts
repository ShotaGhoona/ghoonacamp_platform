import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const { userId } = await auth();
    console.log('Debug - Clerk userId:', userId);

    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Supabaseのusersテーブルからユーザーを検索
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    console.log('Debug - Database user:', user);

    return NextResponse.json({
      clerkUserId: userId,
      databaseUser: user,
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { error: 'Debug endpoint error' },
      { status: 500 }
    );
  }
} 