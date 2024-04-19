import React, { useRef } from "react";
import { observer } from 'mobx-react-lite'
import { useLocation, useNavigate } from 'react-router-dom'
import classes from './main.module.css'
import { isHome } from "../../utils";

const Main = function({fragments, title}){

    const locatoon = useLocation()
    const router = useNavigate()


    return (
        <div className={classes.container}>
            <div className={classes.decor_lg}></div>
            <div className={classes.decor_blocks}>
                <div className={classes.decor_block1}></div>
                <div className={classes.decor_block2}></div>
            </div>
            <div className={classes.decor_circle}></div>
            <div className={classes.decor_numbs1}>
                <p className={classes.decor_numb}>101010101010101010101010101010</p>
                <p className={classes.decor_numb}>101010101010101010101010101010</p>
                <p className={classes.decor_numb}>101010101010101010101010101010</p>

            </div>
            <div className={classes.wrapper}>
                <div className={classes.content}>
                    <div className={classes.title}>
                        {title}
                    </div>
                    <div>
                       {isHome(locatoon)(fragments[0], 0, classes)}
                    </div>
                    <div className={classes.buttonDiv}>
                        <button onClick={() => router('articles/learning')} className={classes.button}>Начать учиться</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Main)