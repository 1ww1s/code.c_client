import React from "react";
import classes from './loaderDiv.module.css'

const LoaderDiv = function({props}){
    return (
        <div {...props} className={classes.container}>

        </div>
    )
}

export default LoaderDiv