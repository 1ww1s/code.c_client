import React, { useContext, useState } from "react";
import classes from './activateAccount.module.css'
import {Context} from '../..'
import {observer} from 'mobx-react-lite'
import { sendActivation } from "../../http/userAPI";
import MyButton from "../UI/button/MyButton";
import Loader from "../UI/loader/Loader";
import ErrorHandling from "../../error/ErrorHandling";

const ActivateAccount = function(){

    const { user, message } = useContext(Context)
    const [sentLink, setSentLink] = useState(null)
    const [loader, setLoader] = useState(false)

    async function sendActivationFunc(){
        user.setLoading(true)
        setLoader(true)
        try{
            const res = await sendActivation(user.user.email)
            setSentLink(res.message)
        }   
        catch(e) {
            ErrorHandling(e, message)
        }
        finally{
            user.setLoading(false)
            setLoader(false)
        }
    }


    return (
        <div className={classes.container}>
            {
                sentLink
                    ?
                <p className={classes.sentLink}>{sentLink}</p>
                    :
                <div className={classes.sendActivation}>
                    <p>Email не подтвержден!</p>
                    <div className={classes.buttonActivated}>
                        <MyButton disabled={user.isLoading} id={1} onClick={e => {sendActivationFunc()}}>
                            { loader ? <div className={classes.loader}><Loader /></div> : 'Отправить ссылку повторно' }
                        </MyButton>
                    </div>
                </div>
            }
        </div>
    )
}

export default observer(ActivateAccount)