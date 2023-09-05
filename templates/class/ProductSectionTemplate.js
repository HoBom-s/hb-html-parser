import { HoBomHTMLParserBase } from "../../src/core/hobomHtmlParserBase.js";

export class ProductSectionTemplateParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "TEMPLATE";
    this.templateName = "ProductSectionTemplate";
    this.templateNode = this.matchNode("ProductSectionTemplate");
  }
}

export class ProductSectionGroupParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "GROUP";
    this.templateName = "ProductSectionGroup";
    this.templateNode = this.matchNode("ProductSectionGroup");
  }
}

export class ProductSectionListParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "null";
    this.templateName = "ProductSectionList";
    this.templateNode = this.matchNode("ProductSectionList");
  }
}
