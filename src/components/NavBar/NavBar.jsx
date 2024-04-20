import React, { useEffect, useRef, useState } from "react";
import classes from './navBar.module.css'
import { observer } from 'mobx-react-lite';
import { useContext } from "react";
import { Context } from "../..";
import { Link, useParams, useLocation } from "react-router-dom";
import { HOME_ROUTE, PERSONAL_ACCOUNT_ROUTE} from "../../utils/consts";
import acc from '../../assets/acc.png' 
import ArticlesLast from "../AticlesLast/ArticlesLast";


const NavBar = function(){
    const {section: sectionName} = useParams()
    const {section} = useContext(Context)
    const location = useLocation()
    
    const isHome = location.pathname === HOME_ROUTE
    const isAdmin = location.pathname.startsWith('/admin')
    const refList = useRef()    
    const refContainer = useRef()
    const refNavHomeBox = useRef()
    const refNavigationBox = useRef()
    const refDarken = useRef()
    const refAcc = useRef()

    useEffect(() => {
        if(location.pathname === HOME_ROUTE) refContainer.current.classList.add(`${classes.home}`)
        else refContainer.current.classList.remove(`${classes.home}`)
    }, [])

    useEffect(() => {
        if(!refNavHomeBox.current) return
        if(location.pathname.startsWith('/admin')) refNavHomeBox.current.classList.add(`${classes.adminPanel}`)
        else refNavHomeBox.current.classList.remove(`${classes.adminPanel}`)
    }, [])

    useEffect(() => {
        if(!refList.current) return
        if(location.pathname === HOME_ROUTE) refList.current.classList.add(`${classes.home}`)
        else refList.current.classList.remove(`${classes.home}`)
    }, [])
    useEffect(() => {
        if(!refAcc.current) return
        if(location.pathname === HOME_ROUTE) refAcc.current.classList.add(`${classes.home}`)
        else refAcc.current.classList.remove(`${classes.home}`)
    }, [])

    const firstUpdate = useRef(true);
    useEffect(() => {
        if(firstUpdate.current) firstUpdate.current = false
        else closeMenu()
    }, [location.pathname])

    
    function closeMenu(){
        refNavigationBox.current.classList.remove(classes.open)
        refDarken.current.classList.remove(classes.open)
    }
    function Menu(){
        refNavigationBox.current.classList.toggle(classes.open)
        refDarken.current.classList.toggle(classes.open)
    }


    return (
        <div ref={refContainer} className={classes.container}>
            <div ref={refDarken} onClick={() => Menu()} className={classes.darken}></div>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div onClick={() => Menu()} className={classes.burger}></div>
                    <div ref={refNavigationBox} className={classes.navigationBox}>
                        <div className={classes.navigation}>
                            <div className={classes.hr} /> 
                            {   
                                (!isHome || isAdmin)
                                    &&
                                <div className={classes.navHome}>
                                    <div ref={refNavHomeBox} className={classes.navHomeBox}>
                                        <Link to={HOME_ROUTE}>Code.C</Link>
                                    </div>
                                </div>
                            }
                            {
                                !isAdmin
                                    &&   
                                <nav className={classes.nav}>
                                    <ul ref={refList} className={classes.navList}>
                                        {  
                                            location.pathname === HOME_ROUTE
                                                    ?
                                            section.sections?.map((section, ind) => 
                                                <li className={ sectionName === section.value ? classes.highlight : '' } key={ind}>
                                                    <Link to={section.value === 'home' ? '/' :`/articles/${section.value}`}>{section.name}</Link>
                                                </li>
                                            )
                                                    :
                                            section.sections?.filter((_, ind) => ind !== 0)
                                            .map((section, ind) => 
                                                <li className={ sectionName === section.value ? classes.highlight : '' } key={ind}>
                                                    <Link to={`/articles/${section.value}`}>{section.name}</Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </nav>
                            }
                        </div>
                        <div className={classes.articlesLast}>
                        <div className={classes.hr} /> 
                        {
                            !isAdmin
                                &&
                            <ArticlesLast />
                        }
                        </div>
                    </div>
                    <div ref={refAcc} className={classes.acc}>
                        <Link to={PERSONAL_ACCOUNT_ROUTE} className={classes.accA}> 
                            <img className={classes.accImg} src={acc} /> личный кабинет
                        </Link>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default observer(NavBar)