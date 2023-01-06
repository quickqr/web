import {Card} from "../card";
import styles from "./styles.module.sass"
import {createSignal} from "solid-js";

interface Props {
    onChange: (data: string) => void
}

// TODO: Allow to load files:
// 1. Allow to send files on the server side (find the way to send any data (both binary, alphanum and text)
// 2. Uncomment and update code below
export function DataInput(props: Props) {
    let [selectedFilename, setSelectedFilename] = createSignal<string | null>(null)
    // let fileInput!: HTMLInputElement;

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
                onInput={(v) => props.onChange(v.currentTarget.value)}
            />

            {/*TODO*/}
            {/*<button onClick={() => fileInput.click()} class="bigButton">Attach file</button>*/}
            {/*<input ref={fileInput} onChange={onFileInput} hidden type="file"/>*/}

        </div>
    </Card>
}