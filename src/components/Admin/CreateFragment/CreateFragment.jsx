import React, { useContext, useEffect } from 'react';
import classes from './createFragment.module.css';
import AdminClasses from '../../../pages/Admin/admin.module.css';
import { observer } from 'mobx-react-lite';
import MyInput from '../../UI/input/MyInput';
import MyButton from '../../UI/buttonAdmin/MyButtonAdmin';
import { Context } from '../../..';
import Textarea from '../../Textarea/Textarea';
import MySelect from '../../UI/select/MySelect';
import AddFragment from '../AddFragment/AddFragment';
import AddImg from '../AddImg/AddImg';

const CreateFragment = ({id}) => {

    const {article} = useContext(Context)
    const fragment = article.fragments[id]

    useEffect(() => {
        let  AdminContainer = document.querySelector(`.${AdminClasses.container}`)
        AdminContainer.onpointerdown = clickOutsideTheFragment(AdminContainer)
    }, []) 
    
    function removeText(){
        article.removeFragment(id)
    }

    const clickOutsideTheFragment = function(AdminContainer) {
        const check = (event) => {
            let isFragment = false
            let elem = event.target;
            let fragmentContainer = document.querySelector(`.${classes.container}`)
            while(elem.parentElement){
                if(elem === fragmentContainer){
                    isFragment = true
                    break
                }
                elem = elem.parentElement
            }
            return isFragment
        }
        const handler = function(event) {
            if(!check(event)){
                fragment.setStatus('preview')
                AdminContainer.onpointerdown = null
            }
        };
        return handler;
    };

    function setDetails(e){
        if(e.target.checked) fragment.setDetails(true)
        else fragment.setDetails(false)
    }

    return (
        
        <div id={id} className={classes.container}>
            <div className={classes.change}>
                <h2 className={classes.title}>
                    <span className={classes.titleText}>Тип фрагмента:</span>
                    <MySelect 
                        defaultValue="Тип фрагмента"
                        value={fragment.type} 
                        options={[
                            {value: 'text', name:'Простой текст'},
                            {value: 'important', name:'Важный текст'},
                            {value: 'code', name:'Код'},
                            {value: 'img', name:'Изображение'},
                        ]}
                        onChange={(value) => fragment.setType(value)}
                    />
                    <label className={classes.details}>
                        <span onMouseDown={(event)=>{if(event.detail > 1) event.preventDefault();}}>
                            Раскрывающийся блок
                        </span>
                        <input onChange={e => setDetails(e)} checked={fragment.details} type="checkbox" />
                    </label>
                </h2>
                <div className={classes.titleInput}>
                    <MyInput value={fragment.title} onChange={(e) => fragment.setTitle(e.target.value)} placeholder='Название параграфа...' />
                </div>

                { fragment.type === 'img' 
                        ?
                    <div className={classes.AddImg}><AddImg id={id} /></div>
                        :
                    <div className={classes.textarea}>
                        <Textarea id={id} />
                    </div>
                }
            </div>

           <div className={classes.actions}>
                <div className={classes.addFragmentButton}>
                    <AddFragment id={id + 1} />
                </div>
                <div className={classes.removeButton}>
                    <MyButton onClick={removeText}><span className={classes.buttonText}>Удалить</span></MyButton>
                </div>
            </div>
        </div>
    )
}

export default observer(CreateFragment)