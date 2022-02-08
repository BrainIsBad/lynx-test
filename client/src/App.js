import React from 'react';

import {Form, FileList} from './components';

import {FilesProvider} from './context/FilesContext';

import './index.css';

function App() {
    return (
        <div className={'mainContainer'}>
            <h1 style={{
                textAlign: 'center'
            }}>
                File Uploader
            </h1>

            <FilesProvider>
                <Form />

                <FileList />
            </FilesProvider>
        </div>
    );
}

export default App;
