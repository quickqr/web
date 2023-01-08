import styles from "./styles.module.sass"
import {DebouncedInput} from "../../debounced-input";

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
}

/* TODO: Validation for length, max size*/

// TODO: reset if invalid length
export function NumberInput(props: Props) {
    return <div class={styles.container}>
        <span>{props.label}</span>
        <div class={styles.inputContainer}>
            <DebouncedInput
                type="number"
                value={props.value}
                onInput={(e) => props.onChange(parseInt((e.target as HTMLInputElement).value))}
            />
            <span class={styles.unit}>{props.unit ?? "px"}</span>
        </div>
    </div>
}
