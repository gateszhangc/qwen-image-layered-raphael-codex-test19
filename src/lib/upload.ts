import { createLogger } from "@/lib/logger";

const DEFAULT_ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/jpg",
];

export const MAX_IMAGE_SIZE = Infinity; // No size limit
export const VALID_IMAGE_TYPES = DEFAULT_ALLOWED_TYPES;

const log = createLogger("upload");

export function validateImageFile(
  file: File,
  opts?: { allowedTypes?: string[]; maxSize?: number }
): string | null {
  const allowed = opts?.allowedTypes || DEFAULT_ALLOWED_TYPES;

  if (!allowed.includes(file.type)) {
    log.warn({ type: file.type, size: file.size }, "upload: invalid file type");
    return "Unsupported file type. Use JPG, PNG, WebP, or GIF.";
  }
  // No size limit check - all file sizes are allowed
  return null;
}

export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export async function uploadImageFile(
  file: File,
  opts?: { type?: string; allowedTypes?: string[]; maxSize?: number }
): Promise<{ url: string; base64: string }> {
  const error = validateImageFile(file, opts);
  if (error) {
    throw new Error(error);
  }

  log.info(
    { name: file.name, size: file.size, type: file.type, category: opts?.type },
    "upload: start"
  );

  const base64 = await fileToBase64(file);

  const resp = await fetch("/api/upload-image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      image: base64,
      type: opts?.type || "image",
    }),
  });

  log.info({ name: file.name, status: resp.status }, "upload: response");

  const data = await resp.json();
  if (data.code !== 0) {
    log.error(
      { name: file.name, code: data.code, message: data.message },
      "upload: failed"
    );
    throw new Error(data.message || "Upload failed");
  }

  log.info({ name: file.name, url: data.data.url }, "upload: success");
  return { url: data.data.url as string, base64 };
}
