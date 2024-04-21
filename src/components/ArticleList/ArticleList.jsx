import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from './articleList.module.css'
import LoaderDiv from "../LoaderDiv/LoaderDiv";
import { Context } from "../..";


const Articleslist = function({sectionName, articles, loaderDiv}){

    const {section} = useContext(Context)

    function createUrl(article){
        return article.replace(/ /g, '_')
    }   

    return (
        <div className={classes.container}>
            <h1>{(section.sections.find(section => section.value === sectionName))?.name}</h1>
            { 
                loaderDiv ? <LoaderDiv />
                        :
                <div>
                {
                    articles.length === 0
                        ?
                    <p className={classes.a}>Статей не обнаружено</p>
                        :
                    <ol>
                        {articles.map((article, ind) =>
                            <li className={classes.article} key={ind}><p><Link to={`/articles/${sectionName}/${createUrl(article)}`}>{article}</Link></p></li>
                        )}
                    </ol>
                }
                </div>        
            }
        </div>
    )
}

export default observer(Articleslist)