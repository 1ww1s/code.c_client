import React, { useEffect } from 'react';
import classes from './myButton.module.css'

const MyButton = ({children, ...props}) => {

    return (
        <button
            {...props} 
            className={classes.container} 
        >
            {children}
        </button>
    )
}

export default MyButton