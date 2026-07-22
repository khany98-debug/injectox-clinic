import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const DATA_FILE = path.join(process.cwd(), "src/lib/content.data.json");

function resolveParent(data: unknown, keys: (string | number)[]): Record<string | number, unknown> | undefined {
  let target = data;
  for (const key of keys) {
    if (target === null || typeof target !== "object") return undefined;
    target = (target as Record<string | number, unknown>)[key];
  }
  return target as Record<string | number, unknown> | undefined;
}

export async function POST(request: NextRequest) {
  // This route edits real files on disk, so it only ever runs in local dev.
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Editing is only available in development." }, { status: 403 });
  }

  const body = await request.json().catch(() => null);
  const fieldPath = body?.path;
  const value = body?.value;
  if (typeof fieldPath !== "string" || typeof value !== "string" || fieldPath.length === 0) {
    return NextResponse.json({ error: "Expected { path: string, value: string }." }, { status: 400 });
  }

  const keys = fieldPath.split(".").map((k) => (/^\d+$/.test(k) ? Number(k) : k));
  const lastKey = keys[keys.length - 1];

  const raw = await fs.readFile(DATA_FILE, "utf-8");
  const data = JSON.parse(raw);

  const parent = resolveParent(data, keys.slice(0, -1));
  if (!parent || typeof parent !== "object" || !(lastKey in parent)) {
    return NextResponse.json({ error: `Unknown field path: ${fieldPath}` }, { status: 400 });
  }
  if (typeof parent[lastKey] !== "string") {
    return NextResponse.json({ error: `Field at "${fieldPath}" isn't editable text.` }, { status: 400 });
  }

  parent[lastKey] = value;
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2) + "\n", "utf-8");

  return NextResponse.json({ ok: true });
}
