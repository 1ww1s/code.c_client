import { makeAutoObservable } from "mobx"


export default class SectionStore{
    constructor(){
        this._sections = []
        this.isLoading = false
        makeAutoObservable(this)
    }
    
    setSections(sections){
        this._sections = sections
    }

    setIsLoading(bool){
        this.isLoading = bool
    }

    get isLoadind(){
        return this.isLoadind
    }

    get sections(){
        return this._sections
    }
}