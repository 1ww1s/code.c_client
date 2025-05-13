import classes from './bottom.module.css'
import { observer } from "mobx-react-lite";
import img from '../../../assets/bottomImage.png'

const Bottom = function(){
    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                <div className={classes.info}> 
                    <span>Code.C © Copyright</span>
                    <span>Павел Калашников 2023 </span>
                    <span> обратная связь code.c04@mail.ru</span>
                </div>
                <img src={img} className={classes.img} />
            </div>
        </div>
    )
}

export default observer(Bottom)