import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const BASE_PROMPT = `
### SYSTEM
You are a professional illustrator. Produce ONE low-poly, flat-shade character avatar in a clean, modern style suitable for social media profiles.

### USER (template; <…> は ①の JSON を展開して差し込む)
Create a full-body low-poly illustration with these constraints:

<pose>, viewed from <view_angle>, 4-head proportion.
Character: <gender_age>, <hair>, <skin_tone> skin.
Main clothes: <main_clothes>. Accessories: <accessories>.

STYLE RULES:
- Geometric silhouette built from triangles / trapezoids, continuous mass.
- No black outlines. Surface-edge strokes only if needed (same-hue 2 px).
- Palette: use the following dominant colors exactly once each where appropriate: <dominant_colors>. Add one highlight color if necessary.
- Max 5 character colors + 1 highlight. Background: pastel (#FDF7F4 range), blank aside from a subtle ground shadow.
- Shading: 2-step cel shading (base + single hard shadow) with angular cuts. No gradients, noise, or textures.
- Output must fit inside a 1:1 square without cropping feet or head, slight top-down 15° perspective.

Return only the image; do not add captions or text.

`;

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { description } = await request.json();

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // 分析結果を基本プロンプトと組み合わせる
    const prompt = `${BASE_PROMPT}\n\nAdditional character details based on reference:\n${description}`;

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