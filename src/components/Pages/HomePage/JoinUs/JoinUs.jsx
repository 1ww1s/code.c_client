import React, { useContext, useState } from "react";
import classes from './joinUs.module.css'
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate } from "react-router-dom";
import { isHome } from "../../utils";
import MyButton from "../../../UI/button/MyButton";
import MyInput from "../../../UI/input/MyInput";
import arrow from '../../../../assets/arrow-blue-small.png'
import { Context } from "../../../..";
import { PERSONAL_ACCOUNT_ROUTE, REGISTRATION_ROUTE } from "../../../../utils/consts";

const JoinUs = function({fragments, title}){

    const location = useLocation()
    const [email, setEmail] = useState('')
    const {user} = useContext(Context)
    const router = useNavigate()

    function click(){
        if(user.isAuth){
            router(PERSONAL_ACCOUNT_ROUTE)
        }
        else{
            user.setUser({email})
            router(REGISTRATION_ROUTE)
        }
    }

    function content(fragments){
        const choiceElem = isHome(location) 
        let length = fragments.length;
        let content = []
        for (let i = 1; i < length; i++){
            content.push(choiceElem(fragments[i], i, classes))
        }
        return content
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.texts}>
                        <div className={classes.titleDiv}><h1 className={classes.title}>{title}</h1></div>
                        {content(fragments)}
                    </div>
                    
                    <div className={classes.codeDiv}><div className={classes.code}>{isHome(location)(fragments[0], 0, classes)}</div></div>
                                                                                                                                       
                </div>
                <div className={classes.registration}>
                    <img className={classes.arrow} src={arrow}></img>
                    <div className={classes.actions}>
                        <div className={classes.input}>
                            <MyInput 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                style={{border:'0', borderRadius:'50px', fontSize:'12px'}} 
                                placeholder=">ЭЛЕКТОННАЯ ПОЧТА" 
                            />
                        </div>
                        <div className={classes.button}>
                            <MyButton onClick={click} style={{borderRadius:'50px'}}><span className={classes.buttonText}>{'ЗАРЕГИСТРИРОВАТЬСЯ ->>'}</span></MyButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(JoinUs)