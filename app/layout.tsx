import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Billiards FPT",
  description: "ramdom-billiards ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
