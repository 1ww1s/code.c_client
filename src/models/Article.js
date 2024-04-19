import { action, makeAutoObservable } from "mobx"

export class Article{
    constructor(){
        this._title = ''
        this._fragments = [] 
        this._section = ''
        makeAutoObservable(this)
    }
    
    addFragment(fragment, index = this._fragments.length, deleteCount = 0){
        return this._fragments.splice(index, deleteCount, fragment)
    }

    setTitle(title){
        this._title = title
    }

    setSection(section){
        this._section = section
    }

    get section(){
        return this._section
    }
    get title(){
        return this._title
    }

    get fragments(){
        return this._fragments
    }

}