import { HTTP_STATUS } from "./httpStatus.js";

/**
 * HTTP 통신을 할 때 발생한 Error를 Handling하기 위한
 * Class 정의
 */
class HttpError extends Error {
    constructor(error, msg) {
        super(msg ?? error.message);

        const errorStatus = error.response?.status ?? 0;

        const errorName = (() => {
            switch (errorStatus) {
                case HTTP_STATUS.BAD_REQUEST: {
                    return "API Bad Request";
                }

                case HTTP_STATUS.UNAUTHORIZED: {
                    return "API Unauthorized Error";
                }

                case HTTP_STATUS.FORBIDEN: {
                    return "API Forbidden Error";
                }

                case HTTP_STATUS.NOT_FOUND: {
                    return "API NotFound Error";
                }

                case HTTP_STATUS.INTERNAL_SERVER_ERROR: {
                    return "API Internal Server Error";
                }

                case HTTP_STATUS.TIME_OUT: {
                    return "API Time Out Error";
                }

                default: {
                    return "ApiError";
                }
            }
        })();

        this.name = errorName;

        this.stack = error.stack;

        this.config = error.config || undefined;

        this.code = error.code;

        this.request = error.request;

        this.response = error.response;

        this.isAxiosError = error.isAxiosError;

        this.toJSON = error.toJSON;
    }
}

export { HttpError };
