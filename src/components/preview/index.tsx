import {Card} from "../card";
import styles from "./styles.module.sass"
import {QRConfig} from "../../types";
import {createEffect, createSignal, Show} from "solid-js";
import axios from "axios";
import {LoadingIcon} from "../loading-icon";

interface Props {
    config: QRConfig
}

export function PreviewSidebar(props: Props) {
    const [previewImage, setPreviewImage] = createSignal("")
    const [isLoading, setLoadingState] = createSignal(false)

    createEffect(async () => {
        if (!props.config.data) {
            return setPreviewImage("")
        }

        try {
            setLoadingState(true)

            const response = await axios.post("/generate", props.config, {responseType: "blob"})
            setPreviewImage(URL.createObjectURL(response.data))

            setLoadingState(false)
        } catch {
            // TODO: Handle error messages from server
        }
    })

    return <Card title="Preview">
        <div class={styles.qrcodePreview}>
            <Show when={!isLoading()} keyed fallback={<LoadingIcon size={50}/>}>
                <Show when={previewImage()} keyed fallback={<span>No preview <br/>yet</span>}>
                    <img class={styles.imagePreview} src={previewImage()}/>
                </Show>
            </Show>
        </div>

        <span class={styles.sizeNote}>
            Note: preview image does not reflect actual image size
        </span>

    </Card>
}