import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // ClerkのWebhookから送られるユーザー情報
    const { id, email_addresses, first_name, last_name, image_url } = body;

    // すでに存在する場合は何もしない
    const existing = await prisma.user.findUnique({
      where: { clerkId: id },
    });
    if (existing) {
      return NextResponse.json({ message: 'User already exists' }, { status: 200 });
    }

    // メールアドレスは配列で送られてくる場合がある
    const email = Array.isArray(email_addresses) && email_addresses.length > 0
      ? email_addresses[0].email_address
      : '';

    // ユーザーを作成
    await prisma.user.create({
      data: {
        clerkId: id,
        email,
        firstName: first_name ?? null,
        lastName: last_name ?? null,
        imageUrl: image_url ?? null,
        role: 'USER',
        status: 'ACTIVE',
      },
    });

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error('Clerk webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 