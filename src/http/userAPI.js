import {$authHost, $host} from './index'

export const registration = async (email, password) => {
    const data = await $host.post('/user/auth/registration', {email, password})
    localStorage.setItem('token', data.data.accessToken)
    return data.data.user
}

export const login = async (email, password) => {
    const data = await $host.post('/user/auth/login', {email, password})
    localStorage.setItem('token', data.data.accessToken)
    return data.data.user
}

export const reminder = async function(email){
    const res = await $authHost.post('/user/auth/reminder', {email})
    return res.data
}

export const recover = async function(link, password){
    const res = await $authHost.post('/user/auth/recover', {link, password})
    return res.data
}

export const addSelectedArticle = async function(email, title){
    await $authHost.post('/user/selectedArticle/add', {email, title})
}

export const removeSelectedArticle = async function(email, title){
    await $authHost.post('/user/selectedArticle/remove', {email, title})
}


// await new Promise(resolve => setTimeout(resolve, 4000)) 

export const logout = async (abortController) => {
    await $authHost.get('/user/auth/logout', {
        signal: abortController?.signal
    })
    localStorage.removeItem('token')
}

export const sendActivation = async function(email, abortController){  
    const res = await $authHost.post('/user/sendActivation', {email}, {
        signal: abortController?.signal
    })
    return res.data
}

export const refresh = async () => {
    const data = await $authHost.get('/user/auth/refresh')
    localStorage.setItem('token', data.data.accessToken)
    return data.data.user
}

export const check = async() => {
    const res = await $authHost.get('/user/auth/check')
    return res.data 
}



export const updateUserpic = async(data, abortController) => { 
    const user = await $authHost.post('/user/userpic/update', {data}, {
        signal: abortController?.signal
    })
    return user.data
}