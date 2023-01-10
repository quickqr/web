import styles from "./styles.module.sass"
import QuestionSvg from "../../assets/icons/question.svg"

interface Props {
    title: string
    description: string
}

export function InfoTooltip(props: Props) {
    return <div class={styles.info}>
        <img alt="?" src={QuestionSvg}/>
        {/*<QuestionSvg/>*/}
        <div class={styles.tooltip}>
            <h4>{props.title}</h4>
            <span>{props.description}</span>
        </div>
    </div>
}
