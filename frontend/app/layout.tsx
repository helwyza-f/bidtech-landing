import type { Metadata } from "next";
import Script from "next/script";
import { Space_Grotesk, Sora } from "next/font/google";

import { DiagnosticBanner } from "@/components/diagnostic-banner";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { LanguageProvider } from "@/lib/i18n";

import "./globals.css";

// TEMPORARY diagnostic script — plain JS, no framework dependency, runs
// before the app bundle. If React never hydrates (crash, blocked script,
// old-browser incompatibility, etc.) this shows a visible red/yellow banner
// with the actual error and browser info instead of failing silently.
// Safe to delete this whole script + <DiagnosticBanner /> once resolved.
const DIAGNOSTIC_SCRIPT = `
(function () {
  function showBanner(bg, title, detail) {
    if (document.getElementById('__diag_banner')) return;
    var el = document.createElement('div');
    el.id = '__diag_banner';
    el.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:999999;background:' + bg + ';color:#000;font:12px/1.4 monospace;padding:10px;white-space:pre-wrap;word-break:break-word;';
    el.textContent = title + '\\n' + detail;
    document.body.appendChild(el);
  }
  window.addEventListener('error', function (e) {
    showBanner('#ff4d4d', 'JS ERROR: ' + (e.message || 'unknown'), (e.filename || '') + ':' + (e.lineno || '') + ':' + (e.colno || '') + '\\n' + navigator.userAgent);
  });
  window.addEventListener('unhandledrejection', function (e) {
    var reason = e.reason && (e.reason.message || e.reason.toString()) || 'unknown';
    showBanner('#ff4d4d', 'PROMISE REJECTION: ' + reason, navigator.userAgent);
  });
  setTimeout(function () {
    if (document.documentElement.dataset.hydrated !== '1') {
      showBanner('#ffd24d', 'JS DID NOT HYDRATE within 5s (no error thrown)', navigator.userAgent);
    }
  }, 5000);
})();
`;

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BidTech | Business Innovative Digital Solutions",
  description:
    "BidTech is a software house focused on web, mobile, cloud, and scalable digital product delivery for modern businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script id="diagnostic-bootstrap" strategy="beforeInteractive">
          {DIAGNOSTIC_SCRIPT}
        </Script>
      </head>
      <body className={`${spaceGrotesk.variable} ${sora.variable} bg-[#050505] font-[family-name:var(--font-space-grotesk)] text-white antialiased`}>
        <DiagnosticBanner />
        <LanguageProvider>{children}</LanguageProvider>
        <WhatsAppFloat />
      </body>
    </html>
  );
}
