import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Legal AI Analyzer \u2014 Contract Review & Risk Detection",
  description:
    "AI-powered contract review platform for legal professionals. Extract clauses, assess risk, and check compliance in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-lg font-bold text-white">
                L
              </span>
              <div>
                <h1 className="text-lg font-bold tracking-tight text-ink">Legal AI Analyzer</h1>
                <p className="text-xs text-gray-500">Contract Review &amp; Risk Detection</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium text-gray-600">
              <span>Dashboard</span>
              <span className="text-gray-300">|</span>
              <span>Contracts</span>
              <span className="text-gray-300">|</span>
              <span>Compliance</span>
              <span className="text-gray-300">|</span>
              <span>Settings</span>
            </div>
          </div>
        </nav>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
