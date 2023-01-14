import {Card} from "../card";
import styles from "./styles.module.sass"
import {createEffect, createSignal, Show} from "solid-js";
import axios, {AxiosError} from "axios";
import {LoadingIcon} from "../loading-icon";
import LinkLogo from "../../assets/icons/link.svg"
import PngLogo from "../../assets/icons/png.svg"
import ApiLogo from "../../assets/icons/api.svg"
import {PreviewLink} from "./link";
import {objectToURLQueryParam} from "../../utils";
import {ApiRequestModal} from "../api-request-modal";
import {ErrorResponse, QRConfig} from "../../types";

interface Props {
    config: QRConfig
    isTyping: boolean
}

// TODO: Is it worth to cache image on the client
export function PreviewSidebar(props: Props) {
    const [modalVisible, setModalVisible] = createSignal(false)
    const [previewImage, setPreviewImage] = createSignal("")
    const [errorMessage, setErrorMessage] = createSignal<string>()
    const [isLoading, setLoadingState] = createSignal(false)

    // To take of load from the server, preview sidebar will download icons from URL on the client and send raw images

    createEffect(async () => {
        if (!props.config.data) {
            return setPreviewImage("")
        }

        setLoadingState(true)

        try {
            const response = await axios.post("/generate",
                {
                    ...props.config,
                },
                {
                    responseType: "blob"
                }
            )
            setPreviewImage(URL.createObjectURL(response.data))
            setErrorMessage(undefined)
        } catch (e) {
            e = e as AxiosError;
            if (axios.isAxiosError(e) && e.response) {
                const t = await e.response.data.text();
                const msg = (JSON.parse(t) as ErrorResponse).message;
                setErrorMessage("Error: " + msg)
            } else {
                setErrorMessage("Unknown error occurred.")
            }
        }

        setLoadingState(false)

    })

    return <Card title="Preview" containerClass={styles.previewContainer}>
        <ApiRequestModal visible={modalVisible()} onClose={() => setModalVisible(false)} config={props.config}/>
        <div class={styles.qrcodePreview}>
            <Show when={!props.isTyping && !isLoading()} keyed fallback={<LoadingIcon/>}>
                <Show when={previewImage()} keyed fallback={<span>No preview <br/>yet</span>}>
                    <img class={styles.imagePreview} src={previewImage()} alt=""/>
                </Show>
            </Show>
        </div>

        {/* TOOD: Put error message here (if present) */}
        <span class={styles.note} classList={{[styles.error]: !!errorMessage()}}>
            {errorMessage() || "Note: images larger than 256px are resized to fit preview window"}
        </span>

        <h1>Export</h1>
        <PreviewLink
            title="As image" description="Save the QR as a file"
            tooltipTitle="Export QR as image"
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
            tooltipTitle="Export preset"
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
            title="For developers"
            tooltipTitle="API Request"
            description="See how to make your design dynamic with API"
            logo={ApiLogo} buttonText="Show"
            onClick={() => setModalVisible(true)}
        />
    </Card>
}