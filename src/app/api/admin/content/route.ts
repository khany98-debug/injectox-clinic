import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminToken } from "@/lib/admin-auth";
import { getContentOverrides, saveContentOverrides, contentStoreConfigured, type ContentOverrides } from "@/lib/site-store";
import { requireSameOrigin } from "@/lib/request-security";

async function authorised() {
  const password = process.env.ADMIN_PASSWORD;
  const cookie = (await cookies()).get(ADMIN_COOKIE)?.value;
  return Boolean(password && cookie === await adminToken(password));
}

export async function GET() {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const content = await getContentOverrides();
  return NextResponse.json({
    content,
    persistent: contentStoreConfigured(),
    integrations: {
      reviewNotifications: Boolean(process.env.BREVO_API_KEY),
      notificationEmail: content.clinic.contactEmail || process.env.ADMIN_NOTIFICATION_EMAIL || "injectoxclinic@gmail.com",
    },
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!await authorised()) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const originError = requireSameOrigin(request);
  if (originError) return originError;
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Invalid content request" }, { status: 415 });
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 500_000) return NextResponse.json({ error: "Content is too large" }, { status: 413 });
  let body: { content?: unknown };
  try { body = await request.json() as { content?: unknown }; } catch { return NextResponse.json({ error: "Invalid content request" }, { status: 400 }); }
  if (!body.content || typeof body.content !== "object" || Array.isArray(body.content)) return NextResponse.json({ error: "Content is required" }, { status: 400 });
  const input = body.content as Record<string, unknown>;
  const isRecord = (value: unknown): value is Record<string, unknown> => Boolean(value && typeof value === "object" && !Array.isArray(value));
  const copy: Record<string, string> = {};
  if (input.copy !== undefined && !isRecord(input.copy)) return NextResponse.json({ error: "Invalid website copy" }, { status: 400 });
  for (const [key, value] of Object.entries((input.copy as Record<string, unknown> | undefined) ?? {})) {
    if (key.length > 120 || typeof value !== "string" || value.length > 2_000) return NextResponse.json({ error: "Invalid website copy" }, { status: 400 });
    copy[key] = value;
  }
  const treatments: ContentOverrides["treatments"] = {};
  if (input.treatments !== undefined && !isRecord(input.treatments)) return NextResponse.json({ error: "Invalid treatments" }, { status: 400 });
  const treatmentFields = new Set(["name", "intro", "duration", "downtime", "price"]);
  for (const [key, value] of Object.entries((input.treatments as Record<string, unknown> | undefined) ?? {})) {
    if (key.length > 120 || !isRecord(value)) return NextResponse.json({ error: "Invalid treatments" }, { status: 400 });
    const item: Record<string, string | number> = {};
    for (const [field, fieldValue] of Object.entries(value)) {
      if (!treatmentFields.has(field) || (field === "price" ? typeof fieldValue !== "number" || !Number.isFinite(fieldValue) || fieldValue < 0 || fieldValue > 100_000 : typeof fieldValue !== "string" || fieldValue.length > 2_000)) return NextResponse.json({ error: "Invalid treatment value" }, { status: 400 });
      item[field] = fieldValue as string | number;
    }
    treatments[key] = item;
  }
  const pricing: ContentOverrides["pricing"] = {};
  if (input.pricing !== undefined && !isRecord(input.pricing)) return NextResponse.json({ error: "Invalid pricing" }, { status: 400 });
  const pricingFields = new Set(["name", "price", "duration"]);
  for (const [key, value] of Object.entries((input.pricing as Record<string, unknown> | undefined) ?? {})) {
    if (key.length > 160 || !isRecord(value)) return NextResponse.json({ error: "Invalid pricing" }, { status: 400 });
    const item: Record<string, string | number> = {};
    for (const [field, fieldValue] of Object.entries(value)) {
      if (!pricingFields.has(field) || (field === "price" ? typeof fieldValue !== "number" || !Number.isFinite(fieldValue) || fieldValue < 0 || fieldValue > 100_000 : typeof fieldValue !== "string" || fieldValue.length > 500)) return NextResponse.json({ error: "Invalid pricing value" }, { status: 400 });
      item[field] = fieldValue as string | number;
    }
    pricing[key] = item;
  }
  const clinic = isRecord(input.clinic) ? input.clinic : {};
  const contactEmail = typeof clinic.contactEmail === "string" ? clinic.contactEmail.trim().toLowerCase().slice(0, 160) : "";
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) return NextResponse.json({ error: "Enter a valid clinic email address." }, { status: 400 });
  const content = await saveContentOverrides({ copy, treatments, pricing, clinic: { contactEmail } });
  return NextResponse.json({ content, persistent: contentStoreConfigured() });
}
