import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  const body = await request.json();
  const userMessage = body.message;

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 500,
    messages: [{ role: 'user', content: userMessage }],
  });

  const botReply = response.content[0].type === 'text' ? response.content[0].text : '';

  return NextResponse.json({ reply: botReply });
}