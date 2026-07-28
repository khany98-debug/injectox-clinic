import { MessageCircle } from "lucide-react";
import { booking } from "@/lib/content";

export function WhatsAppChat() {
  return (
    <a
      className="whatsapp-chat"
      href={booking.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Injectox Clinic on WhatsApp"
    >
      <span className="whatsapp-chat-label">Chat with us</span>
      <MessageCircle aria-hidden="true" strokeWidth={2.1} />
    </a>
  );
}
