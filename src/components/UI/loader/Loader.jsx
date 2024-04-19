import React from 'react';
import classes from './loader.module.css'

const Loader = ({color, ...props}) => {

    
    
    return (
        <div {...props} style={{border: `3px dashed ${color}`}} className={classes.loader}>
            
        </div>
    )
}

export default Loader