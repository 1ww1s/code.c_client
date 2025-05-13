import { $host } from "."


export const getArticlesHome = async function(abortController){
    const articles = await $host.get('/site/home/article/get', {
        signal: abortController?.signal
    })
    return articles.data
} 

export const getTitlesArticlesSection = async function(section, abortController){        
    const articles = await $host.get(`/site/article/getTitles/${section}`, {
        signal: abortController?.signal
    })
    return articles.data
}

export const getLastArticles = async function(){
    const articles = await $host.get('/site/article/last/get')
    return articles.data
}


export const getSection = async function(){       
    const res = await $host.get('/site/section/get')
    return res.data
}

export const getArticle = async function(title, abortController){ 
    const article = await $host.post('/site/article/get', {title}, {
        signal: abortController?.signal
    })
    await new Promise(resolve => setTimeout(resolve, 4000))

    return article.data
}