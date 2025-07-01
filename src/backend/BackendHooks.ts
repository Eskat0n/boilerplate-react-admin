import { useCallback, useState } from "react";
import {APIClient} from "./APIClient";
import {Logger} from "../utils";

const apiLogger = new Logger("API");

type APIMethod<TResult = any> = (params?: any) => Promise<TResult>;
type APIMethodHook<TResult = any> = [
    APIMethod<TResult>,
    boolean
];

const createUrl = (urlTemplate: string, queryData?: any): string => {
    const url = urlTemplate.split("/")
        .map(segment => segment.startsWith(":")
            ? (queryData ? queryData[segment.substr(1, segment.length - 1)] : segment)
            : segment)
        .join("/");
    const query = queryData
        ? "?" + Object.keys(queryData)
        .map(key => ({key, value: queryData[key] !== undefined ? queryData[key] : ""}))
        .map(({key, value}) => `${key}=${encodeURIComponent(value)}`)
        .join("&")
        : "";

    return `${APIClient.baseURL}/api${url}${query}`;
}

export const useAPI = () => {

};

export const useGET = (urlTemplate: string): APIMethodHook => {
    const [loading, setLoading] = useState(false);

    const apiMethod = useCallback(async (queryData?: any) => {
        const url = createUrl(urlTemplate, queryData);
        setLoading(true);
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
            });

            if (resp.status >= 400)
                return null;

            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
        finally {
            setLoading(false);
        }
    }, [urlTemplate]);

    return [
        apiMethod,
        loading,
    ];
};

export const usePOST = (urlTemplate: string): APIMethodHook => {
    const [loading, setLoading] = useState(false);

    const apiMethod = useCallback(async (data?: any) => {
        setLoading(true);

        const url = createUrl(urlTemplate);
        apiLogger.log(`Sending POST request to ${url} with data`, data);

        try {
            const authorization = await APIClient.getAuthorization();
            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(authorization
                        ? {"Authorization": authorization}
                        : {}),
                    ...APIClient.headers,
                },
                body: data ? JSON.stringify(data) : "",
            });
            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
        finally {
            setLoading(false);
        }
    }, [urlTemplate]);

    return [
        apiMethod,
        loading,
    ];
};

export const usePUT = (endpoint: string): APIMethodHook => {
    const [loading, setLoading] = useState(false);

    const apiMethod = useCallback(async (data?: any) => {
        setLoading(true);

        const url = createUrl(endpoint);
        apiLogger.log(`Sending POST request to ${url} with data`, data);

        try {
            const authorization = await APIClient.getAuthorization();
            const resp = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(authorization
                        ? {"Authorization": authorization}
                        : {}),
                    ...APIClient.headers,
                },
                body: data ? JSON.stringify(data) : "",
            });
            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
        finally {
            setLoading(false);
        }
    }, [endpoint]);

    return [
        apiMethod,
        loading,
    ];
};

export const useDELETE = (endpoint: string): APIMethodHook => {
    const [loading, setLoading] = useState(false);

    const apiMethod = useCallback(async (data?: any) => {
        setLoading(true);

        const url = createUrl(endpoint);
        apiLogger.log(`Sending DELETE request to ${url} with data`, data);

        try {
            const authorization = await APIClient.getAuthorization();
            const resp = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    ...(authorization
                        ? {"Authorization": authorization}
                        : {}),
                    ...APIClient.headers,
                },
                body: data ? JSON.stringify(data) : "",
            });
            const result = await resp.json();
            apiLogger.log(`Got response from ${url}`, result);

            return result;
        } catch (e) {
            apiLogger.log(`Error while performing request to ${url}`, e);
            return null;
        }
        finally {
            setLoading(false);
        }
    }, [endpoint]);

    return [
        apiMethod,
        loading,
    ];
};
