const USER_DATA_KEY = "Settings";

export class SettingsFactory<T> {
    constructor(private readonly defaultValue: T) {
    }

    create(): T {
        return new Proxy<Record<string, any>>(this.defaultValue, {
            get(target: Record<string, any>, property: PropertyKey): any {
                const propertyName = property.toString();
                const json = localStorage.getItem(`${USER_DATA_KEY}.${propertyName}`);
                return json ? JSON.parse(json) : target[propertyName];
            },
            set(_target: Record<string, any>, property: PropertyKey, value: any): boolean {
                const propertyName = property.toString();
                localStorage.setItem(`${USER_DATA_KEY}.${propertyName}`, JSON.stringify(value));
                return true;
            }
        }) as T;
    }
}
