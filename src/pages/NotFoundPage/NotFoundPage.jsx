import React from "react";
import classes from './notFoundPage.module.css'
import NotFound from "../../components/NotFound/NotFound";
import NavBar from "../../components/NavBar/NavBar";
import Bottom from "../../components/Pages/Bottom/Bottom";


const NotFoundPage = function(){
    return (
        <div className={classes.container}>
            <NavBar />
            <div className={classes.wrapper}>
                <NotFound />
            </div>
            <Bottom />
        </div>
    )
}

export default NotFoundPage