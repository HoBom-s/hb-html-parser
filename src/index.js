import jsdom from "jsdom";
import fs from "fs";
import { HTMLSelector } from "./core/htmlSelector";
import { HTMLControl } from "./core/htmlControl";
import { funcs } from "./utils/funcs";
import { startWithTemplate } from "./core/htmlParser";

const dom = new jsdom.JSDOM(fs.readFileSync("./templates/index.html"), {
  encoding: "utf8",
});

{
  /**
   * Node의 Event handler 달아주기 위한 [on] method 추가
   *
   * @param {HTMLElementEvent} evt
   * @param {EventHandler} handler
   * @returns {this}
   */
  dom.window.Element.prototype.on = function (evt, handler) {
    this.addEventListener(evt, handler);
    return this;
  };
}

{
  /**
   * Selected된 NodeList를 빙글빙글 돌면서 Event handler를 달아주기 위한 [on] method 추가
   *
   * @param {HTMLElemntEvent} evt
   * @param {EventHandler} handler
   * @returns {this}
   */
  dom.window.NodeList.prototype.on = function (evt, handler) {
    this.forEach((node) => node.addEventListener(evt, handler));
    return this;
  };
}

{
  /**
   * Selector 정의
   *      $("") < 이렇게 사용
   */
  dom.window.window.$ = function (q) {
    return new HTMLSelector(q).selector;
  };
}

{
  /**
   * 각종 Util 정의
   */

  dom.window.$.attr = HTMLControl.attr;
  dom.window.$.create = HTMLControl.create;
  dom.window.$.createElementFromString = HTMLControl.createElementFromString;
  dom.window.$.transport = HTMLControl.tranport;
  dom.window.$.utils = funcs;
}

startWithTemplate();
