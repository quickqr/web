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
                    <img class={styles.imagePreview} src={previewImage()}/>
                </Show>
            </Show>
        </div>

        <span class={styles.sizeNote}>
            Note: preview image does not reflect actual image size
        </span>

        <h1>Links</h1>
        <PreviewLink
            title="Link to this page" description="Share this configuration of QR with your friends."
            logo={LinkLogo} buttonText="Copy" buttonClickedText="Copied"
            onClick={() => {
                const {data, logo, ...config} = props.config;
                const link = `${document.location.href}?${objectToURLQueryParam(config)}`
                navigator.clipboard.writeText(link)
            }}
        />
        <PreviewLink
            title="Link to image" description="Directly share image above with anybody"
            logo={PngLogo} buttonText="Copy" buttonClickedText="Copied"
            onClick={() => {
                const {logo, ...config} = props.config;
                if (!config.data) {
                    // TODO:
                    return
                }

                const link = `${import.meta.env.VITE_API_URL}/generate?${objectToURLQueryParam(config)}`
                navigator.clipboard.writeText(link)
            }}
        />
        <PreviewLink
            title="API Request" description="See how to make this QR Code truly dynamic with Quick QR’s API"
            logo={ApiLogo} buttonText="Show"
            onClick={() => {
                // TODO: show modal
            }}
        />
    </Card>
}