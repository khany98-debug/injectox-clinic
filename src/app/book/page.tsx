import type { Metadata } from "next";
import { BookingSteps, Button, PageHero, PricingTable } from "@/components/ui";
import { booking } from "@/lib/content";

export const metadata: Metadata = { title: "Book", description: "Book an Injectox Clinic consultation or treatment through the live Faces appointment diary." };
export default function BookPage() { return <><PageHero eyebrow="Your next appointment" title={<>A beautiful plan<br /><em>starts here.</em></>} copy="Choose a free consultation or open the live diary to book a treatment. Prices and availability are managed centrally through Faces." index="11" /><section className="inner-section shell"><BookingSteps /><div className="button-row" style={{ margin: "50px 0 90px" }}><Button href={booking.consultation} external>Book free consultation</Button><Button href={booking.treatment} variant="line" external>Book a treatment</Button></div><PricingTable compact /></section></>; }
