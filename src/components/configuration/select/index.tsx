import {createSignal, For} from "solid-js";
import styles from "./styles.module.sass"
import {InfoTooltip} from "../../info-tooltip";
import ChevronSvg from "../../../assets/icons/chevron.svg?component-solid"

interface Props {
    label: string
    description: string
    options: string[]
    selected?: number
    onChange: (s: string) => void
}

export function OptionSelect(props: Props) {
    const [isDropdownOpened, setDropdownOpened] = createSignal(false)

    function showDropdown() {
        setDropdownOpened(true)
        document.onmousedown = () => {
            // Timeout for the input value to change (or it will lag a bit when changing)
            setTimeout(() => {
                setDropdownOpened(false)
                document.onmousedown = null
            }, 200)
        }
    }

    return <div class={styles.container}>
        <div class={styles.label}>
            {props.label}
            <InfoTooltip title={props.label} description={props.description}/>
        </div>

        <div class={styles.dropdown}>
            <div onClick={showDropdown} class={styles.input}>
                <span>{props.options[props.selected ?? 0]}</span>
                <ChevronSvg class={styles.icon} classList={{[styles.rotated]: isDropdownOpened()}}/>
            </div>
            <div class={styles.optionList} classList={{[styles.shown]: isDropdownOpened()}}>
                <For each={props.options}>
                    {
                        (item, index) => <div onClick={() => props.onChange(props.options[index()])}>
                            {item}
                        </div>
                    }
                </For>
            </div>
        </div>
    </div>
}
