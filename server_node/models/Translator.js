class Translator {
  static translator = null;

  static async getTranslator() {
    if (this.translator === null) {
      const { pipeline } = await import("@huggingface/transformers");
      this.translator = await pipeline("translation", "Xenova/nllb-200-distilled-600M", {
        dtype: "q8",
      });
    }
    return this.translator;
  }

  static async translate(textEng) {
    return this.getTranslator()
      .then((translator) => translator(textEng, { src_lang: "eng_Latn", tgt_lang: "por_Latn" }))
      .then((result) => result[0].translation_text)
      .catch((err) => {
        console.error("Translation error:", err);
        return "Translation failed.";
      });
  }
}

exports.Translator = Translator;
