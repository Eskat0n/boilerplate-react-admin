export interface AppMetadata {
    production: boolean;
    environment?: "development" | "staging" | "production" | string;
    version: string;
    versionHash?: string;
}

export interface AppOptions extends AppMetadata {

}

const defaultOptions: AppOptions = {
    production: false,
    environment: undefined,
    version: "1.0.0-dev",
    versionHash: undefined
};

export function createApplication(
    options: Partial<AppOptions>
): AppMetadata {
    return {
        ...defaultOptions,
        ...options
    };
}
