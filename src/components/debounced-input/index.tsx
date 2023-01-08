import {JSX, onCleanup} from "solid-js";

// Default input, but onInput event will fire after debounce timeout
export function DebouncedInput(props: JSX.InputHTMLAttributes<HTMLInputElement>) {
    const debounceMaxTime = 2000
    let debounceTimeout: number;

    onCleanup(() => clearTimeout(debounceTimeout))

    return <input
        {...props}
        onInput={(v) => {
            clearTimeout(debounceTimeout)
            debounceTimeout = setTimeout(() => typeof (props.onInput) == "function" && props.onInput?.(v), debounceMaxTime)
        }}
    />
}