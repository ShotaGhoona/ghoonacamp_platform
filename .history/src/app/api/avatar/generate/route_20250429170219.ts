import { NextResponse } from 'next/server';
import { openai, AVATAR_GENERATION_PROMPT } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // プロンプトを短く、より具体的に
    const basePrompt = `高校生のキャラクターイラストを作成してください。
    - ローポリ調の3.5〜4頭身デザイン
    - 正面向き、全身が見える構図
    - 制服を着用
    - アウトラインなし、フラットな色使い
    - パステルカラーの背景
    - シンプルでクリーンなデザイン`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: basePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "anime",
    });

    if (!response.data?.[0]?.url) {
      throw new Error('Failed to generate image: No URL in response');
    }

    return NextResponse.json({
      url: response.data[0].url,
    });
  } catch (error) {
    console.error('Error generating avatar:', error);
    
    let errorMessage = 'An unexpected error occurred while generating the avatar';
    
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null) {
      // OpenAIのエラーオブジェクトの処理
      const apiError = error as { status?: number; message?: string };
      if (apiError.status === 400) {
        errorMessage = 'Invalid request parameters. Please try again with different settings.';
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
} 