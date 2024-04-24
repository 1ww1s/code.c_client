import React, { useContext, useEffect, useState } from 'react';
import classes from './articleCreateAndUpdate.module.css'
import { observer } from 'mobx-react-lite';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../../..'
import Text from '../../Fragments/Text/Text';
import Code from '../../Fragments/Code/Code';
import MyButton from '../../UI/buttonAdmin/MyButtonAdmin';
import { createArticle, updateArticle } from '../../../http/adminAPI';
import { ADMIN_ARTICLE_CREATE_ROUTE, ADMIN_ARTICLE_LIST_ROUTE, ADMIN_HOME_ARTICLE_CREATE_ROUTE, 
ADMIN_HOME_ARTICLE_LIST_ROUTE, ADMIN_HOME_ARTICLE_UPDATE_ROUTE, ADMIN_ROUTE } from '../../../utils/consts';
import CreateFragment from '../CreateFragment/CreateFragment';
import ErrorHandling from '../../../error/ErrorHandling';
import ErrorHandlingAdmin from '../../../error/ErrorHandlingAdmin';
import MySelect from '../../UI/select/MySelect';
import Loader from '../../UI/loader/Loader';
import MyInput from '../../UI/input/MyInput';
import MarkdownInfo from '../../modals/Markdown/MarkdownInfo'
import question from '../../../assets/question.png'
import { ValidationError }  from '../../../error/ValidationError';
import LoaderDiv from '../../LoaderDiv/LoaderDiv';
import AddFragment from '../../Admin/AddFragment/AddFragment';
import Image from '../../Fragments/Image/Image'
import { choiceHomeArticles } from '../../Pages/utils';
import { getSection } from '../../../http/SiteAPI';

const ArticleCreateAndUpdate = () => {

    const location = useLocation()
    const isCreate = (location.pathname === ADMIN_ARTICLE_CREATE_ROUTE) || (location.pathname === ADMIN_HOME_ARTICLE_CREATE_ROUTE)
    const isHome = (location.pathname === ADMIN_HOME_ARTICLE_UPDATE_ROUTE) || (location.pathname === ADMIN_HOME_ARTICLE_CREATE_ROUTE)
    const [showMarkdownInfo, setShowMarkdownInfo] = useState(false)   
    const {article, message, section, user, homePage} = useContext(Context)
    const router = useNavigate()

    useEffect(() => {
        if(!isCreate && (article.title === '') && !article.isLoading){
            router(isHome ? ADMIN_HOME_ARTICLE_LIST_ROUTE : ADMIN_ARTICLE_LIST_ROUTE)   
        } 
    }, [article.isLoading])

    useEffect(() => { 
        if(isHome)  return 
        user.setLoading(true)
        getSection()
        .then((sections) => section.setSections(sections))
        .catch((e) => {
            ErrorHandling(e, message)   
        })
        .finally(() => user.setLoading(false))
    }, [])

    function click(fragment){
        fragment.setStatus('change')
    }

    function Fragment(fragment, ind){
        if(fragment.details){
            return  <details key={ind} className={classes.details}>
                        <summary  
                            data-open="Закрыть" 
                            data-close={fragment.title || 'Открыть'}
                            onMouseDown={e => {if(e.detail > 1) e.preventDefault()}} 
                        />
                        <div className={classes.detailsContent}>{choiceFragment(fragment, ind)}</div>
                    </details>
        }
        else return choiceFragment(fragment, ind)
    }
    
    function choiceFragment(fragment, ind){
        switch (fragment.type){
            case 'important':
            case 'text':
                return  <Text 
                            style={ fragment.text === '' && fragment.title === '' ? {border: '1px solid black'} : {}}
                            onMouseDown={(event)=>{
                                if (event.detail > 1){
                                    click(fragment)
                                    event.preventDefault();
                                } 
                            }}
                            key={ind} 
                            fragment={fragment}
                        /> 
            case 'code':
                return  <Code 
                            onMouseDown={(event)=>{
                                if (event.detail > 1) event.preventDefault();
                            }}
                            onDoubleClick={() => click(fragment)}   
                            key={ind} 
                            fragment={fragment} 
                        />
            case 'img':
                return  <Image 
                            style={(fragment.text === '' && fragment.title === '') ? {border: '1px solid black'} : {}}
                            onMouseDown={(event)=>{
                                if (event.detail > 1) event.preventDefault();
                            }}
                            styleImg = {{...fragment.style}}
                            onDoubleClick={() => click(fragment)}   
                            key={ind} 
                            fragment={fragment}  
                        />
        }
    }

    function checkArticle(article){
        if(article.title === ''){
            throw ValidationError.BadRequest('Нет названия статьи')
        }
        if(article.section === ''){
            throw ValidationError.BadRequest('Не выбран раздел статьи')
        }
        article.fragments.map(fragment => {
            if(fragment.text === '' && fragment.title === ''){
                throw ValidationError.BadRequest('Один из фрагментов пустой')
            }
        })
        return true
    }

    async function sendArticle(){   // loading
        user.setLoading(true)
        try{
            if(isHome) article.setSection('home')
            checkArticle(article)
            article.fragments.map(fragment => {
                if(fragment.details) fragment.setType(fragment.type.concat(' details'))
            })
            let res;
            if(isCreate){
                res = await createArticle(article)
            }
            else{
                res = await updateArticle(article)
            }
            message.setType('ok')
            message.setMessage(res.message)
            router( isCreate ? ADMIN_ROUTE : isHome ? ADMIN_HOME_ARTICLE_LIST_ROUTE : ADMIN_ARTICLE_LIST_ROUTE)
        }
        catch(e){
            ErrorHandlingAdmin(e, message, user, router)
        }
        finally{
            user.setLoading(false)
        }
    }
    
    if(article.isLoading){
        return (
            <div className={classes.container}>
                <div className={classes.wrapper}>
                    <LoaderDiv />
                </div>
            </div>
        )
    }


    return (
        <div className={classes.container}>
            <div className={classes.wrapper}>
                {   
                    isCreate 
                        ?
                    <div className={classes.title}>
                        <h1 className={classes.titleText}>Название {isHome ? 'блока' : 'статьи'}</h1>
                        <div className={classes.titleInput}>
                            <MyInput 
                                value={article.title} 
                                onChange={(e) => article.setTitle(e.target.value)} 
                                placeholder='Название...'
                            />
                        </div>
                    </div>
                        :
                    !isHome && <h1>{article.title} </h1> 
                }
                {
                    !isHome
                      && 
                    <div className={classes.sectionChoice}>
                        <h1 className={classes.titleText}>Раздел</h1>
                        <MySelect 
                            defaultValue={'Раздел не выбран'}  
                            value={article.section}
                            options={section.sections.filter(s => s.value != 'home')} 
                            onChange={(value) => article.setSection(value)}
                        />
                    </div>
                } 
                {
                    isHome && !isCreate
                        ?
                    choiceHomeArticles(article.fragments, article.title, homePage.blockInd)
                        :
                    <div className={classes.content}>
                        {article.fragments.map((fragment, ind) => {
                            return fragment.status === 'change' ? <CreateFragment key={ind} id={ind} /> : Fragment(fragment, ind)                    
                        })}
                    </div>

                }

                {   
                    !article.fragments.length
                        &&
                    <div className={classes.addFragment}>
                        <AddFragment id={0} /> 
                    </div>
                }

                <hr className={classes.hr}></hr>
                <div className={classes.bottom}>   
                    {   
                        <div onClick={() => setShowMarkdownInfo(true)} className={classes.markdownSign}>
                            markdown
                            <img className={classes.markdownImg} src={question} /> 
                        </div>     
                    }
                    <div className={classes.sendButton}>
                        <MyButton onClick={() => sendArticle()} disabled={message.message || user.isLoading} className={classes.button}>
                            { user.isLoading ? <div className={classes.loader}> <Loader /> </div> : isCreate ? 'Опубликовать' : 'Внести изменения'}
                        </MyButton>   
                    </div>      
                </div>

                { showMarkdownInfo && <MarkdownInfo onHide={() => setShowMarkdownInfo(false)} /> }
            </div>
        </div>
    )
}

export default observer(ArticleCreateAndUpdate)