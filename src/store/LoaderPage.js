import { makeAutoObservable } from "mobx"



export default class LoaderPage {
    constructor(){
        this._isLoading = true
        makeAutoObservable(this)
    }

    setIsLoading(bool){
        this._isLoading = bool
    }

    get isLoading(){
        return this._isLoading
    }
}