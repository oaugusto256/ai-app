const { Translator } = require("./Translator");

async function translate(textEng) {
  return Translator.translate(textEng);
}

exports.translate = translate;
