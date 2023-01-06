import type {Component} from 'solid-js';
import {createSignal} from "solid-js";
import {Sidebar} from "./components/sidebar";
import {DataInput} from "./components/data-input";
import {PreviewSidebar} from "./components/preview";

// TODO: Add timeout
const App: Component = () => {
    const [data, setData] = createSignal<string>()

    return (
        <>
            <Sidebar/>
            <div class="main">
                <DataInput onChange={(s) => setData(s)}/>
            </div>
            <PreviewSidebar/>
        </>
    );
};

export default App;
