import "server-only";

import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

function configuredOrigin() {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return value ? new URL(value).origin : undefined;
}

/** Blocks cross-site browser POSTs. Stripe webhooks deliberately do not use this guard. */
export function requireSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const expected = configuredOrigin() ?? new URL(request.url).origin;
  if (!origin || origin !== expected) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  return null;
}

export function secureSiteOrigin(request: Request) {
  return configuredOrigin() ?? new URL(request.url).origin;
}

export function safePasswordMatch(candidate: string, configured: string) {
  const candidateBytes = Buffer.from(candidate);
  const configuredBytes = Buffer.from(configured);
  return candidateBytes.length === configuredBytes.length && timingSafeEqual(candidateBytes, configuredBytes);
}

export function validHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}
