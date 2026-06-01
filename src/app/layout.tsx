import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Workshere | Discover Career Platforms",
  description: "Discover the best platforms for internships, jobs, freelancing, remote work, startup hiring, and international opportunities in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-bg-dark text-zinc-100 flex flex-col relative overflow-x-hidden">
        {/* Ambient background glows */}
        <div className="glow-blob bg-primary w-[500px] h-[500px] top-[-10%] left-[-10%]"></div>
        <div className="glow-blob bg-accent w-[600px] h-[600px] bottom-[-20%] right-[-10%]"></div>
        <div className="glow-blob bg-violet-600 w-[400px] h-[400px] top-[40%] left-[60%]"></div>
        
        <main className="flex-1 flex flex-col z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
