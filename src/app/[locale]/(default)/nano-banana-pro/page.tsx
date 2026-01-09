import { Metadata } from "next";
import NanoBananaPro from "@/components/nano-banana-pro";

export const metadata: Metadata = {
  title: "Nano Banana Pro - AI图像生成器",
  description: "使用Nano Banana Pro AI模型生成高质量图像，支持文本到图像和图像到图像两种模式",
  keywords: ["AI图像生成", "文本到图像", "图像到图像", "Nano Banana Pro", "人工智能", "图像创作"],
  openGraph: {
    title: "Nano Banana Pro - AI图像生成器",
    description: "使用Nano Banana Pro AI模型生成高质量图像，支持文本到图像和图像到图像两种模式",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Banana Pro - AI图像生成器",
    description: "使用Nano Banana Pro AI模型生成高质量图像，支持文本到图像和图像到图像两种模式",
  },
};

export default function NanoBananaProPage() {
  return (
    <div className="min-h-screen bg-background">
      <NanoBananaPro />
    </div>
  );
}