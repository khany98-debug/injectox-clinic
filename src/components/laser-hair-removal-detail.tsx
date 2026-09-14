import Image from "next/image";
import { BookingSteps, Button, FinalCTA } from "@/components/ui";
import { Reveal } from "@/components/motion";
import { booking } from "@/lib/content";

const courses = [
  ["Full body", "6-session course", "£1,050"],
  ["Underarms + Hollywood", "7-session course", "£570"],
  ["Large area", "7-session course", "£540"],
  ["Medium area", "7-session course", "£270"],
  ["Small area", "7-session course", "£150"],
] as const;

export function LaserHairRemovalDetail() {
  return <>
    <section className="treatment-detail-hero laser-detail-hero">
      <Reveal className="treatment-detail-copy"><span className="eyebrow">Laser hair removal · Salford</span><h1>Laser hair<br /><em>removal.</em></h1><p>Smooth skin without the constant shaving and waxing. Every course at Injectox starts with a patch test and a consultation, so your treatment is planned around your skin and your hair.</p><div className="button-row"><Button href={booking.currentDiary} external>Book a patch test</Button><Button href="/pricing" variant="line">View laser pricing</Button></div></Reveal>
      <div className="treatment-detail-image"><Image src="/images/dropbox/client-labelled/laser-hair-removal-main.jpg" alt="Laser hair removal treatment at Injectox Clinic" fill priority sizes="(max-width: 760px) 100vw, 50vw" /></div>
    </section>
    <div className="glance"><div><small>Starts with</small><b>Patch test</b></div><div><small>Consultation</small><b>Required</b></div><div><small>Sessions</small><b>6–8 per course</b></div><div><small>Small areas</small><b>About 5 mins</b></div><div><small>Underarms & Hollywood</small><b>About 30 mins</b></div></div>
    <section className="treatment-body shell laser-detail-body"><aside><span className="eyebrow">A considered course</span><h2>Planned around <em>your skin.</em></h2><p>Results and the number of sessions vary. A patch test and consultation are required before treatment.</p><Button href={booking.currentDiary} external>Book a patch test</Button></aside><div className="treatment-content">
      <section><span className="eyebrow">How a course works</span><h2>Consistency makes the difference.</h2><p>A course is usually 6–8 sessions, spaced a few weeks apart. Hair grows in cycles, and each session treats the hairs that are actively growing, which is why it takes a course rather than a single visit.</p><p>Sessions are quick: around five minutes for small areas, and around 30 minutes for underarms and Hollywood.</p></section>
      <section><span className="eyebrow">Why autumn is the time to start</span><h2>Give your course time.</h2><p>Treated skin needs protecting from the sun, so autumn and winter are the best months to begin. Starting now usually means finishing your course by spring.</p></section>
      <section><span className="eyebrow">Courses</span><h2>Choose your area.</h2><div className="laser-course-list">{courses.map(([area, sessions, price]) => <div key={area}><span><b>{area}</b><small>{sessions}</small></span><strong>{price}</strong></div>)}</div><p className="laser-note">Single sessions are also available. See the full price list for options.</p></section>
      <section><span className="eyebrow">Before your session</span><h2>Patch test first.</h2><p>Your patch test and consultation give us the chance to check suitability, explain preparation and plan your course around your skin and hair. We’ll confirm the right timing for your first session at that appointment.</p></section>
      <section><span className="eyebrow">Questions</span><h2>Good to know.</h2><div className="faq-list"><details open><summary>Can I have laser if I have a tan?<i>+</i></summary><p>Not on recently tanned skin. We’ll talk it through at your patch test.</p></details><details><summary>How many sessions will I need?<i>+</i></summary><p>Courses are usually 6–8 sessions. Results and the number of sessions vary, and your plan is confirmed at consultation.</p></details><details><summary>Do I need a patch test?<i>+</i></summary><p>Yes. Every course starts with a patch test and consultation.</p></details></div></section>
      <section className="laser-disclaimer"><p><b>18+ only.</b> Permanent hair reduction: results and the number of sessions vary. Patch test and consultation required.</p></section>
    </div></section>
    <section className="section shell"><BookingSteps /></section><FinalCTA />
  </>;
}
