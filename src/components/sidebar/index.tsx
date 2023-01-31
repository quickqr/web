import styles from "./styles.module.sass"
import Logo from "../../assets/favicon.ico"
import GithubIcon from "../../assets/icons/github.svg?component-solid"
import ApiIcon from "../../assets/icons/api.svg?component-solid"
import packageInfo from "../../../package.json"
import {SidebarLink} from "./link";

export function Sidebar() {
    return <div class={styles.sidebar}>
        <div class={styles.logo}>
            <img alt="QuickQR" src={Logo}/>
            <span>Quick QR</span>
        </div>

        <div>
            <SidebarLink logo={GithubIcon} title={"Source"} href={packageInfo.homepage} forceAccentColor/>
            <SidebarLink
                forceAccentColor
                logo={ApiIcon}
                title="Docs"
                href={import.meta.env.VITE_API_HOST + "/docs"}
            />
        </div>
    </div>
}