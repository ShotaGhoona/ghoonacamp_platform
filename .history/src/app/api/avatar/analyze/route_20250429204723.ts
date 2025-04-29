import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "この画像の特徴を、DALL-E 3で再現可能な形式で詳しく説明してください。以下の点に注目して説明してください：\n- 全体的な構図\n- 主な色使い\n- スタイル（アニメ調、リアル調など）\n- 特徴的な要素"
            },
            {
              type: "image_url",
              image_url: imageUrl,
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const description = response.choices[0]?.message?.content;

    if (!description) {
      throw new Error('Failed to analyze image');
    }

    return NextResponse.json({ description });

  } catch (err) {
    if (err instanceof OpenAI.APIError) {
      const errorDetails = {
        status: err.status,
        name: err.name,
        message: err.message,
        code: err.code,
        type: err.type,
        param: err.param,
      };

      console.error('OpenAI error details:', errorDetails);

      return NextResponse.json(
        { 
          error: err.message,
          details: errorDetails
        },
        { status: err.status }
      );
    }

    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: String(err) },
      { status: 500 }
    );
  }
} 