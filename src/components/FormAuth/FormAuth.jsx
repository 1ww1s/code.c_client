import React, { useContext, useEffect, useState } from 'react';
import classes from './formAuth.module.css'
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, PERSONAL_ACCOUNT_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { registration, login } from '../../http/userAPI';
import { Context } from '../..';
import Error from '../Error/Error';
import { observer } from 'mobx-react-lite';
import Loader from '../UI/loader/Loader';

const FormAuth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const {user} = useContext(Context)
    const [email, setEmail] = useState(user.user.email || '')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')
    const [fieldError, setFieldError] = useState('')
    const router = useNavigate()

    useEffect(()=>{
        setMessageError('')
        setFieldError('')
    }, [location])
    
    function checkPassword(value){
        setPassword(value)
            let isOk = false
            let re1 = new RegExp(/[a-zA-Z]/);
            let re2 = new RegExp(/[0-9]/);
            if(value.length < 6){
                setMessageError('Пароль должен содержать от 6 до 20 символов')
                setFieldError('password')
            }
            else if(!re1.test(value)){
                setMessageError('В пароле должны быть буквы')
                setFieldError('password')
            }
            else if(!re2.test(value)){
                setFieldError('password')
                setMessageError('В пароле должны быть цифры')
            }
            else{
                isOk = true
                setFieldError('')
                setMessageError('')
            }   
            return isOk
        
    }

    function checkError(event){
        if(!fieldError){
            setFieldError('')
            setMessageError('')
        }
        if(event.target.name === fieldError){
            setFieldError('')
            setMessageError('')
        }
    }

    async function sendUser(e){
        e.preventDefault()
        if(checkPassword(e.target.password.value)) {
            setMessageError('')
            user.setLoading(true)
            try {
                let userData;
                if(isLogin){
                    userData = await login(email, password)
                }
                else{
                    userData = await registration(email, password)
                }
                router(PERSONAL_ACCOUNT_ROUTE)
                user.setUser(userData)
                user.setIsAuth(true)
            }
            catch(e){
                switch (e.response?.status){
                    case 400:
                    case 401:
                    case 422:
                        setMessageError(e.response.data?.message)
                        setFieldError(e.response.data?.field)
                        break
                    default:
                        alert(`${e.response.status}, ${e.response.data.message}`)
                }
            }
            finally {
                user.setLoading(false)
            }
        }
    }

    return (
        <form onSubmit={sendUser} className={classes.container}>
            <h1 className={classes.tittle}>{isLogin ? 'ВХОД В ЛИЧНЫЙ КАИНЕТ' : 'РЕГИСТРАЦИЯ'}</h1>
            <div className={classes.input}>
                <MyInput 
                className={classes.input}
                    value={email}
                    onInput={(e)=> setEmail(e.target.value)}
                    onPointerDown={(e)=>checkError(e)}
                    type="text" 
                    name="email" 
                    placeholder="Email..." 
                />  
            </div>
            <div className={classes.input}>
                <MyInput 
                    className={classes.input}
                    value={password}
                    onInput={(e)=>checkPassword(e.target.value)}
                    onPointerDown={(e)=>checkError(e)}
                    type="text" 
                    name="password" 
                    placeholder="Пароль..." 
                />
            </div>

            <div className={classes.sign}>
                {isLogin 
                    ? 
                <Link className={classes.sign_link} to={REGISTRATION_ROUTE}>У меня ещё нет аккаунта</Link> 
                    :     
                <Link className={classes.sign_link} to={LOGIN_ROUTE}>Войти</Link>}
         
                { messageError && <Error messageError={messageError} /> }
           
            </div>
            <div className={classes.button}>
                {isLogin
                
                    ?
                    <MyButton name="button" disabled={user.isLoading || messageError}>{ user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'ВОЙТИ'}</MyButton>  
                    :
                    <MyButton name="button" disabled={user.isLoading || messageError}>{ user.isLoading ? <div className={classes.loader}> <Loader /> </div>: 'ЗАРЕГИСТРИРОВАТЬСЯ'}</MyButton> 
                }
            </div>
        </form>  
    )
}

export default observer(FormAuth)