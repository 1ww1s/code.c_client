import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import classes from './image.module.css'

const Image = function({fragment, styleImg, ...props}){

    return (
        <div {...props} >
            <h2 id={fragment.title}>{fragment.title}</h2>
            <img style={styleImg} className={classes.img} src={fragment.text}></img>
        </div>
    )
}

export default  observer(Image)