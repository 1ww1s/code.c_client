import React, { useContext, useState } from "react";
import classes from './addSection.module.css'
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import { createSection } from "../../../http/adminAPI";
import Error from "../../Error/Error";
import { Context } from "../../..";
import ErrorHandling from "../../../error/ErrorHandling";
import Loader from "../../UI/loader/Loader";

const AddSection = function({onHide}){

    const [name, setName] = useState('')
    const [value, setValue] = useState('')
    const {user, message} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')

    async function addSection(){
        try{
            user.setLoading(true)
            const res = await createSection(name, value)    
            message.setType('ok')
            message.setMessage(res.message)
            onHide()
        }
        catch(e){
            if((e.response?.status === 409) || (e.response?.status === 400)){
                setErrorMessage(e?.response.data.message)
            }
            else{
                onHide()
                ErrorHandling(e, message)
            }
        }
        finally{
            user.setLoading(false)
        }
    }

    return (    
        <div onClick={(e) => {e.stopPropagation(); onHide()}}className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.content}>
                <h1>Добавление раздела на сайт</h1>
                <h2 className={classes.sign}>Введите имя раздела</h2>
                <div className={classes.input}>
                    <MyInput onClick={()=>setErrorMessage('')} value={value} onChange={(e) => setValue(e.target.value)} placeholder="learning" />
                </div>
                <h2 className={classes.sign}>Введите обозначение на сайте</h2>
                <div className={classes.input}>
                    <MyInput onClick={()=>setErrorMessage('')} value={name} onChange={(e) => setName(e.target.value)} placeholder="Изучение" />
                </div>
                <div className={classes.error}>
                    { errorMessage && <Error messageError={errorMessage} /> }
                </div>
                <div className={classes.sendSection}>
                    <MyButton onClick={() => addSection()} disabled={errorMessage|| user.isLoading} className={classes.button}>
                        { user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'Добавить' }
                    </MyButton>
                </div>
            </div>
        </div>
    )
}

export default AddSection