import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export async function POST() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json({ count: null });
  }

  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  const count = await redis.incr('portfolio:visitors');
  return NextResponse.json({ count });
}
