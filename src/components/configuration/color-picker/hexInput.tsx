export function HexInput() {


    return <input
        pattern="[0-9a-fA-F]{3}([0-9a-fA-F]{3})?"
        // onkeydown={onPickerInputKeyup}
        // ref={pickerInputRef}
        placeholder="#"/>
}