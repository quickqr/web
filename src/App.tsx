import type {Component} from 'solid-js';
import {createSignal, Switch} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {Card} from "./components/card";
import {ColorPicker} from "./components/configuration/color-picker";
import {NumberInput} from "./components/configuration/number-input";
import {OptionSelect} from "./components/configuration/select";
import {QRConfig, RecoveryLevel, Shape} from "./types";
import {IconSelectCard} from "./components/icon-select";
import {parseEnumFromString} from "./utils";
import {ConfigRow} from "./components/configuration/row";
import {SwitchInput} from "./components/switch";


function initializeConfig(): QRConfig {
    const params = Object.fromEntries(new URLSearchParams(location.search))
    const c: QRConfig = {...params}

    if (params.quietZone) c.quietZone = +params.quietZone
    if (params.version) c.version = +params.version
    if (params.size) c.size = +params.size
    if (params.gap) c.gap = +params.gap

    if (params.logoSpace) c.logoSpace = params.logoSpace == "true"

    if (params.version) {
        let v = +(params.version)
        if (v >= 0 && v <= 40)
            c.version = v
    }

    c.recoveryLevel = parseEnumFromString(params.recoveryLevel, RecoveryLevel)
    c.finder = parseEnumFromString(params.finder, Shape)
    c.module = parseEnumFromString(params.module, Shape)

    return c
}

const App: Component = () => {
    const [config, setConfig] = createSignal<QRConfig>(initializeConfig())
    const [isTyping, setTypingState] = createSignal(false)


    function shapeSelect(field: "finder" | "module") {
        return <OptionSelect
            options={Object.keys(Shape)}
            selected={Object.values(Shape).indexOf(config()[field] ?? Shape.Square)}
            onChange={(s: string) => {
                setConfig({
                    ...config(),
                    [field]: s.toLowerCase() as Shape
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
                        <IconSelectCard onChange={(s) => setConfig({...config(), logo: s})} value={config().logo}/>
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
                                        console.log(n)
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

                            <ConfigRow label="Logo Space" description="No modules will be drawn behind the logo">
                                <SwitchInput value={config().logoSpace ?? false}  onChange={(v) => setConfig({...config(), logoSpace: v})} />
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
                            <ConfigRow label="Quiet zone" description="Also known as border size, controls padding around the QR code.">
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
                            <ConfigRow label="Module shape" description="Controls appearance of little squares in corners.">
                                {shapeSelect("module")}
                            </ConfigRow>

                            <ConfigRow label="Gap" description="Padding between modules in percents relative to module size">
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
