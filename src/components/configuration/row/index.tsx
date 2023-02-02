import styles from "./styles.module.sass"
import {InfoTooltip} from "../../info-tooltip";
import {ParentProps} from "solid-js";

interface Props {
    label: string
    description: string
}

export function ConfigRow(props: ParentProps<Props>) {
    return <div class={styles.container}>
        <div class={styles.label}>
            {props.label}
            <InfoTooltip title={props.label} description={props.description}/>
        </div>
        <div>
            {props.children}
        </div>
    </div>
}
