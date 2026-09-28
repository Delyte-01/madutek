import type { Metadata } from "next";
import { clashGrotesk, generalSans } from "./font";
import "./globals.css";
import SmoothScroll from "@/components/lenis";
import { Navbar } from "@/components/navigation";

export const metadata: Metadata = {
  title: "MaduTek",
  description: "Tech Solutions Redefined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${generalSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
