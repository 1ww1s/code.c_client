import {makeAutoObservable} from 'mobx'

export default class userStore{
    constructor(){
        this._isAuth = false
        this._user = {}
        this._isLoading = false
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool
    }

    setUser(user){
        this._user = user
    }

    setLoading(bool){
        this._isLoading = bool
    }

    get isLoading(){
        return this._isLoading
    }
    get user(){
        return this._user
    }

    get isAuth(){
        return this._isAuth
    }
}