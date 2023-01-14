import QuestionSVG from "../../assets/icons/question.svg?component-solid";
import styles from "./styles.module.sass";
import CrossSvg from "../../assets/icons/cross.svg?component-solid"
import {ParentProps} from "solid-js";

interface Props {
    type: "info" | "error"
}

export function Callout(props: ParentProps<Props>) {
    return <div class={styles.callout} classList={{[styles.error]: props.type == "error"}}>
        {props.type == "info" ? <QuestionSVG/> : <CrossSvg/>}
        <div class={styles.data}>
            {props.children}
        </div>
    </div>
}