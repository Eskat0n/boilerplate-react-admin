import {useEffect, useState} from "react";

type DataFetch<T> = {
    fetchData: (...args: any[]) => Promise<T>;
    data: T | undefined;
    loading: boolean;
}

export const useDataFetch = function <T>(
    func: (...args: any[]) => Promise<T>,
    ...defaultArgs: any[]
): DataFetch<T> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T>();

    const fetchData = (args: any[] = defaultArgs) => {
        setLoading(true);
        return func(args)
            .then(result => {
                setData(result);
                return result;
            })
            .finally(() => setLoading(false))
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        data,
        fetchData
    };
};

type FetchedList<T> = {
    fetchData: (...args: any[]) => Promise<T[]>;
    data: T[];
    loading: boolean;
};

export const useFetchedList = function <T>(
    func: (...args: any[]) => Promise<T[]>,
    ...defaultArgs: any[]
): FetchedList<T> {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<T[]>([]);

    const fetchData = (args: any[] = defaultArgs) => {
        setLoading(true);
        return func(args)
            .then(result => {
                setData(result);
                return result;
            })
            .finally(() => setLoading(false))
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        loading,
        data,
        fetchData
    };
}
