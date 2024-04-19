import React, { useContext, useEffect, useState } from "react";
import classes from './addImg.module.css'
import { observer } from "mobx-react-lite";
import addImg from '../../../assets/addImage.png'
import { Context } from '../../..'
import MyInput from "../../UI/input/MyInput";

const AddImg = function({id}){
    
    const [name, setName] = useState('')
    const {article} = useContext(Context)
    const fragment = article.fragments[id]
    const [width, setWidth] = useState('')

    const readFile = e => {
        const file = e.target.files[0]
        if(!file) return
        let reader = new FileReader();
        
        reader.onload = function(e) {
            setName(file.name)
            fragment.setText(reader.result)
        }
        
        reader.readAsDataURL(file);
    }

    useEffect(()=>{
        if(fragment.style.width) setWidth(fragment.style.width.slice(0, -2))
    }, [])

    
    useEffect(() => {
        fragment.setStyle({width: width + 'px'})
    }, [width])

    function checkInputWidth(key){
        return (key >= '0' && key <= '9') || key == 'ArrowLeft' || key == 'ArrowRight' || key == 'Delete' || key == 'Backspace';
    }

    return (
        <div className={classes.container}>
            <div className={classes.size}>
                <span className={classes.width}>
                    <MyInput 
                        value={width}
                        onKeyDown={(e) => {if(!checkInputWidth(e.key)) e.preventDefault()} }
                        onInput={(e) => setWidth(e.target.value)}  
                        placeholder="Ширина изображения в px..." 
                    />
                </span>
            </div>
            <div className={classes.file}>
                <label className={classes.inputDiv}>
                    <img className={classes.addImg} src={addImg}></img>
                    <span className={classes.sign}>Загрузить изображение</span>
                    <input onChange={readFile} className={classes.input} type='file' accept=".jpg,.jpeg,.png" />
                </label>
                <div className={classes.resultDiv}>
                    <img hidden={!fragment.text} src={fragment.text} className={classes.resultImg}></img>
                    <span className={classes.sign}>{name}</span>
                </div>
            </div>          
        </div>
    )
}

export default observer(AddImg)