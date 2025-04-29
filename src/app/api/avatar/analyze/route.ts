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

    const { imageDataUrl } = await request.json();

    if (!imageDataUrl || !imageDataUrl.startsWith('data:image/')) {
      return NextResponse.json(
        { error: 'Invalid image data URL' },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "You are an art director extracting structured data from an image so that it can be faithfully re-drawn in a low-poly illustration.\n\nPlease look at the image and output ONLY the following JSON. Do NOT add any extra keys or commentary.\n\n{\n  \"pose\":          <short phrase>,          // e.g. \"sitting cross-legged, leaning on right hand\"\n  \"view_angle\":    <one of \"front\", \"3-quarter\", \"side\">,\n  \"gender_age\":    <e.g. \"teen boy\", \"young adult woman\">,\n  \"hair\":          <style + color>,         // \"short straight black\"\n  \"skin_tone\":     <simple>,               // \"light\", \"medium\", \"dark\"\n  \"main_clothes\": <garment + color>,       // \"navy blazer\", \"red backpack\"\n  \"accessories\":  <comma-sep list or []>,  // \"watch\", \"notebook\"\n  \"dominant_colors\": [<max 5 hex or names>] // order from most to least visible\n}\n\nRespond with the JSON only."
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
                detail: "auto"
              }
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