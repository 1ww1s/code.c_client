import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import classes from './articleList.module.css'
import { useLocation } from "react-router-dom";
import { ADMIN_HOME_ARTICLE_LIST_ROUTE } from "../../../utils/consts";
import LoaderDiv from "../../LoaderDiv/LoaderDiv";
import { Context } from "../../..";
import { getTitlesArticles, getHomeTitlesArticles } from "../../../http/adminAPI";
import ArticleActions from "../ArticleActions/ArticleActions";
import MyInput from "../../UI/input/MyInput";
import { useArticles } from "../../../hooks/useArticles";
import ErrorHandling from "../../../error/ErrorHandling";

const ArticleList = function(){

    const location = useLocation()
    const {article, message} = useContext(Context)
    const [articles, setArticles] = useState([])
    const [activeButton, setActiveButton] = useState('')  
    const [query, setQuery] = useState('')
    const searchedArticles = useArticles(articles, query)
    const isHome = location.pathname === ADMIN_HOME_ARTICLE_LIST_ROUTE

    async function loadArticles(){
        article.setIsLoading(true)
        let artls;
        try{
            if(isHome) artls = await getHomeTitlesArticles()
            else artls = await getTitlesArticles()  
            setArticles(artls)
        }
        catch(e){
            ErrorHandling(e, message)
        }
        finally{
            article.setIsLoading(false)
        }
        
    }

    useEffect(() => {
        loadArticles()
    }, [])

    return (
        <div className={classes.container}>
            <div className={classes.filter}>
                <h1 className={classes.title}>Поиск</h1>
                <div className={classes.search}>
                    <MyInput 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                        placeholder={articles[0] || 'Название...'} />
                </div>
            </div>
            <h1 className={classes.title}>{isHome ? 'Список блоков' : 'Список статей'}</h1>
            <div className={classes.articles}>
                { article.isLoading && <LoaderDiv /> }
                { searchedArticles.length === 0 ? <p>Нет статей</p> : searchedArticles.map((article, ind) => 
                    <ArticleActions setActiveButton={setActiveButton} activeButton={activeButton} articles={articles} setArticles={setArticles} ind={ind} key={ind} title={article} />
                )}
            </div>
        </div>
    )
}

export default observer(ArticleList)