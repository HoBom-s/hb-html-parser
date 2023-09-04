import { HTMLSelector } from "./htmlSelector.js";
import { HTMLControl } from "./htmlControl.js";

function bindDOM() {
  /**
   * Node의 Event handler 달아주기 위한 [on] method 추가
   *
   * @param {HTMLElementEvent} evt
   * @param {EventHandler} handler
   * @returns {this}
   */
  Element.prototype.on = function (evt, handler) {
    this.addEventListener(evt, handler);
    return this;
  };

  /**
   * Selected된 NodeList를 빙글빙글 돌면서 Event handler를 달아주기 위한 [on] method 추가
   *
   * @param {HTMLElemntEvent} evt
   * @param {EventHandler} handler
   * @returns {this}
   */
  NodeList.prototype.on = function (evt, handler) {
    this.forEach((node) => node.addEventListener(evt, handler));
    return this;
  };
}

/**
 * HoBom HTML Parser Base
 *      Template의 최상위 부모
 */
export class HoBomHTMLParserBase {
  constructor() {
    /**
     * HB-HTML-Parser-V1 의 기능을 그대로,,
     * Selector, Util, etc,,,
     */

    // Selector
    this.$$ = (q) => new HTMLSelector(q).selector;

    // attr, create, createElementFromString, transport, utils...
    this.$ = {
      attr: HTMLControl.attr,
      create: HTMLControl.create,
      createElementFromString: HTMLControl.createElementFromString,
      transport: HTMLControl.tranport,
      utils: HTMLControl.utils,
    };

    // DOM Binding - V1에서처럼 사용하기 위해서,,,
    bindDOM();

    this.childrenParsers = [];
  }

  /**
   * TemplateName과 Matching이 되는 DOMElement 반환
   *
   * @param {string} templateName
   * @returns {DOMElement | null}
   */
  matchNode(templateName) {
    const templates = this.$$("*[data-template-name]");

    for (const template of templates) {
      const tName = template.getAttribute("data-template-name");

      if (tName === templateName) {
        return template;
      }
    }

    return null;
  }

  /**
   * HoBomHTMLParserBase 추가
   *
   * @param {HoBomHTMLParserBase} childParsers
   */
  initialize(childParsers) {
    for (const childrenParser of childParsers) {
      const children = new childrenParser();

      this.childrenParsers.push(children);
    }
  }
}
