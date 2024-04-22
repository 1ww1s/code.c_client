import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL,
    withCredentials: true,
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_SERVER_API_URL,
    withCredentials: true,
})

const authInterceptor = (config) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}


$authHost.interceptors.response.use((config) => {  // callback = config, если запрос прошел успешно
    return config
}, async (error) => {
    const originalRequest = error.config;
    if((error.response.status === 401 || error.response.status === 403) && error.config && !originalRequest._isRetry) {
        try {
            originalRequest._isRetry = true;
            const data = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/user/auth/refresh`,
            {
                withCredentials: true
            });  
            localStorage.setItem('token', data.data.accessToken)
            return $authHost.request(originalRequest);
        }
        catch(e) {
            throw e
        }
    }
    throw error
})


$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}