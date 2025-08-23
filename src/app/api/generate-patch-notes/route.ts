import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple in-memory rate limiter
class InMemoryRateLimiter {
  private requests: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(identifier: string): Promise<{ success: boolean; remaining: number; reset: number; limit: number }> {
    const now = Date.now();
    const key = identifier;
    const record = this.requests.get(key);

    // Clean up expired records
    if (record && now > record.resetTime) {
      this.requests.delete(key);
    }

    if (!record || now > record.resetTime) {
      // First request or window expired
      this.requests.set(key, { count: 1, resetTime: now + this.windowMs });
      return { success: true, remaining: this.maxRequests - 1, reset: now + this.windowMs, limit: this.maxRequests };
    }

    if (record.count >= this.maxRequests) {
      // Rate limit exceeded
      return { success: false, remaining: 0, reset: record.resetTime, limit: this.maxRequests };
    }

    // Increment count
    record.count++;
    this.requests.set(key, record);
    
    return { success: true, remaining: this.maxRequests - record.count, reset: record.resetTime, limit: this.maxRequests };
  }
}

// Initialize rate limiter: 10 requests per minute
const rateLimiter = new InMemoryRateLimiter(10, 60 * 1000);

// Helper function to get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfConnectingIP) {
    return cfConnectingIP;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);
    
    // Check rate limit
    const { success, limit, reset, remaining } = await rateLimiter.limit(clientIP);
    
    if (!success) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded. Please try again later.',
          limit,
          reset,
          remaining
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          }
        }
      );
    }

    const { mode, gameName, description, style, format } = await request.json();

    if (!mode || !gameName || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Create prompt based on mode and style/format
    let systemPrompt = '';
    let userPrompt = '';

    if (mode === 'meme') {
      systemPrompt = `You are a hilarious game developer who creates funny, over-the-top patch notes for video games. Make them entertaining and meme-worthy while keeping them game-related.`;
      
      const styleInstructions = {
        'League-style': 'Use League of Legends style humor with references to "balance changes", "200 years of experience", and "200 years of collective game design experience"',
        'Valve-style': 'Use Valve/Steam style with references to "Source 2", "Half-Life 3 confirmed", and "Valve time"',
        'Overwatch-style': 'Use Overwatch style with references to "hero balance", "meta changes", and "competitive play"',
        'Parody': 'Create a parody of typical patch notes with absurd changes and funny explanations'
      };

      userPrompt = `Create funny patch notes for the game "${gameName}" in ${style} style.

${styleInstructions[style as keyof typeof styleInstructions] || styleInstructions['Parody']}

Make it hilarious and over-the-top, like something you'd see in a meme. Include:
- A version number (like v2.1.337 or v420.69)
- Multiple funny "fixes" and "improvements"
- Use gaming humor and references specific to the style
- Keep it under 200 words
- Format it nicely with bullet points
- Make it feel authentic to the chosen style`;
    } else {
      systemPrompt = `You are a professional software developer who creates clean, professional patch notes for software releases.`;
      
      const formatInstructions = {
        'Steam-style': 'Use Steam-style formatting with clear sections like "General", "Bug Fixes", "Improvements"',
        'Indie Blog-style': 'Use a more casual, friendly tone like indie game developers use in their blogs',
        'Short & Professional': 'Keep it concise and business-like, similar to enterprise software releases'
      };

      userPrompt = `Create professional patch notes for "${gameName}" in ${format} format.

${formatInstructions[format as keyof typeof formatInstructions] || formatInstructions['Steam-style']}

Based on these changelog items: "${description}"

Make it professional and well-structured. Include:
- A version number (like v2.1.0)
- Categorize changes appropriately for the format
- Use clear, technical language
- Keep it under 200 words
- Format it nicely with proper sections
- Match the tone and style of the chosen format`;
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      max_tokens: 400,
      temperature: mode === 'meme' ? 0.9 : 0.3,
    });

    const generatedText = completion.choices[0]?.message?.content || 'Failed to generate patch notes';

    return NextResponse.json({
      result: generatedText,
      mode,
      gameName,
      rateLimit: {
        remaining: remaining - 1,
        reset,
        limit
      }
    });

  } catch (error) {
    console.error('Error generating patch notes:', error);
    return NextResponse.json(
      { error: 'Failed to generate patch notes' },
      { status: 500 }
    );
  }
}
