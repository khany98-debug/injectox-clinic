import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
export const metadata: Metadata = { title: "Privacy Policy" };
export default function PrivacyPage() { return <LegalPage title="Privacy" intro="This policy explains how Injectox Clinic handles website information. It must be completed with the clinic’s legal business name, privacy contact and ICO registration position before launch." sections={[
  { title: "Information collected", copy: "We collect information you choose to provide through booking, review and newsletter forms, plus limited technical information needed to secure and operate the site. Do not submit medical information through the website unless the clinic specifically asks for it through an appropriate secure process." },
  { title: "Booking and treatment information", copy: "Appointments are completed through Faces. Information entered in Faces is processed under that provider’s privacy terms and the clinic’s patient-record procedures. Online booking does not replace a clinical consultation or medical assessment." },
  { title: "Email marketing", copy: "We only send marketing emails where you actively opt in. You can unsubscribe at any time using the link in an email or by contacting the clinic. Consent time and source may be recorded to demonstrate compliance." },
  { title: "How information is used", copy: "Information is used to respond to requests, administer appointments, send opted-in marketing, meet legal obligations and protect the website from fraud and abuse. We do not sell personal data." },
  { title: "Retention and sharing", copy: "Website submissions are retained only for as long as needed for the purpose collected or to meet legal obligations. Service providers such as hosting, email, payments, booking and maps may process information under their own terms and data-processing arrangements." },
  { title: "Your rights", copy: "Under UK data-protection law, you may have rights to access, correction, erasure, restriction, objection and portability. Add the clinic’s verified privacy email/address and ICO registration details here before launch." },
]} />; }
