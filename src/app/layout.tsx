import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name} — ${site.title}`,
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}