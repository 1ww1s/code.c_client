import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import classes from './textHome.module.css'
import markdownit from 'markdown-it';

const TextHome = function({fragment, classNameText, ...props}){
    const md = markdownit()
  
    function render(text){
        return md.render(text)
    }

    return (
        <div 
            {...props}
        >
            { fragment.title && <h2 className={classes.h2}>{fragment.title}</h2> }
            <span className={classNameText} dangerouslySetInnerHTML={{__html: render(fragment.text)}}></span>
        </div>
    )
}

export default observer(TextHome)