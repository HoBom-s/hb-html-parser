import { funcs } from "../../utils/funcs.js";

/**
 * Http 통신을 위한 Http class의 `Interface`
 */
class HttpBase {
    constructor() {
        this.name = "HttpBase";
    }

    /**
     * HTTP [GET] Method
     *
     * 반드시 override 할 것
     */
    get() {
        funcs.notImplementd();
    }

    /**
     * HTTP [POST] Method
     *
     * 반드시 override 할 것
     */
    post() {
        funcs.notImplementd();
    }

    /**
     * HTTP [PATCH] Method
     *
     * 반드시 override 할 것
     */
    patch() {
        funcs.notImplementd();
    }

    /**
     * HTTP [DELETE] Method
     *
     * 반드시 override 할 것
     */
    delete() {
        funcs.notImplementd();
    }
}

export { HttpBase };
