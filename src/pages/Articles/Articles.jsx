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
import { abortController, getControllerSignal, reinitController } from "../../http/abortController";
import axios from "axios";

const Articles = function(){
    const { message } = useContext(Context)
    const [isNotFound, setIsNotFound] = useState(false)
    const { section } = useParams();
    const [articles, setArticles] = useState([])
    const [loaderDiv, setLoaderDiv] = useState(true)
    
    useEffect(() => {
        window.scrollTo(0,0)
        setLoaderDiv(true)
        let isRepeatRequest = false
        abortController()   // для прерывания предыдущих запросов
        reinitController()  
        setIsNotFound(false)
        getTitlesArticlesSection(section, {signal: getControllerSignal()})
        .then(artcls => setArticles(artcls))
        .catch(e => {
            if(e.response?.status === 404){
                setIsNotFound(true)
            }
            else{
                if(axios.isCancel(e)) isRepeatRequest = true
                ErrorHandling(e, message)
            }
        })
        .finally(() => { if(!isRepeatRequest) setLoaderDiv(false) })
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