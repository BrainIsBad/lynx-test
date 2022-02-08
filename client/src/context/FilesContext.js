import React, {createContext, useContext, useState} from 'react';

function noop() {}

const FilesContext = createContext({
    files: [],
    push: noop
});

export const useFiles = () => useContext(FilesContext);

export const FilesProvider = ({children}) => {
    const [files, setFiles] = useState([]);

    const push = (...elements) => {
        setFiles([...files, ...elements]);
    };

    const remove = (id) => {
        setFiles(files.filter(file => file._id !== id));
    };

    return (
        <FilesContext.Provider value={{files, push, remove}}>
            { children }
        </FilesContext.Provider>
    );
};
