import React from 'react';

import './styles.css';

export const Form = () => {

    const submitHandler = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={submitHandler} className={'formContainer'}>
            <input type="file" multiple={true}/>

            <button className={'submitButton'}>
                Upload
            </button>
        </form>
    );
};