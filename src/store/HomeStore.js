import { makeAutoObservable } from "mobx";

export default class HomePage{
    constructor(){
        this._articles = null
        this._blockInd = -1
        makeAutoObservable(this)
    }

    setArticles(articles){
        this._articles = articles
    }

    setBlockInd(ind){
        this._blockInd = ind
    }

    get itExists(){
        return true
    }

    get blockInd(){
        return this._blockInd
    }

    get articles(){
        return this._articles
    }
} 