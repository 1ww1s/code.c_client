import React from 'react';
import classes from './error.module.css'

const Error = ({messageError}) => {
    return (
        <div className={classes.sign_error} >
           {messageError && '*'}{messageError}
        </div>
    )
}

export default Error