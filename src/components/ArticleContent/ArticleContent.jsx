import { observer } from "mobx-react-lite";
import Code from "../Fragments/Code/Code";
import Image from "../Fragments/Image/Image";
import Text from "../Fragments/Text/Text";
import { useContext } from "react";
import { Context } from "../..";
import classes from './articleContent.module.css'
import SelectedArticle from '../SelectedArticle/SelectedArticle'
import LoaderDiv from "../LoaderDiv/LoaderDiv";
import { Helmet } from "react-helmet-async";
import { descriptionDefault } from "../../utils/SEO";

const ArticleContent = function({loaderDiv}){
    
    const {user, article} = useContext(Context)

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
        const type = fragment.type
        switch (type){
            case 'important':
            case 'text':
                return <Text key={ind} fragment={fragment} />
            case 'code':
                return <Code key={ind} fragment={fragment} />
            case 'img':
                return <Image styleImg = {{...fragment.style}} key={ind} fragment={fragment} />
        }
    }
    
    return (
        <div className={classes.container}>
        {
            loaderDiv ? <LoaderDiv />
                :
            <div>
                <Helmet>
                    <title>{article.title} </title>
                    <meta name="description" content={`Статья ${article.title}. ` + descriptionDefault} />
                </Helmet>
                <div className={classes.header}>
                    <h1 className={classes.title}>{article.title}</h1>
                    {
                        user.user.selectedArticles
                            &&
                        <div className={classes.selectedArticle}>
                            <SelectedArticle title={article.title} />
                        </div>
                    }
                </div>
                <div className={classes.content}>
                    {article.fragments.map((fragment, ind) => Fragment(fragment, ind))}
                </div>
            </div>
        }
        </div>  
    )
}

export default observer(ArticleContent)