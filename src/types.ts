import {Part} from "solid-js/store";

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

interface ApiFields {
    data: string
    size: number,
    backgroundColor: string,
    foregroundColor: string
    logo: string
    logoSpace: boolean
    quietZone: number
    recoveryLevel: RecoveryLevel
    finder: Shape
    module: Shape
    version: number;
    gap: number
}

export type QRConfig = Partial<ApiFields>

export interface ErrorResponse {
    message: string
}