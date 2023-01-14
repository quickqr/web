import {QRConfig} from "./types";

// Used to validate images
const img = new Image()


export function objectToURLQueryParam(obj: any): string {
    return Object.entries(obj).map(([k, v]) => {
        return `${k}=${encodeURIComponent((v as any).toString())}`
    }).join("&")
}

// Puts `data` as the first key in the config
export function sanitizeConfig(c: QRConfig, sanitizeData = true): QRConfig {
    let {data, ...config} = c;

    if (!isValidUrl(config.logo)) delete config.logo

    return {data: sanitizeData ? "<change me>" : data, ...config}
}

export function configToCURLRequest(c: QRConfig): string {
    return `curl -X POST -H 'Content-Type: application/json' -d '${JSON.stringify(sanitizeConfig(c))}'`
}

export function isValidUrl(url?: string): boolean {
    return new RegExp("^(https?:\\/\\/)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$").test(url ?? "")
}

export function isValidImage(base64: string): Promise<boolean> {
    return new Promise((res, _) => {
        img.onload = () => {
            res(true)
        }

        img.onerror = () => {
            res(false)
        }

        img.src = "data:image/png;base64," + base64
    })
}
