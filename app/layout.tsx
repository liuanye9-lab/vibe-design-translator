import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vibe Design Translator - AI 设计素材推荐专家",
  description: "用 Agent 对话筛选动效、配色、UI、布局和字体素材，并生成可执行的前端设计方向。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
