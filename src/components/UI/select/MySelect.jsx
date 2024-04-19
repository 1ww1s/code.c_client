import React from 'react';
import classes from './mySelect.module.css'

const MySelect = ({options, defaultValue, value, onChange, ...props}) => {
    return (
        <select 
            className={classes.select} 
            value={value} onChange={(e) => onChange(e.target.value)}
            {...props}
        >
            <option className={classes.option} disabled value="">{defaultValue}</option>
            {options.map(option => 
                <option className={classes.option} key={option.value} value={option.value}> 
                    {option.name} 
                </option>    
            )}
        </select>
    )
}

export default MySelect