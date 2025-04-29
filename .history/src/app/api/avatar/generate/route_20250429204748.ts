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

    const { description, style } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // スタイルの指定がある場合は追加
    const stylePrompt = style ? `Style: ${style}. ` : '';
    const prompt = `${stylePrompt}${description}`;

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
      prompt: prompt,
    });

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