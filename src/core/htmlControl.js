import { HTMLSelector } from "./htmlSelector";

/**
 * HTML Contoller 정의
 *    HTML의 attribute 접근, api 통신 등등..
 */
const HTMLControl = {};

{
  /**
   * getAttribute OR setAttribute
   *
   * @param {HTMLElement} q
   * @param {string} attr
   * @param {string | number} value
   * @returns {string | null}
   */
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

{
  /**
   * document.createElement
   *
   * @param {string} elem
   * @returns {HTMLElement | null}
   */
  HTMLControl.create = function (elem) {
    if (!elem) {
      return null;
    }

    return document.createElement(elem);
  };
}

{
  /**
   * HTMLElement.innerHTML
   *
   * @param {HTMLElement} elem
   * @param {string} str
   * @return {HTMLElement | null}
   */
  HTMLControl.createElementFromString = function (elem, str) {
    if (!elem) {
      return null;
    }

    elem.innerHTML = str;
  };
}

{
  /**
   * transport를 활용하여 API 통신이 이루어 지도록 한다.
   * options의 경우 Object의 형태로 넘어온다.
   *
   * Params [Options]
   * @example
   * {
   *    methods: "",
   *    success: () => {},
   *    error: () => {},
   * }
   *
   * @example
   *    $.transport("/api/url", {
   *        methods: "GET",
   *        success: function(data) {
   *            // Do something...
   *        },
   *        error: function(error) {
   *            // Do something...
   *        },
   *    });
   *
   * @param {string} url
   * @param {Object} options
   */
  HTMLControl.tranport = function (url, options) {
    // HTTP Methods
    const methods = {
      GET: "GET",
      POST: "POST",
      PUT: "PUT",
      PATCH: "PATCH",
      DELETE: "DELETE",
    };

    const transporter = new XMLHttpRequest();

    transporter.onreadystatechange = function () {
      if (transporter.readyState === XMLHttpRequest.DONE) {
        if (transporter.status === 200) {
          options.success(JSON.parse(transporter.response));
        } else if (transporter.status >= 400) {
          transporter.onerror = function (e) {
            options.error(e);
          };
        }
      }
    };

    transporter.open(methods[options.methods], url);
    transporter.setRequestHeader("Content-Type", options["Content-Type"]);
    transporter.send(JSON.stringify(options.body));
  };
}

Object.freeze(HTMLControl);

export { HTMLControl };
