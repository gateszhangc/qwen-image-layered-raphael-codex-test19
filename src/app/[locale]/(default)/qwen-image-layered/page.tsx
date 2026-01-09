import { Metadata } from "next";
import QwenImageLayered from "@/components/qwen-image-layered";
import QwenImageLayeredHero from "@/components/qwen-image-layered/hero";

export const metadata: Metadata = {
  title: "Qwen-Image-Layered - AI图像生成器",
  description:
    "使用Qwen-Image-Layered AI模型生成高质量图像，支持图像分层处理与多图输出",
  keywords: [
    "AI图像生成",
    "图像分层",
    "Qwen-Image-Layered",
    "人工智能",
    "图像创作",
  ],
  openGraph: {
    title: "Qwen-Image-Layered - AI图像生成器",
    description:
      "使用Qwen-Image-Layered AI模型生成高质量图像，支持图像分层处理与多图输出",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qwen-Image-Layered - AI图像生成器",
    description:
      "使用Qwen-Image-Layered AI模型生成高质量图像，支持图像分层处理与多图输出",
  },
};

export default function QwenImageLayeredPage() {
  return (
    <div className="min-h-screen bg-background">
      <QwenImageLayeredHero />
      <section id="qwen-image-layered" className="scroll-mt-24 py-12">
        <div className="container">
          <QwenImageLayered />
        </div>
      </section>
    </div>
  );
}
