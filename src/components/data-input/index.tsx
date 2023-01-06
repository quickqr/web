import {Card} from "../card";
import styles from "./styles.module.sass"
import {createEffect, createSignal, onCleanup} from "solid-js";

interface Props {
    onChange: (data: string) => void
}

// TODO: Allow to load files:
// 1. Allow to send files on the server side (find the way to send any data (both binary, alphanum and text)
// 2. Uncomment and update code below
export function DataInput(props: Props) {
    // let fileInput!: HTMLInputElement;
    let [selectedFilename, setSelectedFilename] = createSignal<string | null>(null)
    let debounceTimeout: number;

    createEffect(() => {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => {
        }, 300)
    })

    onCleanup(() => clearTimeout(debounceTimeout))

    // function onFileInput(event: Event & { currentTarget: HTMLInputElement }) {
    //     const file = event.currentTarget.files![0];
    //     if (!file) return;
    //
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file)
    //
    //
    //     reader.onload = () => {
    //         const base64 = String(reader.result!).split(",")[1]
    //         setSelectedFilename(file.name)
    //
    //         props.onChange(base64)
    //     }
    //
    //     reader.onerror = () => {
    //         // TODO: Show modal with error that file cannot be loaded
    //         alert("Unable to load file")
    //     }
    // }

    return <Card title="QR Code data" containerClass={styles.container}>
        <div class={styles.inputRow}>
            <input
                type="text"
                autocomplete="off"
                classList={{[styles.fileName]: !!selectedFilename()}}
                placeholder={selectedFilename() ? `${selectedFilename()} (click remove)` : "Input data the QR code will contain"}
                onClick={() => setSelectedFilename(null)}
                onFocus={() => setSelectedFilename(null)}
                onInput={(v) => {
                    clearTimeout(debounceTimeout)
                    debounceTimeout = setTimeout(() => props.onChange((v.target as HTMLInputElement).value), 700)
                }}
            />

            {/*TODO*/}
            {/*<button onClick={() => fileInput.click()} class="bigButton">Attach file</button>*/}
            {/*<input ref={fileInput} onChange={onFileInput} hidden type="file"/>*/}

        </div>
    </Card>
}