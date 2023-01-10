import {createSignal, JSX, onCleanup, Show} from "solid-js";
import CrossSvg from "../../assets/icons/cross.svg?component-solid"
import styles from "./styles.module.sass"

interface Props {
    // default 2000ms
    debounceTime?: number
    // Validator should return error message if input data is invalid
    validate?: (v: string) => string | undefined
}

// HTML input but with some enhancements such as input debouncing and validation with error message
export function AdvancedInput(props: Props & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "ref">) {
    let inputRef!: HTMLInputElement;
    const initialValue = props.value
    const [validationMessage, setValidationMessage] = createSignal<string>()
    const resetValidationMessage = () => setValidationMessage(undefined)
    let debounceTimeout: number;

    onCleanup(() => clearTimeout(debounceTimeout))

    function handleInput(e: InputEvent & { currentTarget: HTMLInputElement, target: Element }) {
        const v = (e.target as HTMLInputElement).value;
        const invalidMessage = props.validate?.(v) ?? "";

        if (invalidMessage) {
            setValidationMessage(invalidMessage)
            return
        }

        resetValidationMessage()
        clearTimeout(debounceTimeout)
        // @ts-ignore
        debounceTimeout = setTimeout(() => props.onInput?.(e), props.debounceTime ?? 2000)
    }

    function onFocusout() {
        // Reset input if there was some validation errors
        if (validationMessage()) {
            clearTimeout(debounceTimeout)
            resetValidationMessage()
            inputRef.value = String(initialValue)
        }
    }

    return <div class={`${styles.container} ${props.class}`}>
        <Show when={validationMessage()} keyed>
            <div class={styles.inputTooltip}>
                <CrossSvg/>
                <span>{validationMessage()}</span>
            </div>
        </Show>
        <input
            {...props}
            class={""}
            ref={inputRef}
            onfocusout={(e) => {
                onFocusout();
                // @ts-ignore
                props.onfocusout?.(e)
            }}
            onInput={handleInput}
        />
    </div>
}