import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Portafolio | Ingeniero de Sistemas",
  description: "Desarrollador Full Stack especializado en crear soluciones tecnológicas que transforman problemas complejos en sistemas elegantes",
  keywords: ["Ingeniero de Sistemas", "Desarrollador Full Stack", "React", "Next.js", "Node.js", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
