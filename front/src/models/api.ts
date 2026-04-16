import { ImageCaptioner } from "./ImageCaptioner";

export async function generateCaption(imgSrc: string): Promise<string> {
  ImageCaptioner.getCaptioner();
  return ImageCaptioner.generateCaption(imgSrc);
}

export async function translateCaption(caption: string): Promise<string> {
  const res = await fetch("http://localhost:3000/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: caption }),
  });
  const data = await res.json();
  console.log(data);
  return data["translated_text"];
}
