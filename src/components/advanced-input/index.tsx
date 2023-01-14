import {createEffect, createSignal, JSX, onCleanup} from "solid-js";
import CrossSvg from "../../assets/icons/cross.svg?component-solid"
import styles from "./styles.module.sass"

interface Props {
    // default 2000ms
    debounceTime?: number
    // Clear input after focusout if contains validation errors
    clearOnFocusout?: boolean
    onTypingStateUpdate?: (t: boolean) => void
    // Validator should return error message if input data is invalid
    validate?: (v: string) => string | undefined
    onInput: (s: string) => void
}

// HTML input but with some enhancements such as input debouncing and validation with error message
export function AdvancedInput(props: Props & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "ref" | "onInput">) {
    let inputRef!: HTMLInputElement
    let debounceTimeout: number
    let tooltipVisibilityTimeout: number

    const [isTooltipVisible, setTooltipVisible] = createSignal(false)
    const [tooltipMessage, setTooltipMessage] = createSignal<string>()
    const [isTyping, setTypingState] = createSignal(false)

    createEffect(() => {
        props.onTypingStateUpdate?.(isTyping())
    })

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
        if (!isTyping()) setTypingState(true)
        clearTimeout(debounceTimeout)
        const t = (e.target as HTMLInputElement);
        const v = t.value;
        const invalidMessage = props.validate?.(v) ?? "";

        if (invalidMessage) {
            return showTooltip(invalidMessage)
        }

        hideTooltip()
        debounceTimeout = setTimeout(() => {
            setTypingState(false)
            props.onInput(t.value)
        }, props.debounceTime ?? 2000)
    }

    function onFocusout(e: FocusEvent) {
        clearTimeout(debounceTimeout)
        setTooltipVisible(false)
        setTypingState(false)
        // Reset input if there was some validation errors
        if (tooltipMessage() && props.clearOnFocusout) {
            hideTooltip()
            inputRef.value = String(props.value || "")
            return
        }

        const value = (e.target as HTMLInputElement).value;
        if (props.value != inputRef.value) {
            props.onInput(value)
        }
    }

    return <div class={`${styles.container} ${props.class}`}>
        <div class={styles.inputTooltip} classList={{[styles.visible]: isTooltipVisible()}}>
            <CrossSvg/>
            <span>{tooltipMessage()}</span>
        </div>
        <input
            {...props}
            class={""}
            ref={inputRef}
            onFocusIn={(e) => {
                if (tooltipMessage()) setTooltipVisible(true)
                // @ts-ignore
                props.onfocusin?.(e)
            }}
            onfocusout={(e) => {
                onFocusout(e);
                // @ts-ignore
                props.onfocusout?.(e)
            }}
            onInput={handleInput}
        />
    </div>
}