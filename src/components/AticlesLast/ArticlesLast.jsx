import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from './articlesLast.module.css'
import { Context } from "../..";
import { observer } from "mobx-react-lite";

const ArticlesLast = function(){

    const { articlesLast } = useContext(Context)

    function createUrl(article){
        return article.replace(/ /g, '_')
    }   

    return (
        <div>
            <h2 className={classes.h2}>Новые публикации</h2>
            <div className={classes.lastAticles}>
                <ul>
                    {articlesLast.articles.map((article, ind) => <li key={ind}><Link to={`/articles/${article.section}/${createUrl(article.title)}`}>{article.title}</Link></li>)}
                </ul>
            </div>
        </div>
    )
}

export default observer(ArticlesLast)