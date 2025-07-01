import React, { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { AppMetadata } from "./createApplication";

export const ApplicationContext = createContext<AppMetadata>({
    production: false,
    environment: undefined,
    version: "1.0.0-dev",
    versionHash: undefined
});

export type ApplicationProviderProps = PropsWithChildren<{
    metadata: AppMetadata;
}>;

export const ApplicationProvider = (props: ApplicationProviderProps) => {
    const metadata = useMemo(() => props.metadata, []);

    return (
        <ApplicationContext.Provider value={metadata}>
            {props.children}
        </ApplicationContext.Provider>
    );
};

export const useAppMetadata = () => useContext(ApplicationContext);
