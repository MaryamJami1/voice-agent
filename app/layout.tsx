import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live AI Dashboard",
  description: "Voice AI agent session monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
