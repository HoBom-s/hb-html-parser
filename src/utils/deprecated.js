/**
 * 사용하지 않는 함수에 걸어놓기
 *
 * @param {string} msg
 */
function deprecated(msg) {
    throw new Error(`Deprecated... ${msg}`);
}

export { deprecated };
