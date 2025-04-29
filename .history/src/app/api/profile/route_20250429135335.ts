import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function PUT(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const data = await request.json();
    
    // プロフィールの更新または作成（upsert）
    const profile = await prisma.userProfile.upsert({
      where: {
        userId,
      },
      update: {
        username: data.username,
        bio: data.bio,
        oneLine: data.oneLine,
        background: data.background,
        interests: data.interests,
        coreSkills: data.coreSkills,
        websiteUrl: data.websiteUrl,
        xUrl: data.xUrl,
        instagramUrl: data.instagramUrl,
        linkedinUrl: data.linkedinUrl,
      },
      create: {
        userId,
        username: data.username,
        bio: data.bio,
        oneLine: data.oneLine,
        background: data.background,
        interests: data.interests,
        coreSkills: data.coreSkills,
        websiteUrl: data.websiteUrl,
        xUrl: data.xUrl,
        instagramUrl: data.instagramUrl,
        linkedinUrl: data.linkedinUrl,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('プロフィール更新エラー:', error);
    return NextResponse.json(
      { error: 'プロフィールの更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: {
        userId,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    return NextResponse.json(
      { error: 'プロフィールの取得に失敗しました' },
      { status: 500 }
    );
  }
} 