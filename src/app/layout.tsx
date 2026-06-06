import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Resizer - Zero Click Resize",
  description: "Intelligently resize images without quality compromise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-neutral-950 text-neutral-100 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Smart Resizer
            </h1>
            <nav className="text-sm font-medium text-neutral-400">
              Zero-Click Perfection
            </nav>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-neutral-900 text-center text-sm text-neutral-500 flex flex-col sm:flex-row items-center justify-center gap-1">
          <span>&copy; {new Date().getFullYear()} Smart Resizer. Powered by Browser AI.</span>
          <span className="hidden sm:inline"> | </span>
          <span>
            Built by{" "}
            <a 
              href="https://github.com/bs-bhadauria" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Bhoopendra Singh Bhadauria
            </a>
          </span>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
