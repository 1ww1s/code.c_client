import React, { useContext, useEffect, useState } from "react";
import classes from './updateSection.module.css'
import MyButton from "../../UI/button/MyButton";
import { updateSection } from "../../../http/adminAPI";
import { Context } from "../../..";
import ErrorHandlingAdmin from "../../../error/ErrorHandlingAdmin";
import Loader from "../../UI/loader/Loader";
import LoaderDiv from "../../LoaderDiv/LoaderDiv";
import { getSection } from "../../../http/SiteAPI";
import { Reorder } from 'framer-motion'
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

const UpdateSection = function({onHide}){

    const [sections, setSections] = useState([])
    const {user, message} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useNavigate()

    function showErrorMessage(e){
        if(e.status === 409 || e.status === 400){
            setErrorMessage(e?.response.data.message)
        }
        else{
            ErrorHandlingAdmin(e, message, user, router)
            onHide()
        }
    }

    useEffect(() => {
        setIsLoading(true)
        getSection()
        .then(sctns => setSections(sctns.map(s => s.name)))
        .catch(e => showErrorMessage(e))
        .finally(() => setIsLoading(false))
    }, [])

    function remove(index){
        const sctns = [...sections];
        sctns.splice(index, 1)
        setSections(sctns)
    }

    async function update(){
        try{
            user.setLoading(true)
            const res = await updateSection(sections)    
            message.setType('ok')
            message.setMessage(res.message)
            onHide()
        }
        catch(e){
            showErrorMessage(e)
        }
        finally{
            user.setLoading(false)
        }
    }

    return (    
        <div onClick={(e) => {e.stopPropagation(); onHide()}} className={classes.container}>
            <div onClick={(e) => e.stopPropagation()} className={classes.content}>
            <h1>Секции. Измененить порядок или удалить</h1>
                { 
                    isLoading 
                        ?
                    <div className={classes.loaderDiv}><LoaderDiv /></div>
                        :
                    <Reorder.Group values={sections} onReorder={setSections}>
                        {sections.map((section, ind) => 
                            <Reorder.Item key={section} id={section} value={section}>
                                <div className={classes.section}>
                                    <div>{section}</div>    
                                    <div onClick={() => remove(ind)} className={classes.remove}>удалить</div>
                                </div>    
                            </Reorder.Item>
                        )}
                    </Reorder.Group>
                }
                <div className={classes.sendButton}>
                    <MyButton onClick={() => update()} disabled={errorMessage|| user.isLoading} className={classes.button}>
                        { user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'Внести изменения' }
                    </MyButton>
                </div>
            </div>
        </div>
    )
}

export default observer(UpdateSection)