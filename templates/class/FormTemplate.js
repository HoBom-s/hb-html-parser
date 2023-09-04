import { HoBomHTMLParserBase } from "../../src/core/hobomHtmlParserBase.js";

export class FormTemplateParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "TEMPLATE";
    this.templateName = "FormTemplate";
    this.templateNode = this.matchNode("FormTemplate");

    this.initialize([
      FormGroupParser,
      InputListParser,
      InputUserNameItemParser,
      InputUserPasswordItemParser,
    ]);
  }
}

export class FormGroupParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "GROUP";
    this.templateName = "FormGroup";
    this.templateNode = this.matchNode("FormGroup");
  }
}

export class InputListParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "LIST";
    this.templateName = "InputList";
    this.templateNode = this.matchNode("InputList");
  }
}

export class InputUserNameItemParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "ITEM";
    this.templateName = "InputUserNameItem";
    this.templateNode = this.matchNode("InputUserNameItem");
  }
}

export class InputUserPasswordItemParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "ITEM";
    this.templateName = "InputUserPasswordItem";
    this.templateNode = this.matchNode("InputUserPasswordItem");
  }
}
