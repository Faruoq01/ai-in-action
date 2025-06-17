import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { ReduxProviders } from "./lib/providers/provider";
import { ToasterProvider } from "./lib/providers/toast";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Health Consultant",
  description: "Smart medical advisory system",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${jost.variable} antialiased`}
      >
        <ReduxProviders>
          <ToasterProvider />
          {children}
        </ReduxProviders>
      </body>
    </html>
  );
}
