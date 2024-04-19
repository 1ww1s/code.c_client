import React, { useContext } from 'react';
import classes from './navBarAuth.module.css'
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../../utils/consts';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const NavBarAuth = () => {

    const {user} = useContext(Context)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <Link to={HOME_ROUTE} className={classes.home}>Code.C</Link>
                <h2 className={classes.acc}>Аккаунт</h2>
            </div>
        </div>
    )
}

export default observer(NavBarAuth)