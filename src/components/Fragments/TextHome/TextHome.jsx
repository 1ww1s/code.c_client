import { observer } from "mobx-react-lite"
import React, { useEffect } from "react"
import classes from './textHome.module.css'
import markdownit from 'markdown-it';

const TextHome = function({fragment, classNameText, ...props}){
    const md = markdownit({
        html: true
    })
  
    function render(text){
        return md.render(text)
    }

    return (
        <div 
            {...props}
        >
            { fragment.title && <h2 className={classes.h2}>{fragment.title}</h2> }
            <span style={{whiteSpace:"pre-wrap"}} className={classNameText} dangerouslySetInnerHTML={{__html: render(fragment.text)}}></span>
        </div>
    )
}

export default observer(TextHome)