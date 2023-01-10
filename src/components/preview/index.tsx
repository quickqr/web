import {Card} from "../card";
import styles from "./styles.module.sass"
import {QRConfig} from "../../types";
import {createEffect, createSignal, Show} from "solid-js";
import axios from "axios";
import {LoadingIcon} from "../loading-icon";
import LinkLogo from "../../assets/icons/link.svg"
import PngLogo from "../../assets/icons/png.svg"
import ApiLogo from "../../assets/icons/api.svg"
import {PreviewLink} from "./link";
import {objectToURLQueryParam} from "../../utils";

interface Props {
    config: QRConfig
}

export function PreviewSidebar(props: Props) {
    const [previewImage, setPreviewImage] = createSignal("")
    const [isLoading, setLoadingState] = createSignal(false)

    createEffect(async () => {
        console.log(props.config.size)
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

    return <Card title="Preview" containerClass={styles.previewContainer}>
        <div class={styles.qrcodePreview}>
            <Show when={!isLoading()} keyed fallback={<LoadingIcon size={50}/>}>
                <Show when={previewImage()} keyed fallback={<span>No preview <br/>yet</span>}>
                    <img class={styles.imagePreview} src={previewImage()} alt=""/>
                </Show>
            </Show>
        </div>

        {/* TOOD: Put error message here (if present) */}
        <span class={styles.note}>
            Note: images larger than 256px are resized to fit preview window
        </span>

        <h1>Export</h1>
        <PreviewLink
            title="As image" description="Save the QR as a file"
            logo={PngLogo} buttonText="Save"
            isDisabled={!previewImage()}
            onClick={() => {
                const a = document.createElement("a")
                a.href = previewImage()
                a.download = "quick-qr.png"
                a.click()

                a.remove()
            }}
        />
        <PreviewLink
            title="As preset"
            description="Copy link to this page to share your work (no attached files)"
            logo={LinkLogo} buttonText="Copy" buttonClickedText="Copied"
            onClick={() => {
                // TODO: check if logo is an URL, if so, add to the config
                const {logo, ...config} = props.config;

                const link = `${document.location.href}?${objectToURLQueryParam(config)}`
                navigator.clipboard.writeText(link)
            }}
        />
        <PreviewLink
            title="For developers" description="See how to make your design dynamic with API"
            logo={ApiLogo} buttonText="Show"
            onClick={() => {
                // TODO: show modal
            }}
        />
    </Card>
}