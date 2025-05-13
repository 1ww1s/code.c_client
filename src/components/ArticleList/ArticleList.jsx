import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classes from './articleList.module.css'
import LoaderDiv from "../LoaderDiv/LoaderDiv";
import { Context } from "../..";
import { Helmet } from "react-helmet-async";
import { descriptionDefault, titleDefault } from "../../utils/SEO";


const Articleslist = function({sectionName, articles, loaderDiv}){

    const {section} = useContext(Context)

    function createUrl(article){
        return article.replace(/ /g, '_')
    }   

    const name = section.sections.find(section => section.value === sectionName)?.name

    return (
        <div className={classes.container}>
            <Helmet>
                <title>{name || ""} | {titleDefault}</title>
                <meta name="description" content={`В разделе "${name || ""}" представлены следующие статьи: ${articles?.join(', ')}. ${descriptionDefault}`} />
            </Helmet>
            <h1>{name || ""}</h1>
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
                            <li 
                                className={classes.article} 
                                key={ind}
                            >
                                <p>
                                    <Link to={`/articles/${sectionName}/${createUrl(article)}`}>
                                        {article}
                                    </Link>
                                </p>
                            </li>
                        )}
                    </ol>
                }
                </div>        
            }
        </div>
    )
}

export default observer(Articleslist)