import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export async function POST() {
  const url   = process.env.KV_REST_API_URL   || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN  || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ count: null });
  }

  const redis = new Redis({ url, token });
  const count = await redis.incr('portfolio:visitors');
  return NextResponse.json({ count });
}
