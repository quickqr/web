import {ModuleShape, QRConfig, RecoveryLevel, Shape} from "./types";
import {isValidHexColor} from "./utils";

// TODO: Properly handle array value (split in multiple params with same value)
function objectToURLQueryParam(obj: any): string {
    return Object.entries(obj)
        .filter(([_, v]) => v != undefined && (v != false))
        .map(([k, v]) => {
            return `${k}=${encodeURIComponent((v ?? "" as any).toString())}`
        })
        .join("&")
}

function parseQRConfig(): QRConfig {
    const p = new URLSearchParams(location.search)
    const c: QRConfig = {
        ...Object.entries(p),
        quietZone: parseNum(p, "quietZone"),
        size: parseNum(p, "size"),
        gap: parseNum(p, "gap"),

        recoveryLevel: parseEnum(p, "recoveryLevel", RecoveryLevel),
        finder: parseEnum(p, "finder", Shape),
        module: parseEnum(p, "module", ModuleShape),


        gradient: parseNum(p, "gradient", 0, 1),

        // Default value for logo space
        logoSpace: true
    }

    const g = p.getAll("gradientColors").filter(v => isValidHexColor(v))
    if (g.length > 0) {
       c.gradientColors = g
    }

    // 0 is practically equal to unset (or Auto), so remove it
    c.version = parseNum(p, "version", 0, 40);
    if (c.version == 0) c.version = undefined

    const lp = p.get("logoSpace")
    if (lp != null) c.logoSpace = lp == "true"

    return c
}


function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(v, max));
}

function parseNum(p: URLSearchParams, name: keyof QRConfig, min?: number, max?: number): number | undefined {
    const v = p.get(name)
    if (v == null) return


    let parsed = parseInt(v)
    if (isNaN(parsed)) return undefined

    if (min != undefined && max != undefined) {
        parsed = clamp(parsed, min, max)
    }

    return parsed
}

export function parseEnum<T extends {[s: number]: string}>(p: URLSearchParams, name: keyof QRConfig, e: {[s: number] : string }): T | undefined {
    const s = p.get(name)
    if (s == null) return

    return Object.values(e).find((v) => v == s) as T
}


export const urlUtils = {
    parseQRConfig,
    objectToURLQueryParam
}