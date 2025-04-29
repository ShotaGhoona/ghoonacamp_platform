import { NextResponse } from 'next/server';
import { openai, AVATAR_GENERATION_PROMPT } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const { sourceImage } = await request.json();

    // DALL-E 3で画像を生成
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `${AVATAR_GENERATION_PROMPT}\n\n追加の注意点：キャラクターは正面を向いており、全身が見えるようにしてください。`,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    if (!response.data?.[0]?.url) {
      throw new Error('Failed to generate image: No URL in response');
    }

    return NextResponse.json({
      url: response.data[0].url,
    });
  } catch (error) {
    console.error('Error generating avatar:', error);
    
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unexpected error occurred while generating the avatar';

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 