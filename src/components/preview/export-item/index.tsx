import styles from "./styles.module.sass"
import {createSignal} from "solid-js";
import {InfoTooltip} from "../../info-tooltip";

interface Props {
    title: string
    tooltipTitle: string
    description: string
    logo: string
    buttonText: string
    // Text to show when button is clicked
    buttonClickedText?: string
    // Works only if `isDisabled` == true
    onClick: () => void
    isDisabled?: boolean
}

export function ExportItem(props: Props) {
    const [buttonText, setButtonText] = createSignal(props.buttonText)

    function onButtonClick() {
        if (props.isDisabled) return

        if (props.buttonClickedText) {
            setButtonText(props.buttonClickedText)
            setTimeout(() => setButtonText(props.buttonText), 1500)
        }

        props.onClick()
    }

    return <div onClick={onButtonClick} class={styles.container}>
        <img src={props.logo} alt=""/>
        <div class={styles.text}>
            <span class={styles.title}>
                {props.title}
            </span>
            <InfoTooltip title={props.tooltipTitle} description={props.description}/>
        </div>
        <button classList={{"accent": !props.isDisabled}} class={styles.actionButton}>{buttonText()}</button>
    </div>
}
