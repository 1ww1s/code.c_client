import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../..' 
import { useNavigate } from 'react-router-dom'
import { LOGIN_ROUTE } from '../../utils/consts';
import classes from './personalAccount.module.css'
import {observer} from 'mobx-react-lite'
import PersonalAcc from '../../components/Pages/PersonalAcc/PersonalAcc';
import NavBar from '../../components/NavBar/NavBar';
import Bottom from '../../components/Pages/Bottom/Bottom';

const PersonalAccount = () => {

    const { user } = useContext(Context)
    const router = useNavigate()
   
    useEffect(() => {
        window.scrollTo(0,0)
        if(!user.isAuth) router(LOGIN_ROUTE)
    }, [])

    return (
        <div className={classes.container}>
            {   
                user.isAuth 
                    &&
                <div className={classes.content}>
                    
                    <NavBar />
                    <div className={classes.wrapper}>
                        <PersonalAcc />
                    </div>
                    <Bottom />
                </div>
            }
        </div>
    )
}

export default observer(PersonalAccount)