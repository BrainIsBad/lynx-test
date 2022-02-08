import React, {useEffect} from 'react';
import axios from 'axios';

import {useFiles} from '../../context/FilesContext';

import {TableHead} from './TableHead';
import {TableRow} from './TableRow';

import './styles.css';

export const FileList = () => {

    const {files, push} = useFiles();

    useEffect(() => {
        axios.get('/api/files/').then(res => {
            push(...res.data.files);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    return (
        <div className={'tableContainer'}>
            <table>
                <TableHead />
                <tbody>
                {
                    files.map((file, key) =>
                        <TableRow key={key} file={file} />)
                }
                </tbody>
            </table>
        </div>
    );
};