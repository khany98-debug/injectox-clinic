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
  const body = await request.json() as { content?: ContentOverrides };
  if (JSON.stringify(body).length > 500_000) return NextResponse.json({ error: "Content is too large" }, { status: 413 });
  if (!body.content || typeof body.content !== "object") return NextResponse.json({ error: "Content is required" }, { status: 400 });
  const clinic = body.content.clinic && typeof body.content.clinic === "object" ? body.content.clinic : {};
  const contactEmail = typeof clinic.contactEmail === "string" ? clinic.contactEmail.trim().toLowerCase().slice(0, 160) : "";
  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) return NextResponse.json({ error: "Enter a valid clinic email address." }, { status: 400 });
  const content = await saveContentOverrides({ copy: body.content.copy ?? {}, treatments: body.content.treatments ?? {}, pricing: body.content.pricing ?? {}, clinic: { contactEmail } });
  return NextResponse.json({ content, persistent: contentStoreConfigured() });
}
