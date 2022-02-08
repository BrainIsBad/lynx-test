import React from 'react';

import axios from 'axios';

import {useFiles} from '../../context/FilesContext';

export const TableRow = ({file}) => {

    const {filename, size} = file;

    const {remove} = useFiles();

    const deleteHandler = () => {
        axios.delete(`/api/files/${file._id}`).then(res => {
            if (res.data.success) {
                remove(file._id);
            }
        });
    };

    const downloadHandler = () => {
        const arrayBuffer = new Uint8Array(file.buffer.data).buffer;

        const blob = new Blob([arrayBuffer]);

        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', filename);
            link.style.visibility = 'hidden';
            link.click();
        }
    };

    return (
        <tr>
            <td>
                { filename }
            </td>
            <td>
                { size }
            </td>
            <td>
                <button onClick={downloadHandler}>
                    Download
                </button>

                <br/>

                <button onClick={deleteHandler}>
                    Delete
                </button>
            </td>
        </tr>
    );
};