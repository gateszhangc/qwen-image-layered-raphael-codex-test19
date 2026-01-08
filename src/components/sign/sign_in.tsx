"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Button
      variant="default"
      onClick={() => router.push("/auth/signin")}
      className="cursor-pointer"
    >
      {t("user.sign_in")}
    </Button>
  );
}
