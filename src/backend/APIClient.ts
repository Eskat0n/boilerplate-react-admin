import {Logger} from "../utils";

const apiLogger = new Logger("API");

export enum HttpMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export class APIClient {
    public static headers: Record<string, string> = {};
    public static baseURL = "";
    public static getAuthorization: () => string | undefined | Promise<string | undefined> = () => undefined;

    private readonly root: string;

    constructor(root: string = "") {
        this.root = root;
    }

    protected async GET(endpoint: string,
                        queryData: RequestData | null = null,
                        abortController?: AbortController): Promise<any> {
        const url = this.createUrl(endpoint, queryData);
        apiLogger.log(`Sending GET request to ${url} with data`, queryData);

        try {
            const authorization = await APIClient.getAuthorization();
            const resp = await fetch(url, {
                headers: {
                    ...(authorization
                        ? {"Authorization": authorization}
                        : {}),
                    ...APIClient.headers,
                },
                signal: abortController ? abortController.signal : null,
            });

            if (resp.status > 400)
                return null;

            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
    }

    protected async POST(endpoint: string, data: RequestData | null = null): Promise<any> {
        return await this.request(endpoint, data, HttpMethod.POST);
    }

    protected async PUT(endpoint: string, data: RequestData | null = null): Promise<any> {
        return await this.request(endpoint, data, HttpMethod.PUT);
    }

    protected async DELETE(endpoint: string, data: RequestData | null = null): Promise<any> {
        return await this.request(endpoint, data, HttpMethod.DELETE);
    }

    protected async request(endpoint: string,
                            data: RequestData | null,
                            method: HttpMethod,
                            abortController?: AbortController): Promise<any> {
        const url = this.createUrl(endpoint);
        apiLogger.log(`Sending ${method} request to ${url} with data`, data);

        try {
            const authorization = await APIClient.getAuthorization();
            const resp = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    ...(authorization
                        ? {"Authorization": authorization}
                        : {}),
                    ...APIClient.headers,
                },
                body: data ? JSON.stringify(data) : "",
                signal: abortController ? abortController.signal : null,
            });
            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
    }

    private createUrl(endpoint: string, queryData: RequestData | null = null): string {
        const query = queryData
            ? "?" + Object.keys(queryData)
            .map(key => ({key, value: queryData[key] !== undefined ? queryData[key] : ""}))
            .map(({key, value}) => `${key}=${encodeURIComponent(value)}`)
            .join("&")
            : "";
        return `/api${this.root}${endpoint}${query}`;
    }
}

type RequestData = { [key: string]: any };
