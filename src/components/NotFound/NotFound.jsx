import React from "react";
import classes from './notFound.module.css'

const NotFound = function(){

    return(
        <div className={classes.container}>
            <div className={classes.content}>
                <p>Страница не найдена</p>
                <h1>404</h1>
            </div>
        </div>
    )
}

export default NotFound