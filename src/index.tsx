/* @refresh reload */
import {render} from 'solid-js/web';
import './index.sass';
import App from './App';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_HOST + "/api/v1"

render(() => <App/>, document.getElementById('root') as HTMLElement);
