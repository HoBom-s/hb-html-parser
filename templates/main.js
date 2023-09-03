import { HoBomHTMLParserBase } from "../src/core/hobomHtmlParserBase.js";

const parser = new HoBomHTMLParserBase();

console.log(parser.$$("#root").on("click", () => alert("AA")));
