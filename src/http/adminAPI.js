import { $authHost } from "."

export const createArticle = async function(article){
    const res = await $authHost.post('/admin/article/create', article)
    return res.data
}

export const updateArticle = async function(article){
    const res = await $authHost.post('/admin/article/update', article)
    return res.data
}

export const updateArticles = async function(articles){
    const res = await $authHost.post('/admin/articles/update', {articles})
    return res.data
}


export const createSection = async function(name, value){
    const res = await $authHost.post('/admin/section/create', {name, value})
    return res.data
}

export const createRole = async function(value){
    const res = await $authHost.post('/admin/role/create', {value})
    return res.data
}

export const getRoles = async function(){
    const roles = await $authHost.get('/admin/role/get')
    return roles.data
}

let controller = null;
export const getUsers = async function(email){
    try{   
        if(controller){
            controller.abort()
        }
    
        controller = new AbortController()
        const res = await $authHost.post('/admin/user/get', {email}, {
            signal: controller.signal
        })
        return res.data
    }
    catch(e){
        if(controller.signal.aborted) return []
        else throw e
    }
}

export const updateRolesUser = async function(user){        
    const res = await $authHost.post('/admin/user/updateRole', {user})
    return res.data
}

export const updateSection = async function(sections){
    const res = await $authHost.post('/admin/section/update', {sections})
    return res.data
}


export const getHomeSection = async function(){                   
    const res = await $authHost.get('/admin/section/home/get')
    return res.data
}

export const getTitlesArticles = async function(){    
    const articles = await $authHost.get('/admin/article/getTitles')
    return articles.data
}

export const getHomeTitlesArticles = async function(){        
    const articles = await $authHost.get('/admin/article/home/getTitles')
    return articles.data
}

// export const getTitlesArticlesSection = async function(section){
//     const articles = await $authHost.get(`/admin/article/getTitles/${section}`)
//     return articles.data
// }

export const removeRole = async function(value){
    const res = await $authHost.post('/admin/role/remove', {value})
    return res.data
}

export const removeArticle = async function(title){
    const res = await $authHost.post('/admin/article/remove', {title})
    return res.data
}