import classes from './message.module.css'
import close from '../../assets/x-circle.png'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../..'

const Message = function(){

    const {message} = useContext(Context)
    const [id, setId] = useState(null)

    function onHide(){
        if(id) clearTimeout(id)
        message.setMessage('')
    }

    useEffect(()=>{
        window.scrollTo({top: 0, behavior: 'smooth'})
        let i = setTimeout(() => onHide(), 4000)
        setId(i)
    }, [])

    return (
        <div className={message.type === 'error' ?  `${classes.container} ${classes.error}` : classes.container}>
            <div className={classes.wrapper}>
                <span className={classes.message}>{message.message}</span>
                <img src={close} onClick={onHide} className={classes.img} />
            </div>
            <div className={message.type === 'error' ?  `${classes.slider} ${classes.error}` : classes.slider}></div>
        </div>
    )

}

export default Message