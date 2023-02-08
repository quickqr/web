import styles from "./style.module.sass"
import {ParentProps} from "solid-js";

interface Props {
    title: string
    containerClass?: string
    buttonTitle?: string
    buttonClick?: () => void
    buttonVisible?: boolean
}

export function Card(props: ParentProps<Props>) {
    return <div class={`${styles.card} ${props.containerClass ?? ""}`}>
        <div class={styles.title}>
            <h1>{props.title}</h1>
            <button
                classList={{[styles.hidden]: !props.buttonVisible}}
                onClick={props.buttonClick}>
                {props.buttonTitle ?? "Action"}
            </button>
        </div>
        {props.children}
    </div>
}