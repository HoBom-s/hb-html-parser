/**
 * 단순히 query selector를 활용하여 선택된 DOM Node를 Return
 *
 * 선택된 class가 많다면 NodeList를 리턴
 */
class HTMLSelector {
  constructor(q) {
    const selected = document.querySelectorAll(q);

    this.selector =
      selected.length > 1
        ? document.querySelectorAll(q)
        : document.querySelector(q);
  }
}

Object.freeze(HTMLSelector);

export { HTMLSelector };
