import React, { useRef } from "react";
import classes from './about.module.css'
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import { isHome } from "../../utils";
import { useObserver } from "../../../../hooks/useObserver";

const About = function({fragments, title}){

    const location = useLocation()
    
    const contentRef = useRef(null)


    function content(fragments){
        const choiceElem = isHome(location)
        let length = fragments.length;
        let content = []
        for (let i = 0; i < length; i+=2){
            content.push(   <div key={i} className={classes.rowElems}>
                                {choiceElem(fragments[i], i, classes)}
                                {(i + 1 < length) && choiceElem(fragments[i + 1], i + 1, classes)}
                            </div>
                        )
            content.push( <hr key={length + i} className={classes.aboutHr} /> )
        }
      
        return content
    }

    
    useObserver(contentRef, (target) => target.classList.add(classes.visible), classes.rowElems)

    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <h1 className={classes.titleAbout}>{title}</h1>
                <div ref={contentRef} className={classes.content}>
                    {content(fragments)}
                </div>
            </div>
        </div>
    )
}

export default observer(About)