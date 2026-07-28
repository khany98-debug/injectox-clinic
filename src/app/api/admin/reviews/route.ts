import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { getReviews, saveReviews } from "@/lib/site-store";
import { requireSameOrigin } from "@/lib/request-security";

async function authorised() {
  const password = process.env.ADMIN_PASSWORD;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(password && cookie === await adminToken(password));
}

export async function GET() {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  return NextResponse.json({ reviews: await getReviews() }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  const body = await request.json() as { id?: string; status?: "pending" | "approved" | "dismissed" };
  if (!body.id || !body.status) return NextResponse.json({ error: "Review and status are required" }, { status: 400 });
  const reviews = await getReviews();
  const updated = reviews.map((review) => review.id === body.id ? { ...review, status: body.status! } : review);
  await saveReviews(updated);
  return NextResponse.json({ reviews: updated });
}
