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

export function NumberInput(props: Props) {
    const integerRE = /^\d+$/

    function validateNumber(s: string): string | undefined {
        console.log(s)
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
                clearOnFocusout
                value={props.value}
                onInput={(v) => props.onChange(parseInt(v))}
            />
            <span class={styles.unit}>{props.unit ?? "px"}</span>
        </div>
    </div>
}
