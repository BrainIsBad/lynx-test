import React from 'react';

import {Form} from './components';

import './index.css';

function App() {
    return (
        <div className={'mainContainer'}>
            <h1 style={{
                textAlign: 'center'
            }}>
                File Uploader
            </h1>

            <Form />

        </div>
    );
}

export default App;
