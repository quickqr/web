import Icon from "../../assets/icons/loading.svg"
import styles from "./styles.module.sass"

export function LoadingIcon(props: { size: number }) {
    return <img class={styles.loadingIcon} src={Icon}
                style={{width: props.size + "px", height: "auto"}}
                alt="Loading..."/>
}
