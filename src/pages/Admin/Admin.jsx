import React, { useContext, useEffect, useRef } from "react";
import { observer } from "mobx-react-lite";
import classes from './admin.module.css'
import { useLocation, Outlet } from "react-router-dom";
import { Context } from "../..";
import Message from "../../components/Message/Message";
import Bottom from "../../components/Pages/Bottom/Bottom";
import NavBar from "../../components/NavBar/NavBar";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";

const Admin = () => {

    const location = useLocation()
    const {message, article} = useContext(Context)
    const refContainer = useRef() 

    useEffect(() => {
        window.scrollTo(0,0)
        article.clear()
        refContainer.current.onpointerdown = null
    }, [location.pathname])

    useEffect(() => {
        message.setMessage('')
    }, [])

    return (
        <div ref={refContainer} className={classes.container}>
            {message.message && <Message /> } 
            <NavBar />
            <div className={classes.wrapper}>
                <Breadcrumbs /> 
                <main><Outlet /></main>
            </div>
            <Bottom />
        </div>
    )
}

export default observer(Admin)