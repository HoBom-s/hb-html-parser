/**
 * 단순히 HTTP Method시 발생한 Error의 상태코드
 * [400, 401, 403, 404, 500, 503]
 */
const HTTP_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    TIME_OUT: 503,
};

export { HTTP_STATUS };
