import { render } from '@wordpress/element';
import App from "./App";

/**
 * Import the stylesheet for the plugin.
 */
import './style/main.css';
import {Provider} from "react-redux";
import store from "./app/store";

// Render the App component into the DOM
render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('react-user-data'));