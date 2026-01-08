import { Metadata } from "next";
import MyCreations from "@/components/nano-banana-pro/my-creations";

export const metadata: Metadata = {
  title: "我的创作 - Nano Banana Pro",
  description: "查看和管理您使用Nano Banana Pro生成的AI图像作品集",
  keywords: ["AI图像", "我的创作", "图像管理", "Nano Banana Pro", "作品集"],
  openGraph: {
    title: "我的创作 - Nano Banana Pro",
    description: "查看和管理您使用Nano Banana Pro生成的AI图像作品集",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "我的创作 - Nano Banana Pro",
    description: "查看和管理您使用Nano Banana Pro生成的AI图像作品集",
  },
};

export default function MyCreationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <MyCreations />
      </div>
    </div>
  );
}