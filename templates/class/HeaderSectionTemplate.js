import { HoBomHTMLParserBase } from "../../src/core/hobomHtmlParserBase.js";

// Heade Section Template
export class HeaderSectionTemplateParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "TEMPLATE";
    this.templateName = "HeaderSectionTemplate";
    this.templateNode = this.matchNode("HeaderSectionTemplate");

    this.initialize([HeaderSectionGroupParser]);
  }
}

export class HeaderSectionGroupParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "GROUP";
    this.templateName = "HeaderSectionGroup";
    this.templateNode = this.matchNode("HeaderSectionGroup");
  }
}

// Header Main Template
export class HeaderMainTemplateParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "TEMPLATE";
    this.templateName = "HeaderMainTemplate";
    this.templateNode = this.matchNode("HeaderMainTemplate");

    this.initialize([
      HeaderMainGroupParser,
      HeaderMainTextListParser,
      HeaderMainButtonItemParser,
    ]);
  }
}

export class HeaderMainGroupParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "GROUP";
    this.templateName = "HeaderMainGroup";
    this.templateNode = this.matchNode("HeaderMainGroup");
  }
}

export class HeaderMainTextListParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "LIST";
    this.templateName = "HeaderMainTextList";
    this.templateNode = this.matchNode("HeaderMainTextList");
  }
}

export class HeaderMainButtonItemParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "ITEM";
    this.templateName = "HeaderMainButtonItem";
    this.templateNode = this.matchNode("HeaderMainButtonItem");

    this.templateNode.on("click", () => {
      window.open("https://hbtb.vercel.app/");
    });
  }
}
