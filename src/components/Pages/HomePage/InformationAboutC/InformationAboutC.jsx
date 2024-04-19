import React from "react";
import classes from './informationAboutC.module.css'
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { isHome } from "../../utils";
import arrow from '../../../../assets/arrow-blue.png'

const InformationAboutC = function({fragments, title}){

    const location = useLocation()


    function content(fragments){
        const choiceElem = isHome(location) 
        let length = fragments.length;

        let content = []
        for (let i = 0; i < length; i+=2){
            content.push(   <div key={i} className={classes.rowElems}>
                                <div className={classes.elemBox}>
                                    <div className={classes.elemNumb}>
                                        <p className={classes.numb}>_{i}</p>
                                    </div>
                                    {choiceElem(fragments[i], i, classes)}
                                    
                                </div>
                                <div className={classes.elemBox}>
                                    <div className={classes.elemNumb}>
                                        {(i + 1 < length) && <p className={classes.numb}>_{i + 1}</p> }
                                    </div>
                                    {(i + 1 < length) && choiceElem(fragments[i + 1], i + 1, classes)}
                                   
                                </div>
                            </div>
                        )
        }
        return content
    }

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h1 className={classes.title}>{title}</h1>
                <div className={classes.content}>
                    {content(fragments)}
                    <div className={classes.elemBox}>
                        <img src={arrow} className={classes.arrow} /> 
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default observer(InformationAboutC)