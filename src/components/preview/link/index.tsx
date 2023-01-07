import styles from "./styles.module.sass"
import {createSignal} from "solid-js";

interface Props {
    title: string
    description: string
    logo: string
    buttonText: string
    // Text to show when button is clicked
    buttonClickedText?: string
    // Works only if `isDisabled` == true
    onClick: () => void
    isDisabled?: boolean
}

export function PreviewLink(props: Props) {
    const [buttonText, setButtonText] = createSignal(props.buttonText)

    function onButtonClick() {
        if (props.isDisabled) return

        if (props.buttonClickedText) {
            setButtonText(props.buttonClickedText)
            setTimeout(() => setButtonText(props.buttonText), 1500)
        }

        props.onClick()
    }

    return <div onClick={onButtonClick} class={styles.linkContainer}>
        <img src={props.logo} alt=""/>
        <div class={styles.text}>
            <span class={styles.title}>{props.title}</span>
            <span class={styles.description}>{props.description}</span>
        </div>
        <button classList={{"accent": !props.isDisabled}} class={styles.actionButton}>{buttonText()}</button>
    </div>
}
