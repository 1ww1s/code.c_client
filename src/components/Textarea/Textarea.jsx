import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import classes from './textarea.module.css'
import { Context } from "../.."


const Textarea = function({id}){
    const {article} = useContext(Context)
    const fragment = article.fragments[id]
    
    function bold(target){
        twoSigns("**", target)
    }

    function italic(target){
        twoSigns("*", target)
    }

    function strikethrough(target){
        twoSigns("~~", target)
    }

    function Link(target){
        const [textArea, value, start, end] = getInfoTextArea(target) 
        let newValue = value.slice(0, start) + '[link](' + value.slice(start, end) + ')' + value.slice(end)
        addSigns(textArea, newValue, end)
    }

    function twoSigns(sign, target){
        const [textArea, value, start, end] = getInfoTextArea(target) 
        let newValue = value.slice(0, start) + sign + value.slice(start, end) + sign + value.slice(end)
        addSigns(textArea, newValue, end)
    }

    function Img(target){
        const [textArea, value, start, end] = getInfoTextArea(target) 
        let newValue = value.slice(0, start) + '![img](' + value.slice(start, end) + ')' + value.slice(end)
        addSigns(textArea, newValue, end)
    }

    function getInfoTextArea(target){
        const parent = target.parentElement;
        const textarea = parent.nextElementSibling;
        let value = textarea.value
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        return [textarea, value, start, end]
    }

    function addSigns(textArea, newValue, end){
        fragment.setText(newValue)
        textArea.focus()
        textArea.setSelectionRange(end, end)
    }


    return (
        <div className={classes.container}>
            {fragment.type !== 'code' && fragment.type !== 'img' 
                    &&
                <div className={classes.textEditor}>
                    <button className={classes.buttonEditor} onClick={(e) => bold(e.currentTarget)}>B</button>                
                    <button className={classes.buttonEditor} onClick={(e) => italic(e.currentTarget)}><i>I</i></button>                              
                    <button className={classes.buttonEditor} onClick={(e) => strikethrough(e.currentTarget)}><s>S</s></button>                
                    <button className={classes.buttonEditor} onClick={(e) => Link(e.currentTarget)}>Link</button>                
                    <button className={classes.buttonEditor} onClick={(e) => Img(e.currentTarget)}>Img</button>                
                </div>
            }
            <textarea placeholder="markdown" value={fragment.text} onChange={(e) => fragment.setText(e.target.value)} className={classes.textarea}>
                    
            </textarea>
        </div>
    )
}

export default observer(Textarea)