import {createSignal, For} from "solid-js";
import styles from "./styles.module.sass"
import ChevronSvg from "../../../assets/icons/chevron.svg?component-solid"

interface Props {
    options: string[]
    selected?: number
    onChange: (s: string) => void
}

export function OptionSelect(props: Props) {
    const [isDropdownOpened, setDropdownOpened] = createSignal(false)

    function showDropdown() {
        setDropdownOpened(true)
        document.onmousedown = () => {
            document.onmousedown = null
            // Timeout for the input value to change (or it will lag a bit when changing)
            setTimeout(() => {
                setDropdownOpened(false)
            }, 200)
        }
    }

    return <div class={styles.dropdown}>
            <div onClick={showDropdown} class={styles.input}>
                <span>{props.options[props.selected ?? 0]}</span>
                <ChevronSvg class={styles.icon} classList={{[styles.rotated]: isDropdownOpened()}}/>
            </div>
            <div class={styles.optionList} classList={{[styles.shown]: isDropdownOpened()}}>
                <For each={props.options}>
                    {
                        (item, index) => {
                            return <div
                                onClick={() => index() != props.selected && props.onChange(props.options[index()])}>
                                {item}
                            </div>
                        }
                    }
                </For>
            </div>
    </div>
}
