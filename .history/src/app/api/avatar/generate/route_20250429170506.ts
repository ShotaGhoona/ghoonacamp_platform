import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // プロンプトをさらに簡潔に
    const prompt = "Create a full-body illustration of a high school student. Simple, flat colors, no outlines. Pastel background. 4-head proportion. Front view.";

    console.log('Sending request to OpenAI with prompt:', prompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    console.log('OpenAI API Response:', response);

    if (!response.data?.[0]?.url) {
      throw new Error('Failed to generate image: No URL in response');
    }

    return NextResponse.json({
      url: response.data[0].url,
    });

  } catch (error: any) {
    console.error('Detailed error:', {
      error,
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    let errorMessage = 'An unexpected error occurred while generating the avatar';
    
    if (error.response?.data?.error?.message) {
      errorMessage = error.response.data.error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: error.response?.status || 500 }
    );
  }
} 