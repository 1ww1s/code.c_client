import React, { useContext, useState } from "react";
import classes from './addRole.module.css'
import MyInput from "../../UI/input/MyInput";
import { Context } from "../../..";
import { observer } from 'mobx-react-lite'
import ErrorHandlingAdmin from "../../../error/ErrorHandlingAdmin";
import MyButton from "../../UI/button/MyButton";
import Loader from "../../UI/loader/Loader";
import { createRole } from "../../../http/adminAPI";
import Error from "../../Error/Error";
import { useNavigate } from "react-router-dom";
 
const AddRole = function({onHide}){

    const [value, setValue] = useState('')
    const {user, message} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useNavigate()

    async function addRole(){
        try{
            user.setLoading(true)
            const res = await createRole(value)    
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
                ErrorHandlingAdmin(e, message, user, router)
            }
        }
        finally{
            user.setLoading(false)
        }
    }

    return (
        <div onClick={(e) => {e.stopPropagation(); onHide()}} className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.content}>
                <h1>Добавить роль</h1>
                <div className={classes.input}><MyInput onClick={()=>setErrorMessage('')} placeholder="Название роли" value={value} onChange={(e) => setValue(e.target.value)} /></div>
                <div className={classes.error}>
                    { errorMessage && <Error messageError={errorMessage} /> }
                </div>
                <div className={classes.sendRole}>
                    <MyButton onClick={() => addRole()} disabled={errorMessage|| user.isLoading} className={classes.button}>
                        { user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'Добавить' }
                    </MyButton>
                </div>
            </div>
        </div>
    )
}

export default observer(AddRole)