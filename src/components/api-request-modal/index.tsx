import {QRConfig} from "../../types";
import styles from "./styles.module.sass"
import {Codeblock} from "./codeblock/codeblock";
import {configToCURLRequest, replaceDataWithDummy} from "../../utils";
import {createEffect, onCleanup, onMount} from "solid-js";

interface Props {
    visible: boolean;
    config: QRConfig;
    onClose: () => void
}

export function ApiRequestModal(props: Props) {

    function onEscape(e: KeyboardEvent) {
        if (e.key == "Escape") props.onClose()
    }

    createEffect(() => {
        if (props.visible) {
            document.body.classList.add("modal-open")
        } else {
            document.body.classList.remove("modal-open")
        }
    })

    onMount(() => addEventListener("keyup", onEscape));
    onCleanup(() => document.removeEventListener("keyup", onEscape))


    return <div class={styles.container} classList={{[styles.shown]: props.visible}}>
        <div class={styles.tint} onClick={props.onClose}/>
        <div class={styles.window}>
            <h1>API Request</h1>
            <div class={styles.scrollable}>
            <span>
               {/* TODO: Put appropriate link */}
                To make this QR code design more dynamic, you can use Quick QR’s API endpoint (<a
                href="https://">docs</a>):
            </span>

                <Codeblock language="url" label="POST" labelColor="accent-color"
                           code={import.meta.env.VITE_API_URL + "/generate"}/>

                <span>With following request body</span>

                <Codeblock language="json" code={JSON.stringify(replaceDataWithDummy(props.config), null, 2)}/>

                <span>Or use make a request directly from command line</span>
                <Codeblock language="curl" label="cURL" labelColor="blue" code={configToCURLRequest(props.config)}/>

            </div>

            <button onClick={props.onClose} class={"accent " + styles.accent}>Fine!</button>
        </div>
    </div>
}