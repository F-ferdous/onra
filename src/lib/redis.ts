import Redis from "ioredis";

const url = process.env.REDIS_URL ?? "redis://127.0.0.1:6379";

export const redis = new Redis(url, {
  maxRetriesPerRequest: 2,
  enableReadyCheck: true,
});

export async function cacheSet<T>(key: string, value: T, ttlSeconds?: number) {
  const payload = JSON.stringify(value);
  if (ttlSeconds) {
    await redis.set(key, payload, "EX", ttlSeconds);
  } else {
    await redis.set(key, payload);
  }
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  const val = await redis.get(key);
  return val ? (JSON.parse(val) as T) : null;
}

export async function cacheDel(key: string) {
  await redis.del(key);
}