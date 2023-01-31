export enum RecoveryLevel {
    Low = "low",
    Medium = "medium",
    High = "high",
    Highest = "highest"

}

export interface QRConfig {
    data?: string
    size?: number,
    backgroundColor?: string,
    foregroundColor?: string
    logo?: string
    logoSpace?: boolean
    quietZone?: number
    recoveryLevel?: RecoveryLevel
}

export interface ErrorResponse {
    message: string
}