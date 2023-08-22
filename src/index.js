import { HTMLSelector } from "./core/htmlSelector.js";
import { HTMLControl } from "./core/htmlControl.js";

{
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
}

{
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

window.$ = function (q) {
  return new HTMLSelector(q).selector;
};

{
  window.$.attr = HTMLControl.tranport;
  window.$.create = HTMLControl.create;
  window.$.createElementFromString = HTMLControl.createElementFromString;
  window.$.transport = HTMLControl.tranport;
}
