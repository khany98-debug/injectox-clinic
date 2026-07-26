import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Website Terms" };
export default function TermsPage() { return <LegalPage title="Website terms" intro="Plain-language website terms, separate from the treatment and booking terms shown by the appointment provider." sections={[
  { title: "Information, not diagnosis", copy: "Website content is general information and does not replace an in-person consultation, diagnosis or medical advice." },
  { title: "Treatment suitability", copy: "Prices, durations and treatment information may change. Treatment proceeds only after assessment and is never guaranteed by an online booking." },
  { title: "Medical emergencies", copy: "The website is not monitored for urgent clinical concerns. In an emergency, contact 999 or the appropriate urgent-care service. For treatment aftercare, use the clinic’s approved contact route." },
  { title: "Results", copy: "Images and client stories illustrate individual experiences. Results, longevity, recovery and side effects vary from person to person." },
  { title: "External services", copy: "Links to booking, finance, maps and social platforms are provided for convenience and are governed by those providers’ terms." },
]} />; }
