import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { booking } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Online",
  description: "Book Injectox Clinic treatments securely through Faces.",
};

export default function BookPage() {
  redirect(booking.currentDiary);
}
