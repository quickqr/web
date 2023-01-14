import {QRConfig} from "./types";

export function objectToURLQueryParam(obj: any): string {
    return Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent((v as any).toString())}`).join("&")
}

// Puts `data` as the first key in the config
export function sanitizeConfig(c: QRConfig): QRConfig {
    let {data, logo, ...config} = c;

    if (!isValidUrl(logo)) logo = undefined

    return {data: "<change me>", logo, ...config}
}

export function configToCURLRequest(c: QRConfig): string {
    return `curl -X POST -H 'Content-Type: application/json' -d '${JSON.stringify(sanitizeConfig(c))}'`
}

export function isValidUrl(url?: string): boolean {
    return new RegExp("^(https?:\\/\\/)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$").test(url ?? "")
}


