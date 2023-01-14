import {Card} from "../card";
import styles from "./styles.module.sass"
import {AdvancedInput} from "../advanced-input";
import {isValidUrl} from "../../utils";
import {Show} from "solid-js";

interface Props {
    value?: string
    onChange: (s: string) => void
}

export function IconSelectCard(props: Props) {
    let fileInput!: HTMLInputElement;

    function onFileInput(event: Event & { currentTarget: HTMLInputElement }) {
        const file = event.currentTarget.files![0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsDataURL(file)


        reader.onload = () => {
            console.log(reader.result)
            const base64 = String(reader.result!).split(",")[1]

            props.onChange(base64)
        }

        reader.onerror = () => {
            // TODO: Show modal with error that file cannot be loaded
            alert("Unable to load file")
        }
    }

    return <Card title="Logo" containerClass={styles.container}>
        <div class={styles.fileSelect}>
            <div
                onClick={() => fileInput.click()}
                class={styles.button}
                classList={{[styles.withImage]: (props.value && !isValidUrl(props.value)) as boolean}}
            >
                <Show when={props.value && !isValidUrl(props.value)} fallback={<span>Click to <br/> select</span>}
                      keyed>
                    <img src={"data:image/png;base64," + props.value} alt="Bad image"/>
                </Show>
            </div>
            <input type="file" accept="image/png,image/jpeg" hidden ref={fileInput} onInput={onFileInput}/>
            <span>
                The logo will be placed at the center of the QR Code. It can be used to represent your brand or to attract people
            </span>
        </div>

        <h4>Or use link</h4>

        <AdvancedInput
            value={isValidUrl(props.value) ? props.value : ""}
            clearOnFocusout={false}
            placeholder="Enter URL for the image"
            validate={(s) => {
                if (s && !isValidUrl(s)) return "Please, enter a valid URL"
            }}
            onInput={(v) => props.onChange(v)}
        />

        {/* TODO: */}
        {/*<h5>Quick picks</h5>*/}
    </Card>
}