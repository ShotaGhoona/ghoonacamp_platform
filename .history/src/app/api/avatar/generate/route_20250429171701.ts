import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import type { APIError } from 'openai/error';

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // プロンプトをさらに簡潔に
    const prompt = "Create a simple icon in flat style";

    console.log('Sending request to OpenAI with prompt:', prompt);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
    });

    console.log('OpenAI API Response:', response);

    if (!response.data?.[0]?.url) {
      throw new Error('Failed to generate image: No URL in response');
    }

    return NextResponse.json({
      url: response.data[0].url,
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
    } else {
      console.error('Unexpected error:', err);
      
      return NextResponse.json(
        { error: 'An unexpected error occurred', details: String(err) },
        { status: 500 }
      );
    }
  }
} 