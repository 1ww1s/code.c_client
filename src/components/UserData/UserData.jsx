import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './userData.module.css'
import {Context} from '../..'
import {observer} from 'mobx-react-lite'
import { updateUserpic } from "../../http/userAPI";
import { Link } from "react-router-dom";
import Loader from "../UI/loader/Loader";
import ErrorHandling from "../../error/ErrorHandling";
import { ADMIN_ROUTE } from "../../utils/consts";

const UserData = function(){

    const { user, message } = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [messageError, setMessageError] = useState('')
    const refUserpicImg = useRef()
    const refContainer = useRef()

    function readFile(file, onEnd){
        const reader = new FileReader()

        reader.onload = async (e) => {
            try{
                const userpic = await updateUserpic(reader.result)
                user.setUser({...user.user, userpic})
            }
            catch(e){
                if(e.response?.status === 400){
                    setMessageError(e.response.data.message)
                }
                else ErrorHandling(e, message)
            }
            finally{
                onEnd()
            }
        }
        reader.readAsDataURL(file)
    }

    useEffect(() => {                               // можно и без этого (задержка чисто на рендер)
        const img = refUserpicImg.current;
        if(!img || !user.user.userpic) return
        setLoader(true)
        img.src = user.user.userpic;
        img.onload = () => setLoader(false)
    }, [user.user])

    function removeMessageError(){
        setMessageError('')
        refContainer.current.removeEventListener('click', removeMessageError)
    }

    function validationSize(file){
        let isOk = true;
        if(file.size / 1e6 > 2) {
            isOk = false;
            setMessageError('*Максимальный размер изображения 2МБ')
            refContainer.current.addEventListener('click', removeMessageError)
        }
        return isOk
    }

    function setUserpic(e){
        const file = e.target.files[0];
        if(!file) return
        if(!validationSize(file)) return
        user.setLoading(true)
        setLoader(true)
        readFile(file, () => {setLoader(false); user.setLoading(false)})
    }

    return (
        <div ref={refContainer} className={classes.container}>
            <div className={classes.inputUserpic}>
                <label className={classes.inputUserpicLabel}>
                    <div disabled={(user.isLoading || loader || !user.user.userpic)} className={classes.userpic}>
                        <div className={classes.addUserpic}></div>
                        { 
                            loader && <div className={classes.userpicLoader}><div className={classes.loaderUserpic}><Loader /></div></div>
                        }
                        {   user.user.userpic ? <img ref={refUserpicImg} className={classes.userpicImg} />
                                :
                            <div className={classes.userpicText}>
                                <p>{user.user.email[0]}</p>
                            </div>
                        }
                    </div>                    
                        
                    <input disabled={user.isLoading || loader} onChange={setUserpic} hidden type='file' accept=".jpg,.jpeg,.png" />
                </label>
                <div className={classes.userpicError}><span>{messageError}</span></div>
            </div>
            <div className={classes.email}>
                email: {user.user.email}
            </div>
            <div className={classes.roles}>
                {user.user?.role?.map((role, i) =>
                    <span key={i} className={classes[role]}>{role}</span>
                )}
            </div>
            {   
                user.user.role.find(role => (role === 'admin' || role === 'moderator'))
                    && 
                <div className={classes.adminPanel}><Link to={ADMIN_ROUTE}>Админ панель</Link></div> 
            }
        </div>
    )
}

export default observer(UserData)