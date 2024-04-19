import React, { useContext, useEffect, useState } from "react";
import classes from './sidebar.module.css'
import { observer } from 'mobx-react-lite'
import ArticlesLast from "../AticlesLast/ArticlesLast";

const Sidebar = function({sidebar}){

    return(
        <div className={classes.container}>
            <h2 className={classes.h2}>Навигация по странице</h2>
            <nav className={classes.navPage}>
                <ol>
                    {sidebar.map((title, ind) => 
                        <li key={ind}><a href={`#${title}`}>{title}</a></li>
                    )}
                </ol>
            </nav>
            <ArticlesLast />
        </div>
    )
}

export default observer(Sidebar)