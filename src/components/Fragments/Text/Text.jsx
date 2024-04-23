import { observer } from "mobx-react-lite"
import React from "react"
import classes from './text.module.css'
import markdownit from 'markdown-it';

const Text = function({fragment, ...props}){
    const md = markdownit({
        html: true
    })

    function addBreak(text){
        return text.replace(/&lt;br&gt;/g, '<br />')
    }
  
    function render(text){
        const netText = addBreak(md.render(text))
        return netText
    }

    return (
        <div 
            {...props}
            className={fragment.type === 'text' ? classes.containerText 
                        :
            fragment.type ==='important' ? classes.containerImportant
                        : 
            fragment.type ==='solution' && classes.containerSolution }
        >
            <h2 id={fragment.title}>{fragment.title}</h2>
            <span dangerouslySetInnerHTML={{__html: render(fragment.text)}}></span>
        </div>
    )
}

export default observer(Text)