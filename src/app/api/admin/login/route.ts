import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { requireSameOrigin, safePasswordMatch } from "@/lib/request-security";

export async function POST(request: Request) {
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const limiter = rateLimit(request, "admin-login", 5, 15 * 60 * 1000);
  if (!limiter.allowed) return rateLimitResponse(limiter.retryAfter);
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid login request." }, { status: 415 });
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured) return NextResponse.json({ error: "Add ADMIN_PASSWORD in Vercel before enabling the secure login." }, { status: 503 });
  let body: { password?: string };
  try {
    body = await request.json() as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid login request." }, { status: 400 });
  }
  if (!body.password || !safePasswordMatch(body.password, configured)) return NextResponse.json({ error: "That password is not correct." }, { status: 401 });
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, await adminToken(configured), { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 12, path: "/" });
  return response;
}
