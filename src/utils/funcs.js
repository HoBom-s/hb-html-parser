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

  /**
   * Object, Array 구분 없이 For Loop 돌린 이후
   * 원본의 길이와 똑같은 [Array] 반환
   *        1) Array인 경우, Callback함수의 파라미터로 Item, Index 전달
   *        2) Object인 경우, Callback함수의 파라미터로 Key, Value 전달
   *
   * @param {Object | Array} t
   * @param {Function} cb
   * @returns {Array}
   */
  map: function (t, cb) {
    if (this.isArray(t)) {
      /**
       * Array인 경우,,,
       */
      const resultArr = [];

      t.forEach((v, i) => {
        const result = cb(v, i);

        resultArr.push(result);
      });

      return resultArr;
    } else if (this.isObject(t)) {
      /**
       * Object인 경우,,,
       */
      const resultArr = [];

      for (const [k, v] of Object.entries(t)) {
        const result = cb(k, v);

        resultArr.push(result);
      }

      return resultArr;
    }
  },

  /**
   * Object, Array 구분 없이 길이 값 출력
   *
   * @param {Array | Object} t
   * @returns {number}
   */
  length: function (t) {
    if (this.isArray(t)) {
      /**
       * Array 라면,,,
       */
      return t.length;
    } else if (this.isObject(t)) {
      /**
       * Object 라면,,,
       */
      return Object.keys(t).length;
    }
  },
};

Object.freeze(funcs);

export { funcs };
