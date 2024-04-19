import React, { useContext, useEffect } from 'react';
import NavBarAuth from '../../components/NavBarAuth/NavBarAuth';
import classes from './auth.module.css'
import FormAuth from '../../components/FormAuth/FormAuth';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { PERSONAL_ACCOUNT_ROUTE } from '../../utils/consts';

const Auth = () => {

    const {user} = useContext(Context)
    const router = useNavigate()

    useEffect(() => {
        window.scrollTo(0,0)
        if(user.isAuth) router(PERSONAL_ACCOUNT_ROUTE)
    }, [])
    

    return (
        <div className={classes.container}>
            <NavBarAuth />
            <div className={classes.content}>
                <FormAuth />
            </div>
        </div>
    )
}

export default observer(Auth)