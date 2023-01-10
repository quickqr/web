import {QRConfig} from "./types";

export function objectToURLQueryParam(obj: any): string {
    return Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent((v as any).toString())}`).join("&")
}

// Puts `data` as the first key in the config
export function replaceDataWithDummy(c: QRConfig): QRConfig {
    const {data, ...config} = c;

    return {data: "<change me>", ...config}
}

export function configToCURLRequest(c: QRConfig): string {
    return `curl -X POST -H 'Content-Type: application/json' -d '${JSON.stringify(replaceDataWithDummy(c))}'`
}


