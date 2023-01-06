import styles from "./styles.module.sass"

interface Props {
    logo: string,
    title: string
    href: string
    invertLogo?: boolean
}

export function SidebarLink(props: Props) {
    return <a href={props.href} class={styles.link} classList={{[styles.invert]: props.invertLogo}}>
        <img draggable={false} src={props.logo} alt=""/>
        <span>{props.title}</span>
    </a>

}