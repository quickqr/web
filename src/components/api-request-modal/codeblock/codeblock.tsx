import "highlight.js/scss/base16/framer.scss"
import "./codeblock.sass"
import {createEffect, createSignal, Show} from "solid-js";
import CopyIcon from "../../../assets/icons/copy.svg"
import "./hljs-setup"
import hljs from "highlight.js/lib/core";

interface Props {
    label?: string;
    labelColor?: "accent-color" | "blue"
    code: string
    language: "json" | "curl" | "url"
}


// TODO: Make copy button
// TODO: Implement hiding and showing
// TODO: Lock scrolling on body when opened
export function Codeblock(props: Props) {
    const [isCopiedLabelShown, setCopiedLabelVisibility] = createSignal(false)
    let hideLabelTimeout: number;
    let codeblock!: HTMLElement;

    createEffect(async () => {
        if (props.language && props.code) {
            codeblock.innerHTML = hljs.highlight(props.language, props.code).value || props.code
        }
    })

    function copyCode() {
        navigator.clipboard.writeText(props.code)
        setCopiedLabelVisibility(true)
        clearTimeout(hideLabelTimeout)
        hideLabelTimeout = setTimeout(() => setCopiedLabelVisibility(false), 2500)
    }


    return <div class="codeblock-container">
        <Show when={!!props.label} keyed>
            <div class="codeblock-label" style={{background: `var(--${props.labelColor})`}}>
                {props.label}
            </div>
        </Show>

        <pre classList={{"multiline": props.code.split("\n").length > 1}}>
        {/* Show different copy buttons for multiline (inside) and singleline outside the codeblock) */}
            <div class="copy-button" onClick={copyCode}>
            <Show when={isCopiedLabelShown()} keyed>
                <span>
                    Copied!
                </span>
            </Show>
            <img alt="Copy" src={CopyIcon}/>
        </div>
           <code class="hljs"
                 ref={codeblock}
                 classList={{[`language-${props.language}`]: !!props.language, "labeled": !!props.label}}
           >
           </code>
       </pre>
    </div>
}
