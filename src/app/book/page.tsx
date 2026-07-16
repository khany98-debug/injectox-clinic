import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Book Online",
  description: "Choose an Injectox Clinic treatment, preferred appointment and contact details in one beautifully simple on-site booking journey.",
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const query = await searchParams;
  const initialService = Array.isArray(query.service) ? query.service[0] : query.service;

  return (
    <>
      <PageHero
        eyebrow="Book directly with Injectox"
        title={<>Your next appointment.<br /><em>Beautifully simple.</em></>}
        copy="Explore the full treatment menu, choose a preferred time and keep the whole journey inside Injectox."
        index="11"
        compact
      />
      <section id="booking-studio" className="booking-studio-section shell">
        <BookingFlow initialService={initialService} />
      </section>
    </>
  );
}
