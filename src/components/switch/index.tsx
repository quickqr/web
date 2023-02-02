import styles from "./styles.module.sass"

interface Props {
    value: boolean,
    onChange: (v: boolean) => void
}

export function SwitchInput(props: Props) {
    return <div onClick={() => props.onChange(!props.value)} class={styles.container} classList={{ [styles.active]: props.value }}>
        <div class={styles.thumb} />
    </div>
}
