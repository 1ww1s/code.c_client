import React, { useContext } from 'react';
import classes from './addFragment.module.css'
import { observer } from 'mobx-react-lite';
import MyButton from '../../UI/buttonAdmin/MyButtonAdmin';
import { Context } from '../../..';
import { Fragment } from '../../../models/Fragment';

const AddFragment = ({id}) => {

    const {article} = useContext(Context)
    let fragment = null
    if(id > 0) fragment = article.fragments[id - 1] 

    function addFragment(){
        if(fragment) fragment.setStatus('preview')
        article.addFragment(new Fragment(), id)
    }
    
    return (
        <div className={classes.container}>
            <MyButton onClick={() => addFragment()}><span className={classes.buttonText}>Добавить после</span></MyButton>
        </div>
    )
}

export default observer(AddFragment)