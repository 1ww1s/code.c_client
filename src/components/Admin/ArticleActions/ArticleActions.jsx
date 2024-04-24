import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import classes from './articleActions.module.css'
import MyButton from "../../UI/buttonAdmin/MyButtonAdmin";
import { removeArticle } from "../../../http/adminAPI";
import { Context } from "../../..";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_ARTICLE_LIST_ROUTE, ADMIN_ARTICLE_UPDATE_ROUTE, ADMIN_HOME_ARTICLE_UPDATE_ROUTE, HOME_ROUTE } from "../../../utils/consts";
import { Fragment } from "../../../models/Fragment";
import ErrorHandling from "../../../error/ErrorHandling";
import ErrorHandlingAdmin from "../../../error/ErrorHandlingAdmin";
import Loader from "../../UI/loader/Loader";
import { getArticle } from "../../../http/SiteAPI";

const ArticleActions = function({articles, setArticles, title, activeButton, setActiveButton, ind}){

    const location = useLocation()
    const {user, message, article, homePage} = useContext(Context)
    const router = useNavigate()

    async function update(){ 
        article.setIsLoading(true)
        try{
            if(location.pathname === ADMIN_ARTICLE_LIST_ROUTE) router(ADMIN_ARTICLE_UPDATE_ROUTE) 
            else router(ADMIN_HOME_ARTICLE_UPDATE_ROUTE)
            const articleData = await getArticle(title)
            article.setTitle(articleData.title)
            homePage.setBlockInd(ind)
            article.setSection(articleData.section)
            articleData.fragments.map((fragment, ind) => {
                const [type, details] = fragment.type.split(' ') 
                const newF = new Fragment(type, ind) 
                if(details === 'details') newF.setDetails(true)
                newF.setStyle(fragment.style)
                newF.setStatus('preview')
                newF.setTitle(fragment.title)
                newF.setText(fragment.text)
                article.addFragment(newF)
            })
        }
        catch(e){
            ErrorHandling(e, message)
        }
        finally{
            article.setIsLoading(false)
        }
    }

    async function articleRemove(){
        user.setLoading(true)
        setActiveButton(title)
        removeArticle(title)
        .then((res) => {
            let ind = articles.indexOf(title)
            setArticles(articles.filter((_, i) => i !== ind))
            message.setType('ok')
            message.setMessage(res.message)
        })
        .catch(e => {
            ErrorHandlingAdmin(e, message, user, router)
        })
        .finally(() => {
            setActiveButton('')
            user.setLoading(false)
        })
    }

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>{title}</h2>
            <div className={classes.actions}>
                <div className={classes.button}>
                    <MyButton disabled={message.message || user.isLoading || article.isLoading} onClick={update}>
                        <span className={classes.buttonText}>изменить</span>
                    </MyButton>  
                </div>
                <div className={classes.button}>  
                    <MyButton disabled={message.message || user.isLoading || article.isLoading} onClick={articleRemove}>
                        { (user.isLoading  && (title === activeButton))  ? <div className={classes.loader}><Loader /></div> : <span className={classes.buttonText}>удалить</span> }
                    </MyButton> 
                </div>
            </div>
        </div>
    )
}

export default observer(ArticleActions)