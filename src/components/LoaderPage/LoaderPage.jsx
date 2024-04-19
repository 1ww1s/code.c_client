import React from "react";
import classes from './loaderPage.module.css'

const LoaderPage = function(){
    return (
        <div className={classes.container}>
            <div className={classes.loadingIndicator}>
            <div className={classes.elemIndicator}></div>
            <div className={classes.elemIndicator}></div>
            <div className={classes.elemIndicator}></div>
        </div>
        </div>
    )
}

export default LoaderPage