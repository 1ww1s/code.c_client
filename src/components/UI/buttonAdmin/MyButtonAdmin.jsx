import React from 'react';
import classes from './myButtonAdmin.module.css'

const MyButtonAdmin = ({children, ...props}) => {



    return (
        <button          
            {...props} 
            className={classes.container} 
        >
            {children}
        </button>
    )
}

export default MyButtonAdmin