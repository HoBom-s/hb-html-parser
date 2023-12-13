import { HTMLSelector } from "./htmlSelector.js";
import { Http } from "./http/http.js";
import { deprecated } from "../utils/deprecated.js";

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
     * @deprecated
     *
     * Params [Options]
     *
     * @example
     * {
     *    methods: "",
     *    async: true, // 비동기 => true, 동기 => false
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
        deprecated(`이 함수는 더 이상 사용하지 않도록 합니다. 대신 http 함수를 사용해 보세요.`);

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

        transporter.open(methods[options.methods], url, options.async);
        transporter.setRequestHeader("Content-Type", options["Content-Type"]);
        transporter.send(JSON.stringify(options.body));
    };

    /**
     * HTTP 통신을 위한 함수 정의
     *
     * @example
     *    const { get } = $.http(
     *      '/api/baseUrl',
     *       {
     *          'Content-Type': 'application/json',
     *           Authorization: 'Bearer [TOKEN]',
     *        },
     *        3000
     *    );
     *
     *    // ...
     *    const data = await get('/article');
     *
     * @param {string} baseUrl
     * @param {Object} headers
     * @param {number} timeout
     * @returns {Http}
     */
    HTMLControl.http = function (baseUrl, headers, timeout) {
        const httpObj = new Http(baseUrl, headers, timeout);

        const obj = {
            get: httpObj.get.bind(httpObj),
            post: httpObj.post.bind(httpObj),
            patch: httpObj.patch.bind(httpObj),
            del: httpObj.delete.bind(httpObj),
        };

        return {
            get: obj.get,
            post: obj.post,
            patch: obj.patch,
            del: obj.del,
        };
    };
}

Object.freeze(HTMLControl);

export { HTMLControl };
