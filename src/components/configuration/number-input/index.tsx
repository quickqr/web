import styles from "./styles.module.sass"
import {AdvancedInput} from "../../advanced-input";
import {InfoTooltip} from "../../info-tooltip";

interface Props {
    label: string
    value: number
    onChange: (s: number) => void
    //
    /*
    * Unit to show right to input.
    * @default "px"
    */
    unit?: string
    min?: number
    max?: number

    tooltipText: string
}

/* TODO: Validation for length, max size*/

// TODO: reset if invalid length
export function NumberInput(props: Props) {
    const integerRE = /^\d+$/

    function validateNumber(s: string): string | undefined {
        if (!integerRE.test(s)) return "This field should be integer value"
        const n = parseInt(s)

        if (props.min && n < props.min) return `Value should not be less than ${props.min}`
        if (props.max && n > props.max) return `Value should not be greater than ${props.max}`
    }

    return <div class={styles.container}>
        <div class={styles.label}>
            {props.label}
            <InfoTooltip title={props.label} description={props.tooltipText}/>
        </div>
        <div class={styles.inputContainer}>
            <AdvancedInput
                class={styles.input}
                validate={validateNumber}
                value={props.value}
                onInput={(e) => props.onChange(parseInt((e.target as HTMLInputElement || "0").value))}
            />
            <span class={styles.unit}>{props.unit ?? "px"}</span>
        </div>
    </div>
}
