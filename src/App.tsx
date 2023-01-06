import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";
import {QRConfig, RecoveryLevel} from "./types.d";

// TODO: Add timeout
const App: Component = () => {
    // TODO: Load config from URL params if any
    const [config, setConfig] = createSignal<QRConfig>({
        size: 512,
        backgroundColor: "#ffffff",
        logoScale: 0.2,
        recoveryLevel: RecoveryLevel.Medium,
        borderSize: 30,
        foregroundColor: "#000000",
    })

    return (
        <>
            <Sidebar/>
            <div class="main">
                <DataInput onChange={(s) => {
                    if (s != config().data) {
                        setConfig({...config(), data: s})
                    }
                }}/>
            </div>
            <PreviewSidebar config={config()}/>
        </>
    );
};

export default App;
