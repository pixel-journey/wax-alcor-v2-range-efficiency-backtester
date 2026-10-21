import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A fee product, not a backtest",
  description: "10000 principal, 30 bps, and 100 of 400 seconds truncates to 7. The in-range share alone is a different repo. No pool is read.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
