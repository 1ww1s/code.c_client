import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import classes from './home.module.css'
import { Context } from "../..";
import { getArticlesHome } from "../../http/SiteAPI";
import ErrorHandling from "../../error/ErrorHandling";
import { Fragment } from "../../models/Fragment";
import { Article } from "../../models/Article";
import LoaderPage from "../../components/LoaderPage/LoaderPage";
import { choiceHomeArticles } from "../../components/Pages/utils";
import NavBar from "../../components/NavBar/NavBar";
import Bottom from "../../components/Pages/Bottom/Bottom";
import { abortController, getControllerSignal, reinitController } from "../../http/abortController";


const Home = () => {

    const {homePage, message} = useContext(Context)
    const [loader, setLoader] = useState(homePage.articles ? false : true)

    useEffect(() => {
        window.scrollTo(0,0)
        abortController()   // для прерывания предыдущих запросов
        reinitController()
        if(!homePage.articles){
            getArticlesHome({signal: getControllerSignal()})
            .then(articlesData => {
                let articles = []
                articlesData.map(articleData => {
                    let article = new Article()
                    article.setTitle(articleData.title)
                    article.setSection(articleData.section)
                    articleData.fragments.map((fragment, ind) => {
                        const newF = new Fragment(fragment.type, ind) 
                        newF.setStyle(fragment.style)
                        newF.setStatus('preview')
                        newF.setTitle(fragment.title)
                        newF.setText(fragment.text)
                        article.addFragment(newF)
                    })
                    articles.push(article)
                })
                homePage.setArticles(articles)
            })
            .catch(e => ErrorHandling(e, message))
            .finally(() => setLoader(false))
        }
        else setLoader(false)
    }, [])


    if(loader){
        return (
            <LoaderPage />
        )
    }

    function getBlocks(articles){
        return articles.map((article, ind) => choiceHomeArticles(article.fragments, article.title, ind))
    }

    return (
        <div className={classes.container}>
            {   
                !loader
                    &&
                <div className={classes.content}>  
                    <NavBar />
                    {homePage.articles && getBlocks(homePage.articles)}
                </div>
            }
            <Bottom />
        </div>
    ) 
}

export default observer(Home)