import React from 'react';
import classes from './myInput.module.css'

const MyInput = ({refInput, ...props}) => {



    return (
        <input            
            ref={refInput} 
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