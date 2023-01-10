import {createSignal, JSX, onCleanup} from "solid-js";
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
    let debounceTimeout: number;
    let tooltipVisibilityTimeout: number;

    const [isTooltipVisible, setTooltipVisible] = createSignal(false)
    const [tooltipMessage, setTooltipMessage] = createSignal<string>()

    const showTooltip = (msg: string) => {
        clearTimeout(tooltipVisibilityTimeout)

        setTooltipVisible(true)
        setTooltipMessage(msg)
    }
    const hideTooltip = () => {
        clearTimeout(tooltipVisibilityTimeout)

        setTooltipVisible(false)
        // This helps to get rid of issue with tooltip text disappears faster than tooltip
        tooltipVisibilityTimeout = setTimeout(() => {
            setTooltipMessage(undefined)
        }, 350)
    }


    onCleanup(() => {
        clearTimeout(debounceTimeout);
        clearTimeout(tooltipVisibilityTimeout)
    })

    function handleInput(e: InputEvent & { currentTarget: HTMLInputElement, target: Element }) {
        clearTimeout(debounceTimeout)

        const v = (e.target as HTMLInputElement).value;
        const invalidMessage = props.validate?.(v) ?? "";

        if (invalidMessage) {
            return showTooltip(invalidMessage)
        }

        hideTooltip()
        // @ts-ignore
        debounceTimeout = setTimeout(() => props.onInput?.(e), props.debounceTime ?? 2000)
    }

    function onFocusout() {
        // Reset input if there was some validation errors
        if (tooltipMessage()) {
            clearTimeout(debounceTimeout)
            hideTooltip()
            inputRef.value = String(initialValue)
        }
    }

    return <div class={`${styles.container} ${props.class}`}>
        {/*<Show when={validationMessage()} keyed>*/}
        <div class={styles.inputTooltip} classList={{[styles.visible]: isTooltipVisible()}}>
            <CrossSvg/>
            <span>{tooltipMessage()}</span>
        </div>
        {/*</Show>*/}
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