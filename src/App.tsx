import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {QRConfig} from "./types";
import {Card} from "./components/card";
import {ColorPicker} from "./components/configuration/color-picker";
import {NumberInput} from "./components/configuration/number-input";

// TODO: Add timeout
const App: Component = () => {
    // TODO: Load config from URL params if any
    const [config, setConfig] = createSignal<QRConfig>({})

    return (
        <>
            <Sidebar/>
            <div class="main">
                <DataInput onChange={(s) => {
                    if (s != config().data) {
                        setConfig({...config(), data: s})
                    }
                }}/>
                <section class="configuration">
                    <div class="col">
                        <Card title="General" containerClass="config-card">
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
                                label="Image size"
                                tooltipText="Image size controls how big your image will be"
                                value={config().size ?? 512}
                                min={128}
                                max={4096}
                                onChange={(n) => setConfig({...config(), size: n})}
                            />
                            <NumberInput
                                label="Quiet zone"
                                tooltipText="Also known as border size, controls padding around the QR code."
                                value={config().borderSize ?? 30}
                                min={0}
                                max={100}
                                onChange={(n) => setConfig({...config(), borderSize: n})}
                            />
                        </Card>
                    </div>
                    <div class="col">
                    </div>
                </section>
            </div>
            <PreviewSidebar config={config()}/>
        </>
    );
};

export default App;
