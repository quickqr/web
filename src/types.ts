export enum RecoveryLevel {
    Low = "low",
    Medium = "medium",
    High = "high",
    Highest = "highest"

}

export enum Shape {
    Square = "square",
    Rounded = "rounded",
    Circle = "circle",
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
    finder?: Shape
    module: Shape
    version: number;
}

export interface ErrorResponse {
    message: string
}