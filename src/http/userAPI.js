import {$authHost, $host} from './index'
import {jwtDecode} from 'jwt-decode'

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


export const addSelectedArticle = async function(email, title){
    await $authHost.post('/user/selectedArticle/add', {email, title})
}

export const removeSelectedArticle = async function(email, title){
    await $authHost.post('/user/selectedArticle/remove', {email, title})
}


// await new Promise(resolve => setTimeout(resolve, 4000)) 

export const logout = async () => {
    await $authHost.get('/user/auth/logout')
    localStorage.removeItem('token')
}

export const sendActivation = async function(email){  
    const res = await $authHost.post('/user/sendActivation', {email})
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

export const personalAccount = async () => {
    await $authHost.get('/user/personalAccount')
}

export const updateUserpic = async(data) => { 
    const user = await $authHost.post('/user/userpic/update', {data})
    return user.data
}