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
    const prompt = "Create a full-body illustration of a high school student. Simple, flat colors, no outlines. Pastel background. 4-head proportion. Front view.";

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
      console.error('OpenAI error ►', {
        status: err.status,          // 400
        name: err.name,              // BadRequestError
        message: err.message,        // usually tells you the real cause
        code: err.code,              // e.g. "content_policy_violation", "invalid_request_error"
        type: err.type,              // "invalid_request_error" など
        param: err.param,            // どのパラメータで怒られたか
      });

      return NextResponse.json(
        { 
          error: `OpenAI API Error: ${err.message}`,
          details: {
            status: err.status,
            code: err.code,
            type: err.type,
            param: err.param,
          }
        },
        { status: err.status }
      );
    } else {
      console.error('Unexpected error:', err);
      
      return NextResponse.json(
        { error: 'An unexpected error occurred' },
        { status: 500 }
      );
    }
  }
} 