import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Index from "./routes";

const App = () => {
    return (
        <>
            <ToastContainer />
            <Index />
        </>
    );
}

export default App;
