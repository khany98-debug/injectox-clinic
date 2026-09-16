import type { Metadata } from "next";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <section className="coming-soon shell"><div><span className="eyebrow">404</span><h1>That page<br /><em>has moved.</em></h1><p>Try the treatment edit or return to the Injectox Clinic home page.</p><div className="button-row"><Button href="/">Back home</Button><Button href="/treatments" variant="line">View treatments</Button></div></div></section>;
}
