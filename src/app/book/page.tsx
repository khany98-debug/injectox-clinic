import type { Metadata } from "next";
import { BookingFlow } from "@/components/booking-flow";
import { PageHero } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book Online",
  description: "Choose an Injectox Clinic treatment, preferred appointment and contact details in one beautifully simple on-site booking journey.",
};

export default async function BookPage({ searchParams }: PageProps<"/book">) {
  const query = await searchParams;
  const initialService = Array.isArray(query.service) ? query.service[0] : query.service;
  const b = pages.book;

  return (
    <>
      <PageHero
        eyebrow={b.heroEyebrow}
        eyebrowPath="pages.book.heroEyebrow"
        title={<><EditableText as="span" path="pages.book.heroTitleLine1" value={b.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.book.heroTitleLine2" value={b.heroTitleLine2} /></em></>}
        copy={b.heroCopy}
        copyPath="pages.book.heroCopy"
        index="11"
        compact
      />
      <section id="booking-studio" className="booking-studio-section shell">
        <BookingFlow initialService={initialService} />
      </section>
    </>
  );
}
