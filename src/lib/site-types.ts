import type { PriceGroup, Treatment } from "@/lib/content";

export type ReviewSubmission = {
  id: string;
  name: string;
  treatment: string;
  review: string;
  rating: number;
  consent: boolean;
  status: "pending" | "approved" | "dismissed";
  createdAt: string;
};

export type ContentOverrides = {
  copy: Record<string, string>;
  treatments: Record<string, Partial<Pick<Treatment, "name" | "intro" | "price" | "duration" | "downtime">>>;
  pricing: Record<string, Partial<Pick<PriceGroup["items"][number], "name" | "price" | "duration">>>;
};
