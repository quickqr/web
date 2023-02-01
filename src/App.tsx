import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {Card} from "./components/card";
import {ColorPicker} from "./components/configuration/color-picker";
import {NumberInput} from "./components/configuration/number-input";
import {OptionSelect} from "./components/configuration/select";
import {QRConfig, RecoveryLevel} from "./types";
import {IconSelectCard} from "./components/icon-select";


function configFromURLSearchParams(): QRConfig {
    const params = Object.fromEntries(new URLSearchParams(location.search))
    // @ts-ignore
    const c: QRConfig = {...params}
    c.quietZone = +(params.quietZone ?? 30)
    c.size = +(params.size ?? 512)
    c.version = 0

    if (params.version) {
        let v = +(params.version ?? 0)
        if (v >= 0 && v <= 40)
            c.version = v
    }

    if (!Object.values(RecoveryLevel).includes(params.recoveryLevel as RecoveryLevel)) {
        c.recoveryLevel = RecoveryLevel.Medium
    }

    c.logoSpace = params.logoSpace == "true"

    return c
}

const App: Component = () => {
    const [config, setConfig] = createSignal<QRConfig>(configFromURLSearchParams())
    const [isTyping, setTypingState] = createSignal(false)

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
                        <Card title="Advanced" containerClass="config-card">
                            <OptionSelect
                                label="Error correction"
                                description="QR Code has error correction capability to restore data if the code is dirty or damaged."
                                options={Object.keys(RecoveryLevel)}
                                selected={Object.values(RecoveryLevel).indexOf(config().recoveryLevel ?? RecoveryLevel.Medium)}
                                onChange={(s: string) => {
                                    setConfig({
                                        ...config(),
                                        recoveryLevel: s.toLowerCase() as RecoveryLevel
                                    })
                                }}
                            />
                            <NumberInput
                                unit={undefined}
                                nullable
                                label="Version"
                                tooltipText="Version controls maximum capacity of a QR code."
                                placeholder="Auto"
                                value={config().version != 0 ? config().version : undefined}
                                min={1}
                                max={40}
                                onChange={(n) => setConfig({...config(), version: n})}
                            />
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
                            <NumberInput
                                unit="px"
                                label="Image size"
                                tooltipText="Image size controls how big your image will be"
                                value={config().size ?? 512}
                                min={128}
                                max={4096}
                                onChange={(n) => setConfig({...config(), size: n})}
                            />
                            {/* TODO: Add check that value is less than image size */}
                            <NumberInput
                                unit="px"
                                label="Quiet zone"
                                tooltipText="Also known as border size, controls padding around the QR code."
                                value={config().quietZone ?? 30}
                                min={0}
                                // 1/10 from the max size of the QR code (4096)
                                max={400}
                                onChange={(n) => setConfig({...config(), quietZone: n})}
                            />
                        </Card>
                    </div>
                </section>
            </div>
            <PreviewSidebar isTyping={isTyping()} config={config()}/>
        </>
    );
};

export default App;
