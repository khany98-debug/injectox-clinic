import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <LegalPage title="Privacy" intro="A launch-ready framework that must be reviewed against the final hosting, analytics, contact and booking setup." sections={[
  { title: "Information collected", copy: "The final site may collect information you actively provide through enquiries, along with limited technical data needed for security, analytics and site operation." },
  { title: "External booking", copy: "Appointments are completed through Faces. Information entered there is processed under that provider’s own privacy terms and not by this website." },
  { title: "How information is used", copy: "Information should only be used to respond to enquiries, administer services, meet legal obligations and improve the experience where consent or another lawful basis applies." },
  { title: "Your rights", copy: "UK data-protection rights may include access, correction, erasure, restriction, objection and portability. Add the clinic’s verified privacy contact before launch." },
]} />; }
