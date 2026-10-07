import {
  ALLOWED_FILE_TYPES,
  MAX_FILE_BYTES,
  type UploadedFile,
} from "@/lib/submission";

const MAX_IMAGE_SIDE = 1600;
const JPEG_QUALITIES = [0.75, 0.6, 0.45];

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.slice(result.indexOf(",") + 1));
    };
    reader.readAsDataURL(blob);
  });
}

function canvasToJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("toBlob"))),
      "image/jpeg",
      quality,
    );
  });
}

async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  let blob = await canvasToJpeg(canvas, JPEG_QUALITIES[0]);
  for (const quality of JPEG_QUALITIES.slice(1)) {
    if (blob.size <= MAX_FILE_BYTES) break;
    blob = await canvasToJpeg(canvas, quality);
  }
  return blob;
}

export type PreparedFile = { file?: UploadedFile; error?: string };

/** Réduit une photo (ou accepte tel quel un petit fichier) avant l'envoi. */
export async function prepareFileForUpload(file: File): Promise<PreparedFile> {
  const isImage = file.type.startsWith("image/");

  if (!isImage && !ALLOWED_FILE_TYPES[file.type]) {
    return { error: "Type de fichier non accepté (photo, PDF, CSV ou Excel)." };
  }

  try {
    const blob = isImage ? await compressImage(file) : file;
    if (blob.size > MAX_FILE_BYTES) {
      return { error: "Fichier trop volumineux (2 Mo maximum)." };
    }
    return {
      file: {
        name: isImage ? file.name.replace(/\.\w+$/, "") + ".jpg" : file.name,
        type: isImage ? "image/jpeg" : file.type,
        data: await blobToBase64(blob),
      },
    };
  } catch {
    return { error: "Impossible de lire ce fichier. Essayez une autre photo." };
  }
}
