import axios, { isAxiosError } from "https://cdn.skypack.dev/axios";
import { HttpBase } from "./httpBase.js";
import { HttpError } from "./httpError.js";
import { funcs } from "../../utils/funcs.js";

/**
 * Http 통신을 위한 Class 정의
 */
class Http extends HttpBase {
    /**
     *
     * @param {string} baseUrl
     * @param {Object} headers
     * @param {number} timeout
     */
    constructor(baseUrl, headers, timeout = 3000) {
        super();

        if (!funcs.isString(baseUrl)) {
            throw TypeError(`baseUrl must be a string. but got ${typeof baseUrl}`);
        }

        this.baseUrl = baseUrl;

        this.headers = headers || {};

        if (!funcs.isNumber(timeout)) {
            throw TypeError(`timeout must be a string. but got ${typeof timeout}`);
        }

        this.timeout = timeout;

        // private
        this.fetcher = this.initializeAxios(this.baseUrl, this.headers, this.timeout);
    }

    /**
     * HTTP [GET]
     *
     * @override
     *
     * @param {string} url
     * @param {Object} config
     * @returns {Promise<Response>}
     */
    async get(url, config) {
        if (!funcs.isString(url)) {
            throw TypeError(`baseUrl must be a string. but got ${typeof baseUrl}`);
        }

        try {
            return await this.fetcher.get(url, config);
        } catch (e) {
            this.handlePromiseError(e);
        }
    }

    /**
     * HTTP [POST]
     *
     * @override
     *
     * @param {string} url
     * @param {Object} body
     * @param {Object} config
     * @returns {Promise<Response>}
     */
    async post(url, body, config) {
        if (!funcs.isString(url)) {
            throw TypeError(`baseUrl must be a string. but got ${typeof baseUrl}`);
        }

        try {
            return await this.fetcher.post(url, body, config);
        } catch (e) {
            this.handlePromiseError(e);
        }
    }

    /**
     * HTTP [PATCH]
     *
     * @override
     *
     * @param {string} url
     * @param {Object} body
     * @param {Object} config
     * @returns {Promise<Response>}
     */
    async patch(url, body, config) {
        if (!funcs.isString(url)) {
            throw TypeError(`baseUrl must be a string. but got ${typeof baseUrl}`);
        }

        try {
            return await this.fetcher.patch(url, body, config);
        } catch (e) {
            this.handlePromiseError(e);
        }
    }

    /**
     * HTTP [DELETE]
     *
     * @override
     *
     * @param {string} url
     * @param {Object} config
     * @returns {Promise<Response>}
     */
    async delete(url, config) {
        if (!funcs.isString(url)) {
            throw TypeError(`baseUrl must be a string. but got ${typeof baseUrl}`);
        }

        try {
            return await this.fetcher.delete(url, config);
        } catch (e) {
            this.handlePromiseError(e);
        }
    }

    initializeAxios(baseUrl, headers, timeout) {
        const axiosInstance = axios.create({
            baseURL: baseUrl,
            // headers가 없을 수도 있으므로,,,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            timeout: timeout,
        });

        axiosInstance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                if (isAxiosError(error)) {
                    return Promise.reject(new HttpError(error).toJSON());
                }

                return Promise.reject(error);
            },
        );

        axiosInstance.interceptors.response.use(
            (response) => {
                return response.data;
            },
            (error) => {
                if (isAxiosError(error)) {
                    return Promise.reject(new HttpError(error).toJSON());
                }

                return Promise.reject(error);
            },
        );

        return axiosInstance;
    }

    handlePromiseError(e) {
        if (isAxiosError(e)) {
            return Promise.reject(new HttpError(e).toJSON());
        }

        return Promise.reject(e);
    }
}

export { Http };
