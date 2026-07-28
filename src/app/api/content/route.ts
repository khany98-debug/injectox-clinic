import { NextResponse } from "next/server";
import { getContentOverrides, applyContentOverrides, getPublicReviews } from "@/lib/site-store";

export async function GET() {
  const overrides = await getContentOverrides();
  return NextResponse.json({ overrides, ...applyContentOverrides(overrides), reviews: await getPublicReviews() }, { headers: { "Cache-Control": "no-store" } });
}
