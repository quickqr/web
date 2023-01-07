import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {QRConfig} from "./types";
import {Card} from "./components/card";
import {ColorPicker} from "./components/configuration/color-picker";

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
                        <Card title="Colors" containerClass="config-card">
                            <ColorPicker title="Background" color={config().backgroundColor ?? "#ffffff"}
                                         onChange={(v) => {
                                             setConfig({...config(), backgroundColor: v})
                                         }}/>
                            <ColorPicker title="Foreground" color={config().foregroundColor ?? "#000000"}
                                         onChange={(v) => {
                                             setConfig({...config(), foregroundColor: v})
                                         }}/>
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
