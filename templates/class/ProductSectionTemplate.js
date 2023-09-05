import { HoBomHTMLParserBase } from "../../src/core/hobomHtmlParserBase.js";

export class ProductSectionTemplateParser extends HoBomHTMLParserBase {
  constructor() {
    super();

    this.templateId = "TEMPLATE";
    this.templateName = "ProductSectionTemplate";
    this.templateNode = this.matchNode("ProductSectionTemplate");

    this.initialize([ProductSectionGroupParser, ProductSectionListParser]);
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

    this.$.transport("https://fakestoreapi.com/products", {
      methods: "GET",
      async: false,
      success: (datas) => {
        for (const product of datas) {
          const divBox = this.$.create("div");

          this.$.createElementFromString(
            divBox,
            `
              <div class="product-item" style="cursor: pointer;">
                <div style="text-align: center; margin-bottom: 0.825rem;">
                  <img width="180" height="180" src=${product.image} />
                </div>
                <p style="font-weight: bold; margin-bottom: 1rem;">${
                  product.title
                }</p>
                <p>${product.description.slice(0, 30)}</p>
                <p style="margin-top: 10px; font-weight: bold;">Price: $${
                  product.price
                }</p>
              </div>
          `
          );

          this.templateNode.append(divBox);
        }
      },
    });

    this.$$(".product-item").on("click", () => {
      alert("This service is not working...");
    });
  }
}
