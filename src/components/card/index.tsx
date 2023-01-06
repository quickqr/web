import styles from "./style.module.sass"
import {ParentProps} from "solid-js";

interface Props {
    title: string
    containerClass?: string
}

export function Card(props: ParentProps<Props>) {
    return <div class={`${styles.card} ${props.containerClass ?? ""}`}>
        <h1 class={styles.title}>{props.title}</h1>
        {props.children}
    </div>
}