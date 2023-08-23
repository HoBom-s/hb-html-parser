/**
 * 각종 Function Util 모음
 */
const funcs = {
  /**
   * ==============================
   * ============= IS =============
   * ==============================
   */

  /**
   * Array 인가?
   *
   * @param {unknown} t
   * @returns {boolean}
   */
  isArray: function (t) {
    return Array.isArray(t);
  },

  /**
   * Object 인가?
   *
   * @param {unknown} t
   * @returns {boolean}
   */
  isObject: function (t) {
    return Object.prototype.toString.call(t) === "[object Object]";
  },

  /**
   * String 인가?
   *
   * @param {unknown} t
   * @returns {boolean}
   */
  isString: function (t) {
    return typeof t === "string";
  },

  /**
   * Number 인가?
   *
   * @param {unknown} t
   * @returns {boolean}
   */
  isNumber: function (t) {
    return typeof t === "number";
  },

  /**
   * ==============================
   * ============ FUNC ============
   * ==============================
   */

  /**
   * Object든 Array든 일단 For Loop 돌림
   *        1) Array인 경우, Callback함수의 파라미터로 Item, Index 전달
   *        2) Object인 경우, Callback함수의 파라미터로 Key, Value 전달
   *
   * @param {Object | Array} t
   * @param {Function} cb
   */
  each: function (t, cb) {
    if (this.isArray(t)) {
      /**
       * Array인 경우 Callback 함수는 item, index를 인자로,,
       */
      t.forEach((v, i) => cb(v, i));
    } else if (this.isObject(t)) {
      /**
       * Object인 경우 Cabllack에 key, value를 인자로,,
       */
      for (const [k, v] of Object.entries(t)) {
        cb(k, v);
      }
    }
  },
};

Object.freeze(funcs);

export { funcs };