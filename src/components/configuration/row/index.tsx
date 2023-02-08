import styles from "./styles.module.sass"
import {InfoTooltip} from "../../info-tooltip";
import {ParentProps} from "solid-js";

interface Props {
    label: string
    description: string
    disabled?: boolean
}

export function ConfigRow(props: ParentProps<Props>) {
    return <div class={styles.container} >
        <div class={styles.label}>
            <span classList={{ "disabled": props.disabled}}>
                {props.label}
            </span>
            <InfoTooltip title={props.label} description={props.description}/>
        </div>
        <div classList={{ "disabled": props.disabled}}>
            {props.children}
        </div>
    </div>
}
