import styles from "./styles.module.sass"
import {Component, Show} from "solid-js";

interface Props {
    logo: string | Component,
    title: string
    href: string
    invertLogo?: boolean
    forceAccentColor?: boolean
}

export function SidebarLink(props: Props) {
    return <a href={props.href} class={styles.link}
              classList={{[styles.invert]: props.invertLogo, [styles.forceAccentColor]: props.forceAccentColor}}>
        <Show when={typeof (props.logo) != "string"} keyed fallback={
            <img draggable={false}
                 src={props.logo as string} alt=""/>
        }>
            <props.logo/>
        </Show>
        <span>{props.title}</span>
    </a>

}