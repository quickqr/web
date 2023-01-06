import styles from "./styles.module.sass"
import Logo from "../../assets/icons/logo.svg"
import GitLabIcon from "../../assets/icons/gitlab.svg"
import ApiIcon from "../../assets/icons/api.svg"
import packageInfo from "../../../package.json"
import {SidebarLink} from "./link";

export function Sidebar() {
    return <div class={styles.sidebar}>
        <div class={styles.logo}>
            <img alt="QuickQR" src={Logo}/>
            <span>Quick QR</span>
        </div>

        <div>
            <SidebarLink logo={GitLabIcon} title={"Source"} href={packageInfo.homepage}/>
            {/* TODO: Decide what URL to set for this (probably from .env and "/docs" by default) */}
            <SidebarLink logo={ApiIcon} title={"Docs"} href={"https://todo.com"}/>
        </div>
    </div>
}