import { ImageCaptioner } from './ImageCaptioner'

export async function generateCaption(imgSrc: string): Promise<string> {
  ImageCaptioner.getCaptioner();
  return ImageCaptioner.generateCaption(imgSrc);
}
