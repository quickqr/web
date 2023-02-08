import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {Card} from "./components/card";
import {ColorPicker} from "./components/configuration/color-picker";
import {NumberInput} from "./components/configuration/number-input";
import {OptionSelect} from "./components/configuration/select";
import {QRConfig, RecoveryLevel, Shape, ModuleShape} from "./types";
import {IconSelectCard} from "./components/icon-select";
import {ConfigRow} from "./components/configuration/row";
import {SwitchInput} from "./components/switch";
import {urlUtils} from "./url";


const App: Component = () => {
    const [config, setConfig] = createSignal<QRConfig>(urlUtils.parseQRConfig())
    const [isTyping, setTypingState] = createSignal(false)


    function shapeSelect(field: "finder" | "module", ) {
        const v = field == "finder" ? Shape : ModuleShape;
        return <OptionSelect
            options={Object.keys(v)}
            selected={Object.values(v).indexOf(config()[field] ?? v.Square)}
            onChange={(s: string) => {
                setConfig({
                    ...config(),
                    // @ts-ignore
                    [field]: v[s]
                })
            }}
        />
    }

    return (
        <>
            <Sidebar/>
            <div class="main">
                <DataInput
                    value={config().data}
                    onChange={(s) => {
                        if (s != config().data) {
                            setConfig({...config(), data: s})
                        }
                    }}
                    onTypingStateUpdate={setTypingState}
                />
                <section class="configuration">
                    <div class="col">
                        <IconSelectCard onChange={(s) => {console.log(s);setConfig({...config(), logo: s})}} value={config().logo}/>
                        <Card title="Advanced">
                            <ConfigRow label="Error correction" description="QR Code has error correction capability to restore data if the code is dirty or damaged.">
                                <OptionSelect
                                    options={Object.keys(RecoveryLevel)}
                                    selected={Object.values(RecoveryLevel).indexOf(config().recoveryLevel ?? RecoveryLevel.Medium)}
                                    onChange={(s: string) => {
                                        setConfig({
                                            ...config(),
                                            recoveryLevel: s.toLowerCase() as RecoveryLevel
                                        })
                                    }} />
                            </ConfigRow>
                            <ConfigRow label="Version" description="Version controls maximum capacity of a QR code.">
                                <NumberInput
                                    unit={undefined}
                                    nullable
                                    placeholder="Auto"
                                    value={config().version}
                                    min={1}
                                    max={40}
                                    onChange={(n) => {
                                        setConfig({...config(), version: n})
                                    }}
                                />
                            </ConfigRow>
                        </Card>
                    </div>
                    <div class="col">
                        <Card title="Styling" containerClass="config-card">
                            <ColorPicker
                                label="Background"
                                color={config().backgroundColor ?? "#ffffff"}
                                onChange={(v) => {
                                    setConfig({...config(), backgroundColor: v})
                                }}
                            />
                            <ColorPicker
                                label="Foreground"
                                color={config().foregroundColor ?? "#000000"}
                                onChange={(v) => {
                                    setConfig({...config(), foregroundColor: v})
                                }}
                            />

                            <ConfigRow  disabled={!config().logo} label="Logo Space" description="Nothing will be drawn behind the logo">
                                <SwitchInput value={config().logoSpace ?? true}  onChange={(v) => setConfig({...config(), logoSpace: v})} />
                            </ConfigRow>
                            <ConfigRow  disabled={!config().logo || !config().logoSpace}
                                        label="Logo Scale"
                                        description="Scale of logo relative to its container. Works only when logo space enabled."
                            >
                                <NumberInput
                                    unit="%"
                                    value={config().logoScale ?? 80}
                                    min={50}
                                    max={100}
                                    onChange={(n) => setConfig({...config(), logoScale: n})}
                                />
                            </ConfigRow>
                            <ConfigRow label="Image size" description="Image size controls how big your image will be">
                                <NumberInput
                                    unit="px"
                                    value={config().size ?? 512}
                                    min={128}
                                    max={4096}
                                    onChange={(n) => setConfig({...config(), size: n})}
                                />
                            </ConfigRow>

                            {/* TODO: Add check that value is less than image size */}
                            <ConfigRow label="Quiet zone" description="Controls padding around the QR code. Helps scanners to identify QR code">
                                <NumberInput
                                    unit="px"
                                    value={config().quietZone ?? 30}
                                    min={0}
                                    // 1/10 from the max size of the QR code (4096)
                                    max={400}
                                    onChange={(n) => setConfig({...config(), quietZone: n})}
                                />
                            </ConfigRow>

                            <ConfigRow label="Finders shape" description="Controls appearance of big squares in corners.">
                                {shapeSelect("finder")}
                            </ConfigRow>
                            <ConfigRow label="Module shape" description="Controls appearance of little squares.">
                                {shapeSelect("module")}
                            </ConfigRow>

                            <ConfigRow label="Gap" description="Padding between little squares in percents relative to their size">
                                <NumberInput
                                    unit="%"
                                    value={config().gap ?? 0}
                                    min={0}
                                    max={50}
                                    onChange={(n) => setConfig({...config(), gap: n})}
                                />
                            </ConfigRow>
                        </Card>
                    </div>
                </section>
            </div>
            <PreviewSidebar isTyping={isTyping()} config={config()}/>
        </>
    );
};

export default App;
