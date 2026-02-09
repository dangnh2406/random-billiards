import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Billiards FPT",
  description: "ramdom-billiards ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
    </html>
  );
}
