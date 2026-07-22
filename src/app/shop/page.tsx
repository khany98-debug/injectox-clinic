import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Shop — Coming Soon", description: "A future curated edit of Injectox Clinic skincare and aftercare." };
export default function ShopPage() {
  const s = pages.shop;
  return <section className="coming-soon shell">
    <div>
      <span className="eyebrow"><EditableText path="pages.shop.eyebrow" value={s.eyebrow} /></span>
      <h1><EditableText as="span" path="pages.shop.titleLine1" value={s.titleLine1} /><br /><em><EditableText as="span" path="pages.shop.titleLine2" value={s.titleLine2} /></em></h1>
      <p><EditableText path="pages.shop.copy" value={s.copy} /></p>
      <Button href="/treatments" textPath="pages.shop.exploreTreatmentsBtn" textValue={s.exploreTreatmentsBtn} />
    </div>
  </section>;
}
