import { $authHost, $host } from "."


export const getArticlesHome = async function(){
   
    const articles = await $host.get('/site/home/article/get')
    return articles.data
} 

export const getTitlesArticlesSection = async function(section){        
    const articles = await $host.get(`/site/article/getTitles/${section}`)
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

export const getArticle = async function(title){ 
    const article = await $host.post('/site/article/get', {title})
    return article.data
}