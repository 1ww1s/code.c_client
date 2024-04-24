import React, { useContext, useEffect, useState } from "react";
import classes from './updateRolesUser.module.css'
import { observer } from 'mobx-react-lite'
import Error from "../../Error/Error";
import MyInput from "../../UI/input/MyInput";
import MyButton from "../../UI/button/MyButton";
import { Context } from "../../..";
import Loader from "../../UI/loader/Loader";
import ErrorHandling from "../../../error/ErrorHandling";
import ErrorHandlingAdmin from "../../../error/ErrorHandlingAdmin";
import { getRoles, getUsers, updateRolesUser } from "../../../http/adminAPI";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const UpdateRolesUser = function({onHide}){

    const [email, setEmail] = useState('')
    const [users, setUsers] = useState([])
    const {user, message} = useContext(Context)
    const [errorMessage, setErrorMessage] = useState('')
    const [loadingUserList, setLoadingUserList] = useState(false)
    const [roles, setRoles] = useState([])
    const [userSelected, setUserSelected] = useState('')
    const [previousSelectedEmail, setPreviousSelectedEmail] = useState(null)
    const router = useNavigate()

    useEffect(() => {
        getRoles()
        .then(roles => setRoles(roles))
        .catch(e => {ErrorHandlingAdmin(e, message, user, router); onHide()})
    }, [])

    async function getUsersFunc(email){
        let isRepeatRequest = false;
        try{
            if(!email) {
                setUsers([])
                return
            }
            setLoadingUserList(true)
            const res = await getUsers(email)  
            setUsers(res)
        }
        catch(e){
            if((e.response?.status === 409) || (e.response?.status === 400)){
                setErrorMessage(e.response.data?.message)
            }
            else{
                if(axios.isCancel(e)) isRepeatRequest = true
                else onHide()
                ErrorHandlingAdmin(e, message, user, router)
            }
        }
        finally{
            if(!isRepeatRequest)setLoadingUserList(false)
        }
    }

    function selectUser(event, user){
        setErrorMessage('')
        if(previousSelectedEmail) previousSelectedEmail.classList.remove(classes.selected)
        setPreviousSelectedEmail(event.currentTarget)
        setUserSelected(user)
        event.currentTarget.classList.add(classes.selected)
    }

    function validate(){
        if(!userSelected){
            setErrorMessage(`Выберите пользователя, кликнув на него`)
            return false
        }
        return true
    }

    async function updateRoles(){
        if(validate()){
            try{
                user.setLoading(true)
                const res = await updateRolesUser(userSelected)    
                message.setType('ok')
                message.setMessage(res.message)
                onHide()
            }
            catch(e){
                if((e.response?.status === 409) || (e.response?.status === 400)){
                    setErrorMessage(e.response.data?.message)
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
    }

    function selectedRole(user, target){
        if(target.checked){
            const newRoles = [...user.roles]
            newRoles.push(target.value)
            user.roles = newRoles;
        }
        else{
            user.roles = ([...user.roles].filter(role => role !== target.value))
        }
    }

    return (
        <div onClick={(e) => {e.stopPropagation(); onHide()}} className={classes.container}>
        <div onClick={(e) => e.stopPropagation()} className={classes.content}>
            <h1>Добавить роль</h1>
            <div className={classes.input}>
                <MyInput 
                    onPointerDown={e => setErrorMessage('')} 
                    placeholder="Email пользователя" 
                    value={email} onChange={(e) => {setEmail(e.target.value); getUsersFunc(e.target.value)}} 
                />
            </div>
            <div className={classes.error}>
                { errorMessage && <Error messageError={errorMessage} /> }
            </div>
            <h2 className={classes.selectedUserTitle}>Пользователи</h2>
            <div className={classes.users}>
            {   
                loadingUserList  ?  <div className={classes.loaderUserList}><Loader color={'black'} /></div>
                        :
                users.length === 0 ? <p className={classes.notUserList}>Пользователи не найдены</p> 
                        : 
                users.map((user, ind) => 
                    <div className={classes.user} onClick={(e) => selectUser(e, user)} key={ind}>
                        <div className={classes.email}>{user.email}</div>
                        <div className={classes.roles}>
                            <details onMouseDown={(e) => {if(e.detail > 1) e.preventDefault()}}>
                                <summary>Роли</summary>
                                <ul>
                                    {roles?.filter(role => role != 'admin' && role != 'user').map(role => 
                                        <li key={role}>
                                            <label>
                                                {role}
                                                <input type="checkbox" onChange={(e) => selectedRole(user, e.target)} value={role} defaultChecked={user.roles?.includes(role)} />
                                            </label>
                                        </li>
                                    )}   
                                </ul>
                            </details>
                        </div>
                    </div>) 
            }
            </div>    
            <p>Выберите пользователя, чтобы изменить его роли.</p>  
            <div className={classes.sendRole}>
                <MyButton onClick={() => updateRoles()} disabled={errorMessage|| user.isLoading} className={classes.button}>
                    { user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'Изменить' }
                </MyButton>
            </div>
        </div>
    </div>
    )
}


export default observer(UpdateRolesUser)