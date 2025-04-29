import { NextResponse } from 'next/server';
import { openai, AVATAR_GENERATION_PROMPT } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { sourceImage } = await request.json();

    // DALL-E 3で画像を生成
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: AVATAR_GENERATION_PROMPT,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return NextResponse.json({
      url: response.data[0].url,
    });
  } catch (error) {
    console.error('Error generating avatar:', error);
    return NextResponse.json(
      { error: 'Failed to generate avatar' },
      { status: 500 }
    );
  }
} 