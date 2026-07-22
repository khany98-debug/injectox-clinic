import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery-grid";
import { FinalCTA, PageHero, ResultFilmPanel } from "@/components/ui";
import { EditableText } from "@/components/dev/editable-text";
import { pages } from "@/lib/content";

export const metadata: Metadata = { title: "Client Results", description: "Explore genuine Injectox Clinic client lip and skin treatment results in Salford." };
export default function GalleryPage() {
  const g = pages.gallery;
  return (
    <>
      <PageHero
        eyebrow={g.heroEyebrow}
        eyebrowPath="pages.gallery.heroEyebrow"
        title={<><EditableText as="span" path="pages.gallery.heroTitleLine1" value={g.heroTitleLine1} /><br /><em><EditableText as="span" path="pages.gallery.heroTitleLine2" value={g.heroTitleLine2} /></em></>}
        copy={g.heroCopy}
        copyPath="pages.gallery.heroCopy"
        index="06"
      />
      <section className="results-intro shell">
        <span className="eyebrow"><EditableText path="pages.gallery.introEyebrow" value={g.introEyebrow} /></span>
        <h2><EditableText as="span" path="pages.gallery.introTitleLine1" value={g.introTitleLine1} /><br /><em><EditableText as="span" path="pages.gallery.introTitleLine2" value={g.introTitleLine2} /></em></h2>
        <p><EditableText path="pages.gallery.introCopy" value={g.introCopy} /></p>
      </section>
      <section className="results-gallery"><GalleryGrid source="results" mobileLoop includeFilms /></section>
      <ResultFilmPanel />
      <FinalCTA />
    </>
  );
}
