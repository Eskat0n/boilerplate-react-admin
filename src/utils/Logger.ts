const STYLE_LOGGER_NAME = "background-color: #DDD; font-weight: bold;";
const STYLE_NORMAL = "";

export interface ILogger {
    group(label: string): void;
    groupEnd(): void;
    log(message: string, ...optionalParams: any[]): void;
}

export class Logger implements ILogger {
    private readonly name: string;
    private grouped = false;

    constructor(name: string) {
        this.name = name;
    }

    group(label: string, collapsed: boolean = true): void {
        this.grouped = true;
        if (collapsed) {
            console.groupCollapsed(`%c ${this.name} %c - ${label}`, STYLE_LOGGER_NAME, STYLE_NORMAL);
        } else {
            console.group(`%c ${this.name} %c - ${label}`, STYLE_LOGGER_NAME, STYLE_NORMAL);
        }
    }

    groupEnd(): void {
        this.grouped = false;
        console.groupEnd();
    }

    log(message: string, ...optionalParams: any[]): void {
        if (this.grouped) {
            console.log(message, ...optionalParams);
        } else {
            console.log(`%c ${this.name} %c - ${message}`, STYLE_LOGGER_NAME, STYLE_NORMAL, ...optionalParams);
        }
    }

    table(tableData: any): void {
        console.table(tableData);
    }
}
