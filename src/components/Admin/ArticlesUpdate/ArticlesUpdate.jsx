import React, { useContext, useEffect, useState } from "react";
import classes from './articlesUpdate.module.css'
import MySelect from "../../UI/select/MySelect";
import { updateArticles } from "../../../http/adminAPI";
import { Context } from "../../..";
import ErrorHandling from "../../../error/ErrorHandling";
import { observer } from "mobx-react-lite";
import LoaderDiv from "../../LoaderDiv/LoaderDiv";
import { Reorder } from 'framer-motion'
import MyButton from "../../UI/buttonAdmin/MyButtonAdmin";
import Loader from "../../UI/loader/Loader";
import { useLocation } from "react-router-dom";
import { ADMIN_HOME_ARTICLES_UPDATE_ROUTE } from "../../../utils/consts";
import { getSection, getTitlesArticlesSection } from "../../../http/SiteAPI";
 
const ArticlesUpdate = function(){

    const [articles, setArticles] = useState([])
    const {section, message, article} = useContext(Context)
    const [selectedSection, setSelectedSection] = useState('')
    const location = useLocation()
    const isHome = location.pathname === ADMIN_HOME_ARTICLES_UPDATE_ROUTE

    useEffect(() => {
        if (isHome) {
            setSelectedSection('home')
            return
        }
        getSection()
        .then(sections => section.setSections(sections))
        .catch(e => ErrorHandling(e, message))
    }, [])

    useEffect(() => {
        if(selectedSection === '') return
        article.setIsLoading(true)
        getTitlesArticlesSection(selectedSection)
        .then(res => setArticles(res))
        .catch(e => ErrorHandling(e, message))
        .finally(article.setIsLoading(false))
        
    }, [selectedSection])

    async function sendChanges(){
        article.setIsLoading(true)
        try{
            const res = await updateArticles(articles)
            message.setType('ok')
            message.setMessage(res.message)
        }
        catch(e){
            ErrorHandling(e, message)
        }
        finally{
            article.setIsLoading(false)
        }
    }

    return (
        <div className={classes.container}>
            {   !isHome
                    &&
                <span>
                    <h1 className={classes.title}>Выбрать раздел</h1>
                    <MySelect 
                        disabled={article.isLoading}
                        value={selectedSection}
                        defaultValue={'Раздел не выбран'}
                        options={section.sections.filter(s => s.value !== 'home')}
                        onChange={(value) => setSelectedSection(value)}
                    />
                </span>
            }
            <h1 className={classes.title}>{isHome ? 'Список блоков' : 'Список статей'}</h1>
            <div className={classes.articles}>
                { article.isLoading && <LoaderDiv /> }
                {   articles.length === 0 
                        ? 
                    <p>Нет статей</p> 
                        : 
                    <Reorder.Group values={articles} onReorder={setArticles}>
                            {   
                                articles.map(article => 
                                    <Reorder.Item key={article} id={article} value={article} >
                                        <div className={classes.article}>{article}</div>
                                    </Reorder.Item>
                                )
                            }
                    </Reorder.Group>
                }
            </div>
            <hr className={classes.hr}></hr>
            <div className={classes.sendButton}>
                <MyButton onClick={() => sendChanges()} disabled={message.message || article.isLoading} className={classes.button}>
                    { article.isLoading ? <div className={classes.loader}> <Loader /> </div> : 'Внести изменения'}
                </MyButton>
            </div>      
        </div>
    )
}

export default observer(ArticlesUpdate)