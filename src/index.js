import { HTMLSelector } from "./core/htmlSelector.js";
import { HTMLControl } from "./core/htmlControl.js";

export function a() {
  console.log("asdf");
}

window.$ = function (q) {
  return new HTMLSelector(q).selector;
};

$.__proto__ = HTMLControl;
