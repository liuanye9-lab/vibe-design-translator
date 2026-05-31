import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Design Translator - AI Design Decision SaaS",
  description: "Translate vague visual taste into executable frontend prompts for Codex, Claude Code, Gemini, and WorkBuddy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}