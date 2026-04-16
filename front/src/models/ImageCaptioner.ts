import { pipeline, env, type ImageToTextPipeline } from "@huggingface/transformers";

env.accessToken = import.meta.env.VITE_HF_TOKEN;

export class ImageCaptioner {
  static captioner = null as ImageToTextPipeline | null;

  static getCaptioner = async () => {
    if (this.captioner === null) {
      console.log("Loading model...");
      this.captioner = await pipeline("image-to-text", "Xenova/vit-gpt2-image-captioning", {
        dtype: "q8",
      });
      console.log("Model loaded.");
    }

    return this.captioner;
  };

  static generateCaption = async (image: File) => {
    return this.getCaptioner().then((captioner) =>
      captioner(image, { do_sample: true }).then((result) => result[0].generated_text),
    );
  };
}
