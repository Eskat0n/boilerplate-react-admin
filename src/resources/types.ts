export interface APIResult<T = any> {
    readonly success: boolean;
    readonly data?: T;
    readonly errorMessage?: string;
    readonly errorName?: string;
    readonly stackTrace?: string;
}

export interface OrderForm {
    id: number | string;
    orderIndex: number;
}
