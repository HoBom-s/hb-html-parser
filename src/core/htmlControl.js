import { HTMLSelector } from "./htmlSelector.js";

/**
 * HTML Contoller 정의
 *    HTML의 attribute 접근 등등..
 */
const HTMLControl = {};

{
  HTMLControl.attr = function (q, attr, value) {
    const $q = new HTMLSelector(q).selector;

    if (!value) {
      return $q.getAttribute(attr);
    }

    if (value) {
      $q.setAttribute(attr, value);
      return null;
    }
  };
}

Object.freeze(HTMLControl);

export { HTMLControl };
