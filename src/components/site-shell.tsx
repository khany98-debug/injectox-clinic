"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { NewsletterPopup } from "@/components/newsletter-popup";
import { CookieBanner } from "@/components/cookie-banner";
import { StickyBook } from "@/components/ui";
import { WhatsAppChat } from "@/components/whatsapp-chat";
import { SiteContentProvider } from "@/components/site-content-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <SiteContentProvider>
      {!isAdmin && <SiteHeader />}
      <main id="main">{children}</main>
      {!isAdmin && (
        <>
          <SiteFooter />
          <StickyBook />
          <WhatsAppChat />
          <CookieBanner />
          <NewsletterPopup />
        </>
      )}
    </SiteContentProvider>
  );
}
