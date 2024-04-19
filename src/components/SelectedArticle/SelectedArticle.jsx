import React, { useContext, useEffect, useState } from "react";
import classes from './selectedArticle.module.css'
import {Context} from '../..'
import {observer} from 'mobx-react-lite'
import { useLocation, useParams } from "react-router-dom";
import { addSelectedArticle, removeSelectedArticle } from "../../http/userAPI";

const SelectedArticle = function({title}){

    const { user } = useContext(Context)
    const {section} = useParams()
    const [isSelected, setIsSelected] = useState(false)

    useEffect(() => {
        if(user.user.selectedArticles?.find(article => article.title === title)) setIsSelected(true)
        else setIsSelected(false)
    }, [title])

    function add(){
        addSelectedArticle(user.user.email, title)
        let selectedArticles = [...user.user.selectedArticles]
        selectedArticles.push({section, title})
        user.setUser({...user.user, selectedArticles})
        setIsSelected(true)
    }

    function remove(){
        removeSelectedArticle(user.user.email, title)
        let selectedArticles = [...user.user.selectedArticles].filter(article => article.title != title)
        user.setUser({...user.user, selectedArticles})
        setIsSelected(false)
    }


    return (
        <div className={classes.container}>
            {
                <div
                    onClick={e => isSelected ? remove() : add()}
                    className={classes.star.concat(
                        isSelected ? ` ${classes.selected}` : ''
                    )}
                >
                    <span />
                </div>    
            }
        </div>
    )
}

export default observer(SelectedArticle)