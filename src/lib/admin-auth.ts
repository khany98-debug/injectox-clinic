import "server-only";

export const ADMIN_COOKIE = "injectox_admin";

export async function adminToken(password: string) {
  const bytes = new TextEncoder().encode(`injectox-admin:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
