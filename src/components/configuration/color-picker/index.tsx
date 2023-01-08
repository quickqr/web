import styles from "./styles.module.sass"
import "vanilla-colorful/hex-color-picker.js";
import "./picker.sass"
import {createSignal, onMount} from "solid-js";

interface Props {
    label: string
    color: string
    onChange: (s: string) => void
}

export function ColorPicker(props: Props) {
    const [pickedColor, setPickedColor] = createSignal<string>(props.color)
    const [popupVisible, setPopupVisible] = createSignal(false)
    let pickerPopupRef!: HTMLDivElement;
    let colorPickerRef!: HTMLDivElement;


    function showPopup() {
        setPopupVisible(true)

        pickerPopupRef.onmousedown = (e) => {
            if (!(e.target as HTMLElement).classList.contains("finishButton")) {
                e.stopPropagation();
            }
        }

        document.onmousedown = (e) => finishPicking(e)
    }

    function hidePopup() {
        setPopupVisible(false)
        document.onmousedown = null
    }

    function finishPicking(e?: Event) {
        // Clicked Save button
        if (e && (e.target as HTMLElement).classList.contains("finishButton")) {
            if (pickedColor() != props.color) {
                props.onChange(pickedColor())
            }
        } else {
            setPickedColor(props.color)
        }

        hidePopup()
    }


    onMount(() => {
        colorPickerRef.addEventListener("color-changed", (e) => {
                // @ts-ignore
                setPickedColor(e.detail.value)
            }
        )
    })


    return <div class={styles.colorPickerRow}>
        <div class={styles.pickerContainer} ref={pickerPopupRef} style={{display: popupVisible() ? "block" : "none"}}>
            {/* TODO: Change to hex-alpha-color-picker when alpha fixed */}
            {/* @ts-ignore */}
            <hex-color-picker ref={colorPickerRef} color={pickedColor()}/>
            <div class={styles.toolRow}>
                <input
                    value={pickedColor()}
                    onkeydown={(e) =>
                        e.key == "Enter" && (e.target as HTMLInputElement).blur()
                    }
                    onChange={(e) => {
                        let t = (e.target as HTMLInputElement);
                        let v = t.value;
                        if (!v.startsWith("#")) v = "#" + v

                        // TODO: Uncomment and to slice(0, 9) when hex with alpha fixed
                        let color = v.slice(0, 7)
                        // if (color.length < 9) color = color.slice(0, 7)
                        if (color.length < 7) color = color.slice(0, 4)

                        if (!/^#[0-9a-fA-F]{3,9}$/.test(color)) {
                            color = "#000000"
                        }

                        t.value = color
                        setPickedColor(color)
                    }}
                    placeholder="#fff"
                />
                <button
                    onClick={finishPicking}
                    class="finishButton"
                    classList={{"accent": pickedColor() != props.color}}>{pickedColor() != props.color ? "Save" : "Exit"}
                </button>
            </div>
        </div>

        <div onClick={showPopup} class={styles.colorInfo}>
            <div class={styles.colorPreview}
                 style={{"background-color": pickedColor()}}/>
            <span>{props.label}</span>
        </div>
        <button onClick={showPopup}>Change</button>
    </div>
}