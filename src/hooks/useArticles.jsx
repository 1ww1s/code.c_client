import { useMemo } from "react"


export const useArticles = function(articles, query){
    const searchedArticles = useMemo(() => {
        return articles.filter(article => article.toLowerCase().includes(query.toLowerCase()))
    }, [articles, query])
    return searchedArticles
}