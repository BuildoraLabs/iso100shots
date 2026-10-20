import { NextResponse } from "next/server";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const counterKey = process.env.VISITOR_COUNTER_KEY ?? "iso100shots:visitor-count";

type UpstashResult<T> = {
  result?: T;
  error?: string;
};

async function redisCommand<T>(command: string[]) {
  if (!redisUrl || !redisToken) {
    throw new Error("Visitor counter storage is not configured.");
  }

  const response = await fetch(`${redisUrl}/pipeline`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${redisToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify([command]),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Visitor counter storage request failed.");
  }

  const [data] = (await response.json()) as Array<UpstashResult<T>>;

  if (data?.error) {
    throw new Error(data.error);
  }

  return data?.result;
}

export async function GET() {
  try {
    const count = (await redisCommand<number>(["GET", counterKey])) ?? 0;

    return NextResponse.json({
      count: Number(count),
      configured: true
    });
  } catch {
    return NextResponse.json({
      count: null,
      configured: false
    });
  }
}

export async function POST() {
  try {
    const count = await redisCommand<number>(["INCR", counterKey]);

    return NextResponse.json({
      count: Number(count ?? 0),
      configured: true
    });
  } catch {
    return NextResponse.json(
      {
        count: null,
        configured: false
      },
      { status: 503 }
    );
  }
}
