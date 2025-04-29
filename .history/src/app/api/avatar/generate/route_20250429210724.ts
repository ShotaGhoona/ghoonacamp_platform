import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const BASE_PROMPT = `Create a high school student character illustration with the following specific requirements:

1. Overall Silhouette:
- Simple, continuous-line silhouette with geometric shapes (triangles, trapezoids, parallelograms)
- 3.5-4 head proportions, maintaining a mature high school look despite shorter proportions
- Full body must be visible, no cropping at feet
- Low-poly style with flat surfaces

2. Proportions:
- Shoulder width to head width ratio ≈ 1.3
- Leg to torso ratio ≈ 1.1
- Cylindrical neck, wrists, and ankles without pinching
- School uniform elements (blazer collar, backpack straps) as accents

3. Perspective:
- 15° front view with slight overhead angle
- Ground shadow as front-facing elongated oval
- Must be in 1:1 square aspect ratio with comfortable margins for head and feet

4. Line Treatment:
- No black outlines, only surface boundaries
- 2px same-color lines only where needed for clarity

5. Color Scheme:
- Maximum 5 colors for character + 1 highlight color
- Medium tones: 60-70% saturation, 50-60% brightness
- Pastel background (85%+ brightness)
- Accent colors complementary to background

6. Shading:
- Two-stage shading only: base + shadow
- Angular, low-poly shadow cuts
- No gradients, only solid color transitions

7. Character Type:
- High school student
- Cute and appealing appearance

8. Accessories:
- Simple, bold silhouettes
- Colors coordinated with but not overshadowing main character
- School-related items (notebooks, club activity equipment)

9. Texture Rules:
- No gradients
- No noise
- No patterns
- Solid color fills only
- Maintain sharp, low-poly aesthetic

Style: Modern, clean, low-poly illustration with flat colors and geometric shapes.`;

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