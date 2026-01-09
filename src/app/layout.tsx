import type { Metadata, Viewport } from "next";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ahmedabdelaziz.com"),
  title: "Ahmed Abdelaziz | Software Engineer",
  description:
    "Personal portfolio of Ahmed Abdelaziz - Software Engineer specializing in web development",
  keywords: [
    "Ahmed Abdelaziz",
    "Software Engineer",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "Ahmed Abdelaziz" }],
  openGraph: {
    title: "Ahmed Abdelaziz | Software Engineer",
    description: "Personal portfolio of Ahmed Abdelaziz",
    type: "website",
    locale: "en_US",
    images: ["/images/Portfolio_Thumbnail.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abdelaziz | Software Engineer",
    description: "Personal portfolio of Ahmed Abdelaziz",
    images: ["/images/Portfolio_Thumbnail.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7ECDE" },
    { media: "(prefers-color-scheme: dark)", color: "#11223E" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased">
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
        </LazyMotion>
      </body>
    </html>
  );
}
