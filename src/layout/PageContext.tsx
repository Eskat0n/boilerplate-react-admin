import {createContext, ReactNode, useContext} from "react";

export interface IPageContext {
    title: ReactNode;
    setTitle: (title: ReactNode) => void;
    setLoading: (loading: boolean) => void;
}

export const PageContext = createContext<IPageContext>({
    title: "",
    setTitle: () => null,
    setLoading: () => null,
});

export const PageProvider = PageContext.Provider;

export const usePage = () => useContext(PageContext);
