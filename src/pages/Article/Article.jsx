import React, { useContext, useEffect, useState } from "react"
import classes from './article.module.css'
import { observer } from "mobx-react-lite"
import { useParams, useLocation } from "react-router-dom"
import { Context } from "../.."
import ArticleContent from "../../components/ArticleContent/ArticleContent"
import NotFound from "../../components/NotFound/NotFound"
import Sidebar from "../../components/Sidebar/Sidebar"
import { getArticle } from "../../http/SiteAPI"
import ErrorHandling from "../../error/ErrorHandling"
import { Fragment } from "../../models/Fragment"
import NavBar from "../../components/NavBar/NavBar"
import Bottom from "../../components/Pages/Bottom/Bottom"

const Article = function(){

    const {article: articleName} = useParams()
    const {article, message} = useContext(Context)
    const [loaderDiv, setLoaderDiv] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)
    const [sidebar, setSidebar] = useState([])
    const location = useLocation()

    async function preload(){
        try{
            article.clear()
            const title = articleName.replace(/_/g, " ");
            const articleData = await getArticle(title)
            article.setTitle(articleData.title)
            const titles = []
            articleData.fragments.map((fragment, ind) => {
                const [type, details] = fragment.type.split(' ')
                const newF = new Fragment(type, ind)
                if(details === 'details') newF.setDetails(true) 
                newF.setStyle(fragment.style)
                newF.setTitle(fragment.title)
                if(fragment.title && details !== 'details') titles.push(fragment.title)
                newF.setText(fragment.text)
                article.addFragment(newF) 
            })
            setSidebar(titles)
        }
        catch(e){
            if(e?.response.status === 404){
                setIsNotFound(true)
            }
            else{
                ErrorHandling(e, message)
            }
        }
        finally{
            setLoaderDiv(false)
        }
    }

    useEffect(() => {
        window.scrollTo(0,0)
        preload()
    }, [location.pathname])

    return(
        <div className={classes.container}>
            <NavBar />
            <div className={classes.wrapper}>
                {   
                    isNotFound ? <NotFound /> 
                        :
                    <div className={classes.content}>
                        <div className={classes.article}>
                            <ArticleContent loaderDiv={loaderDiv} />
                        </div>
                        <div className={classes.sidebar}>
                            <Sidebar sidebar={sidebar} />
                        </div>
                    </div>
                }
            </div>
            <Bottom />
        </div>       
    )
}


export default observer(Article)