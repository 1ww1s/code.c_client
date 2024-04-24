import React, { useContext, useEffect, useRef, useState } from "react"
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
import { abortController, getControllerSignal, reinitController } from "../../http/abortController"
import axios from "axios"
import SidebarBanner from "../../components/SidebarBanner/SidebarBanner"

const Article = function(){

    const {article: articleName} = useParams()
    const {article, message} = useContext(Context)
    const [loaderDiv, setLoaderDiv] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)
    const [sidebar, setSidebar] = useState([])
    const location = useLocation()
    const refBannerBottomScript = useRef()
    const refBannerBottomDiv = useRef()

    let isBannerShown;
    function addBanner(){
        const width = window.innerWidth;
        window.addEventListener('resize', checkWidth)
        if((width >= 950) || isBannerShown) return
        isBannerShown = true;
        refBannerBottomScript.current.innerHTML = `
            window.yaContextCb.push(()=>{
                Ya.Context.AdvManager.render({
                    "blockId": "R-A-7815909-2",
                    "type": "floorAd",
                    "platform": "touch"
                })
            })
        `
        window.removeEventListener('resize', checkWidth)
    }

    function checkWidth(){
        addBanner()
    }
    



    useEffect(() => {
        window.scrollTo(0,0)
        isBannerShown = false
        abortController()   // для прерывания предыдущих запросов
        reinitController()
        preload()
        addBanner()
    }, [location.pathname])

    let isRepeatRequest;
    async function preload(){
        try{
            setLoaderDiv(true)
            isRepeatRequest = false;
            article.clear()
            setSidebar([])
            const title = articleName.replace(/_/g, " ");
            const articleData = await getArticle(title, {signal: getControllerSignal()})
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
            if(e.response?.status === 404){
                setIsNotFound(true)
            }
            else{
                if(axios.isCancel(e))  isRepeatRequest = true;
                ErrorHandling(e, message)
            }
        }
        finally{
            if(!isRepeatRequest) setLoaderDiv(false)
        }
    }

    

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
                            <SidebarBanner />
                        </div>
                        <div ref={refBannerBottomDiv} className={classes.bannerBottom}>
                            <script ref={refBannerBottomScript}></script>
                        </div>
                    </div>
                }
            </div>
            <Bottom />
        </div>       
    )
}


export default observer(Article)