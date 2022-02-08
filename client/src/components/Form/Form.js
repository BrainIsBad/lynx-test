import React, {useState} from 'react';

import axios from 'axios';

import {useFiles} from '../../context/FilesContext';

import './styles.css';

export const Form = () => {

    const mb = 5;

    const maxFileSize = 1024 * 1024 * mb;

    const [files, setFiles] = useState(null);

    const {push} = useFiles();

    const inputChangeHandler = (e) => {
        if (e.target.files.length > 10) {
            e.target.value = '';
            alert('Files quantity must be less than 10');
        } else {
            setFiles(e.target.files);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if ((files?.length || 0) > 0) {
            const formData = new FormData();

            for (const file of files) {
                if (file.size <= maxFileSize) {
                    formData.append('files[]', file);
                }
            }

            axios.post('/api/files/upload', formData, {
                'Content-Type': 'multipart/form-data'
            }).then(res => {
                push(...res.data.uploadedFiles);
            }).catch(e => {
                console.log('error', e);
            });
        }
    };

    return (
        <form onSubmit={submitHandler} className={'formContainer'}>
            <input type="file" multiple={true} onChange={inputChangeHandler} maxLength={5120}/>
            <span>Max file size is { mb }mb (bigger files will be skipped)</span>

            <button className={'submitButton'}>
                Upload
            </button>
        </form>
    );
};