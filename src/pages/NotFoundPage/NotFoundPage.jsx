import React, { useEffect } from "react";
import classes from './notFoundPage.module.css'
import NotFound from "../../components/NotFound/NotFound";
import NavBar from "../../components/NavBar/NavBar";
import Bottom from "../../components/Pages/Bottom/Bottom";
import { abortController, reinitController } from "../../http/abortController";
import { Helmet } from "react-helmet-async";


const NotFoundPage = function(){

    useEffect(() => {
        window.scrollTo(0,0)
        abortController()   // для прерывания предыдущих запросов
        reinitController()
    }, [])
    
    return (
        <div className={classes.container}>
            <Helmet>
                <title>404 | Code-C</title>
                <meta name="description" content="Страница или контент на странице не найден, ошибка 404" />
            </Helmet>
            <NavBar />
            <div className={classes.wrapper}>
                <NotFound />
            </div>
            <Bottom />
        </div>
    )
}

export default NotFoundPage