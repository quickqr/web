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
    logoScale?: number
    borderSize?: number
    recoveryLevel?: RecoveryLevel
}

export interface ErrorResponse {
    message: string
}