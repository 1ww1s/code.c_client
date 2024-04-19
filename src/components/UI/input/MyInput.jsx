import React from 'react';
import classes from './myInput.module.css'

const MyInput = (props) => {



    return (
        <input                
            onFocus={(e)=>{
                e.target.classList.toggle(classes.active)
            }}
            onBlur={(e)=>{
                e.target.classList.toggle(classes.active)
            }} 
            {...props} className={classes.container} 
        />
    )
}

export default MyInput