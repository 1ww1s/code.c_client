import React, { useContext, useEffect, useRef, useState } from 'react';
import classes from './formAuth.module.css'
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';
import { Link, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_RECOVER_ROUTE, LOGIN_REMINDER_ROUTE, LOGIN_ROUTE, PERSONAL_ACCOUNT_ROUTE, REGISTRATION_ROUTE } from '../../utils/consts';
import { registration, login, reminder, recover } from '../../http/userAPI';
import { Context } from '../..';
import Error from '../Error/Error';
import { observer } from 'mobx-react-lite';
import Loader from '../UI/loader/Loader';
import eye from '../../assets/eye.png'
import eye_off from '../../assets/eye-off.png'
import { Helmet } from 'react-helmet-async';

const FormAuth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const isReg = location.pathname === REGISTRATION_ROUTE
    const isRem = location.pathname === LOGIN_REMINDER_ROUTE
    const isRec = Boolean(useMatch(LOGIN_RECOVER_ROUTE))
    const { link } = useParams()
    const {user, message} = useContext(Context)
    const [email, setEmail] = useState(user.user.email || '')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')
    const [fieldError, setFieldError] = useState('')
    const router = useNavigate()
    const refPassword = useRef()
    const refEye = useRef()

    useEffect(()=>{
        setMessageError('')
        setFieldError('')
        if(refPassword.current) {
            refPassword.current.setAttribute('type', 'password')
            refEye.current.src = eye_off;
        }
    }, [location.pathname])

    
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
                setMessageError('В пароле должны быть латинские буквы')
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

    function error(e){
        switch (e.response?.status){
            case 400:
            case 401:
            case 404:
            case 422:
                setMessageError(e.response.data?.message)
                setFieldError(e.response.data?.field)
                break
            default:
                alert(`${e.response.status}, ${e.response.data.message}`)
        }
    }

    async function click(e){
        e.preventDefault()
        if(isLogin || isReg) sendUser(e)
        if(isRem) sendReminder()
        if(isRec) sendRecover()
    }

    async function sendRecover(){
        setMessageError('')
        user.setLoading(true)
        try {
            const res = await recover(link, password)
            message.setType('ok')
            message.setMessage(res.message)
            router(LOGIN_ROUTE)
        }
        catch(e){
           error(e)
        }
        finally {
            user.setLoading(false)
        }
    }

    async function sendReminder(){
        setMessageError('')
        user.setLoading(true)
        try {
            const res = await reminder(email)
            message.setType('ok')
            message.setMessage(res.message)
            router(LOGIN_ROUTE)
        }
        catch(e){
           error(e)
        }
        finally {
            user.setLoading(false)
        }
    }

    async function sendUser(e){
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
               error(e)
            }
            finally {
                user.setLoading(false)
            }
        }
    }

    function showPassword(e){
        if(refPassword.current.getAttribute('type') === 'password'){
            refPassword.current.setAttribute('type', 'text')
            e.target.src = eye;
        }
        else{
            refPassword.current.setAttribute('type', 'password')
            e.target.src = eye_off;
        }
    }

    return (
        <>
        <Helmet>
            <title>{isLogin ? "Вход" : "Регистрация" }</title>
            <meta name="description" content="Вход или регистрация на Code-C" />
        </Helmet>
        <form onSubmit={click} className={classes.container}>
            <h1 className={classes.tittle}>
                    {isLogin && 'ВХОД В ЛИЧНЫЙ КАБИНЕТ'}
                    {isReg && 'РЕГИСТРАЦИЯ'}
                    {(isRem || isRec) && 'ВОССТАНОВЛЕНИЕ ПАРОЛЯ'}
                </h1>
            {!isRec &&
                <div className={classes.input}>
                    <MyInput 
                    className={classes.input}
                        value={email}
                        onInput={(e)=> setEmail(e.target.value)}
                        onPointerDown={(e)=>checkError(e)}
                        type="text" 
                        name="email" 
                        autoComplete="on"
                        placeholder="Email..." 
                    />  
                </div>
            }
            {!isRem &&
                <div className={classes.input}>
                    <MyInput 
                        refInput={refPassword}
                        className={classes.input}
                        value={password}
                        onInput={(e)=>checkPassword(e.target.value)}
                        onPointerDown={(e)=>checkError(e)}
                        type="password"
                        name="password" 
                        autoComplete="off"
                        placeholder={ isRec ? "Новый пароль..." : "Пароль..."  }
                    />
                    <div className={classes.showPassword}><img ref={refEye} onClick={showPassword} className={classes.eye} src={eye_off}></img></div>
                </div>
            }
            { isRem && 
                <p className={classes.signReminder}>
                    На ваш email будет отправлено письмо с инструкцией по восстановлению пароля.
                    Чтобы восстановить доступ к аккаунту, пройдите по ссылке из письма. Если этого 
                    письма нет во «Входящих», пожалуйста, проверьте «Спам».
                </p> 
            }
            <div className={classes.sign_right}>
                <Error messageError={messageError} />
                { isLogin && <Link className={classes.sign_link} to={LOGIN_REMINDER_ROUTE}>Забыли пароль?</Link> }
            </div>
            <div className={classes.button}>
                {isLogin && <MyButton name="button" disabled={user.isLoading || messageError}>{ user.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'ВОЙТИ'}</MyButton> }
                {isReg && <MyButton name="button" disabled={user.isLoading || messageError}>{ user.isLoading ? <div className={classes.loader}> <Loader /> </div>: 'ЗАРЕГИСТРИРОВАТЬСЯ'}</MyButton> }
                { (isRec || isRem) && 
                    <MyButton name="button" disabled={user.isLoading || messageError}>
                        { user.isLoading ? <div className={classes.loader}> <Loader /> </div>: 'ОТПРАВИТЬ'}
                    </MyButton> }
            </div>
            <div className={classes.sign_bottom}>
                { isLogin && <Link className={classes.sign_link} to={REGISTRATION_ROUTE}>У меня ещё нет аккаунта</Link> }
                { isReg && <Link className={classes.sign_link} to={LOGIN_ROUTE}>Войти</Link> }
                { (isRec || isRem) && 
                <>
                    <Link className={classes.sign_link} to={LOGIN_ROUTE}>
                        Зарегистрироваться
                    </Link> 
                    <span>
                        &nbsp;или&nbsp; 
                    </span> 
                    <Link className={classes.sign_link} to={LOGIN_ROUTE}>
                        войти
                    </Link>
                </> 
                }
            </div>
        </form>  
        </>
    )
}

export default observer(FormAuth)