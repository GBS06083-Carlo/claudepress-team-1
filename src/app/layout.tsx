import type { Metadata } from "next";
import { Source_Serif_4, Titillium_Web } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-titillium",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "ClaudePress",
  description: "Un blog con il suo CMS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="it"
      className={`${titillium.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <header className="border-b border-rule">
          <div className="mx-auto flex max-w-2xl items-baseline justify-between px-4 py-5 sm:px-6">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              ClaudePress
            </Link>
            <nav className="flex gap-6 text-[0.9375rem] font-semibold text-muted">
              <Link
                href="/"
                className="hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Blog
              </Link>
              <Link
                href="/admin/posts"
                className="hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                Backoffice
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6">
          {children}
        </main>
      </body>
    </html>
  );
}
