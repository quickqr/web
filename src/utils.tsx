export function objectToURLQueryParam(obj: any): string {
    return Object.entries(obj).map(([k, v]) => `${k}=${encodeURIComponent((v as any).toString())}`).join("&")
}

