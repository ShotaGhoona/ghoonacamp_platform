import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';

// プロフィール取得
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const profile = await prisma.userProfile.findUnique({
      where: { userId: params.userId },
    });

    if (!profile) {
      return new NextResponse('Not Found', { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error('プロフィール取得エラー:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}

// プロフィール更新
export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId || userId !== params.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    const avatar = formData.get('avatar') as File | null;
    const data = JSON.parse(formData.get('data') as string);

    // アバター画像のアップロード処理
    let avatarUrl: string | undefined;
    if (avatar) {
      const blob = await put(`avatars/${userId}/${avatar.name}`, avatar, {
        access: 'public',
      });
      avatarUrl = blob.url;

      // ユーザーのimageUrlを更新
      await prisma.user.update({
        where: { id: userId },
        data: { imageUrl: avatarUrl },
      });
    }

    // プロフィールの更新または作成
    const profile = await prisma.userProfile.upsert({
      where: { userId: params.userId },
      create: {
        userId: params.userId,
        username: data.username,
        bio: data.bio,
        oneLine: data.oneLine || null,
        background: data.background || null,
        interests: data.interests || [],
        coreSkills: data.coreSkills || [],
        websiteUrl: data.websiteUrl || null,
        xUrl: data.xUrl || null,
        instagramUrl: data.instagramUrl || null,
        linkedinUrl: data.linkedinUrl || null,
      },
      update: {
        username: data.username,
        bio: data.bio,
        oneLine: data.oneLine || null,
        background: data.background || null,
        interests: data.interests || [],
        coreSkills: data.coreSkills || [],
        websiteUrl: data.websiteUrl || null,
        xUrl: data.xUrl || null,
        instagramUrl: data.instagramUrl || null,
        linkedinUrl: data.linkedinUrl || null,
      },
    });

    revalidatePath('/setting/profile');
    return NextResponse.json(profile);
  } catch (error) {
    console.error('プロフィール更新エラー:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 