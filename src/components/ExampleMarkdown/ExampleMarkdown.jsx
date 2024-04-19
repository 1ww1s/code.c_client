import React, { useEffect, useState } from "react";
import classes from './exampleMarkdown.module.css'
import markdownit from 'markdown-it';

const ExampleMarkdown = function({markdownValue, ind}){
    const md = markdownit()
    
    function renderMarkdown(value){
        const html = md.render(value)
        return html
    }

    function renderHtml(value){
        const span =  document.querySelectorAll(`.${classes.exampleSign}`)[(2 * ind) + 1];
        span.insertAdjacentHTML("afterend", `<span>${value}</span>`)
    }

    useEffect(() => {
        const span =  document.querySelectorAll(`.${classes.exampleSign}`)[2 * ind];     
        span.insertAdjacentHTML("afterend", `<span>${markdownValue}</span>`)
        const html = renderMarkdown(span.nextSibling.textContent.replace(/<br>/g, ''))
        renderHtml(html)
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.markdownExample}>
                <span className={classes.exampleSign}>markdown</span>
                    
                </div>
            <div className={classes.htmlExample}>
                <span className={classes.exampleSign}>html</span>
            </div>
        </div>
    ) 
}

export default ExampleMarkdown