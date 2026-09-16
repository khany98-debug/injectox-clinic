import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { booking } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ title: "Book Online", description: "Book Injectox Clinic treatments securely through Faces.", path: "/book", index: false });

export default function BookPage() {
  redirect(booking.currentDiary);
}
