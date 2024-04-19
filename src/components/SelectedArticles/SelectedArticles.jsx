import React, { useContext } from "react";
import classes from './selectedArticles.module.css'
import {Context} from '../..'
import {observer} from 'mobx-react-lite'
import { Link } from "react-router-dom";

const SelectedArticles = function({title}){

    const { user } = useContext(Context)

    function urlEncode(data){
        return encodeURIComponent(data.title)
    }

    return (
        <div className={classes.container}>
            <h2>Избранные публикации</h2>
            {
                user.user.selectedArticles?.length === 0
                    &&
                <p>Добавляйте публикации в избранное, чтобы легче было их находить!</p>
            }
            <ul>
                {user.user.selectedArticles?.map((article, ind) => 
                    <li key={ind}><Link to={`/articles/${article.section}/${urlEncode(article)}`}>{article.title}</Link></li>
                )}
            </ul>
        </div>
    )
}

export default observer(SelectedArticles)