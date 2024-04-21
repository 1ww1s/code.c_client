import React, { useContext, useEffect, useState } from "react";
import classes from './articles.module.css'
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import NotFound from "../../components/NotFound/NotFound"
import ArticleList from "../../components/ArticleList/ArticleList";
import { useParams } from "react-router-dom";
import ErrorHandling from "../../error/ErrorHandling";
import { getTitlesArticlesSection } from "../../http/SiteAPI";
import NavBar from "../../components/NavBar/NavBar";
import Bottom from "../../components/Pages/Bottom/Bottom";

const Articles = function(){
    const { message } = useContext(Context)
    const [isNotFound, setIsNotFound] = useState(false)
    const { section } = useParams();
    const [articles, setArticles] = useState([])
    const [loaderDiv, setLoaderDiv] = useState(true)
    
    useEffect(() => {
        window.scrollTo(0,0)
        setIsNotFound(false)
        getTitlesArticlesSection(section)
        .then(artcls => setArticles(artcls))
        .catch(e => {
            if(e?.response.status === 404){
                setIsNotFound(true)
            }
            else{
                ErrorHandling(e, message)
            }
        })
        .finally(() => setLoaderDiv(false))
    }, [section])

    return(
        <div className={classes.container}>
            <NavBar />
            <div className={classes.wrapper}>
                {
                    isNotFound ? <NotFound /> 
                        :
                    <ArticleList loaderDiv={loaderDiv} articles={articles} sectionName={section} />
                }
            </div>
            <Bottom />
        </div>
    )
}


export default observer(Articles)