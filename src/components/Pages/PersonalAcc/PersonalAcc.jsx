import React, { useContext, useState } from "react";
import {observer} from 'mobx-react-lite'
import MyButton from "../../UI/button/MyButton";
import Loader from "../../UI/loader/Loader";
import classes from './personalAcc.module.css'
import { Context } from "../../..";
import {  LOGIN_ROUTE } from "../../../utils/consts";
import { useNavigate } from 'react-router-dom'
import ErrorHandling from "../../../error/ErrorHandling";
import { logout, sendActivation, updateUserpic } from "../../../http/userAPI";
import SelectedArticles from "../../SelectedArticles/SelectedArticles";
import UserData from "../../UserData/UserData";
import ActivateAccount from "../../ActivateAccount/ActivateAccount";

const PersonalAcc = function(){

    const [loader, setLoader] = useState({})
    const { user, message } = useContext(Context)
    const router = useNavigate()
    
    function showLoader(e){
        const { id } = e.target;
        setLoader(ids => ({
            ...ids,
            [id]: true
          }));
    }

    function removeLoader(e){
        const { id } = e.target;
        setLoader(ids => ({
            ...ids,
            [id]: false
          }));
    }

    async function Logout(e){
        showLoader(e)
        user.setLoading(true)
        try{
            await logout()
            user.setIsAuth(false)
            user.setUser({})
            router(LOGIN_ROUTE)
        }
        catch(e){
            ErrorHandling(e, message)
        }
        finally{
            removeLoader(e)
            user.setLoading(false)
        }
    }
    
    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Аккаунт</h1>
        
            <div className={classes.userData}>
               <UserData />
            </div>
            {
                !user.user.isActivated
                    && 
                <div className={classes.activated}>
                {
                    <ActivateAccount />
                }
                </div>
            }

            <div className={classes.selectedArticles}>
                <SelectedArticles />
            </div>

            <div className={classes.button}>
                <MyButton disabled={user.isLoading} id={0} onClick={(e) => {Logout(e)}}> 
                    { loader[0] ? <div className={classes.loader}><Loader /></div> : 'Выйти из аккаунта' }
                </MyButton>
            </div>      
        </div>
    )
}

export default observer(PersonalAcc)