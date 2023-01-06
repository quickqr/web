export function objectToURLQueryParam(obj: any): string {
    return Object.keys(obj).reduce((prev, key) => {
        return prev + `&${key}=${encodeURIComponent(obj[key])}`
    })
}

