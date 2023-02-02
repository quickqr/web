import styles from "./styles.module.sass"
import {AdvancedInput} from "../../advanced-input";

interface Props {
    value?: number
    nullable?: boolean
    placeholder?: string
    onChange: (s?: number) => void
    //
    /*
    * Unit to show right to input.
    * @default "px"
    */
    unit?: string
    min?: number
    max?: number
}

export function NumberInput(props: Props) {
    const integerRE = /^\d+$/

    function validateNumber(s: string): string | undefined {
        if (s == "" && props.nullable) return
        if (!integerRE.test(s)) return "This field should be integer value"
        const n = parseInt(s)

        if (props.min && n < props.min) return `Value should not be less than ${props.min}`
        if (props.max && n > props.max) return `Value should not be greater than ${props.max}`
    }

    return <div class={styles.container}>
            <AdvancedInput
                class={styles.input}
                placeholder={props.placeholder}
                validate={validateNumber}
                clearOnFocusout
                value={props.value}
                onInput={(v) =>  props.onChange(v == "" ? undefined : parseInt(v))}
            />
            {props.unit &&
                <span class={styles.unit}>{props.unit}</span>
            }
    </div>
}
