import {Card} from "../card";
import {Callout} from "../callout";
import styles from "./styles.module.sass"
import {createEffect, createSignal, Show} from "solid-js";
import axios, {AxiosError} from "axios";
import {LoadingIcon} from "../loading-icon";
import LinkLogo from "../../assets/icons/link.svg"
import PngLogo from "../../assets/icons/png.svg"
import ApiLogo from "../../assets/icons/api.svg"
import CopySvg from "../../assets/icons/copy.svg"
import {ExportItem} from "./export-item";
import {sanitizeConfig} from "../../utils";
import {ErrorResponse, QRConfig} from "../../types";
import {ApiRequestModal} from "../api-request-modal";
import {urlUtils} from "../../url";

interface Props {
    config: QRConfig
    isTyping: boolean
}

export function PreviewSidebar(props: Props) {
    const [modalVisible, setModalVisible] = createSignal(false)
    const [previewImage, setPreviewImage] = createSignal<Blob>()
    const [errorMessage, setErrorMessage] = createSignal<string>()
    const [isLoading, setLoadingState] = createSignal(false)

    // To take of load from the server, preview sidebar will download icons from URL on the client and send raw images

    createEffect(async () => {
        if (!props.config.data) {
            return setPreviewImage(undefined)
        }

        setLoadingState(true)

        try {
            const response = await axios.post("/generate",
                {
                    ...props.config,
                    // Do not allow to send empty string
                    logo: props.config.logo || undefined
                },
                {
                    responseType: "blob"
                }
            )
            setPreviewImage(response.data)
            // setPreviewImage(URL.createObjectURL(response.data))
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

            setPreviewImage(undefined)
        }

        setLoadingState(false)

    })

    return <Card title="Preview" containerClass={styles.previewContainer}>
        <ApiRequestModal visible={modalVisible()} onClose={() => setModalVisible(false)} config={props.config}/>
        <div class={styles.qrcodePreview}>
            <Show when={!props.isTyping && !isLoading()} keyed fallback={<LoadingIcon/>}>
                <Show when={previewImage()} keyed fallback={<span>No preview <br/>yet</span>}>
                    <img class={styles.imagePreview} src={URL.createObjectURL(previewImage() ?? new Blob())} alt=""/>
                </Show>
            </Show>
        </div>

        <Callout type={errorMessage() ? "error" : "info"}>
            {errorMessage() || "Images larger than 256px are resized to fit preview window"}
        </Callout>

        <h1>Export</h1>
        <ExportItem
            title="As image" description="Save the QR as a file"
            tooltipTitle="Export QR as image"
            logo={PngLogo} buttonText="Save"
            isDisabled={!previewImage()}
            onClick={() => {
                const a = document.createElement("a")
                a.href = URL.createObjectURL(previewImage() ?? new Blob())
                a.download = "quick-qr.png"
                a.click()

                a.remove()
            }}
        />
        {
            "ClipboardItem" in window && <ExportItem
                title="To clipboard"
                tooltipTitle="Copy to clipboard"
                description="Copy generated QR code directly to clipboard"
                logo={CopySvg} buttonText="Copy" buttonClickedText="Copied"
                isDisabled={!previewImage()}
                onClick={() => {
                    navigator.clipboard.write([
                        new window.ClipboardItem({
                            "image/png": previewImage()!
                        })
                    ])
                }}
            />
        }
        <ExportItem
            title="As preset"
            tooltipTitle="Export preset"
            description="Copy link to this page to share your work (no attached files)"
            logo={LinkLogo} buttonText="Copy" buttonClickedText="Copied"
            onClick={() => {
                const link = `${document.location.origin}?${urlUtils.objectToURLQueryParam(sanitizeConfig(props.config, false))}`
                navigator.clipboard.writeText(link)
            }}
        />
        <ExportItem
            title="For developers"
            tooltipTitle="API Request"
            description="See how to make your design dynamic with API"
            logo={ApiLogo} buttonText="Show"
            onClick={() => setModalVisible(true)}
        />
    </Card>
}