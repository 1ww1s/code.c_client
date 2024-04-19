import { makeAutoObservable } from 'mobx'

export default class ArticleStore{
    constructor(){
        this._title = ''
        this._fragments = []
        this._section = ''
        this._isLoading = false
        makeAutoObservable(this)
    }

    clear(){
        this._fragments = []
        this._section = ''
        this._title = ''
    }

    setIsLoading(bool){
        this._isLoading = bool
    }

    addFragment(fragment, index = this._fragments.length, deleteCount = 0){
        return this._fragments.splice(index, deleteCount, fragment)
    }

    removeFragment(index){
        this._fragments.splice(index, 1)
    }

    setTitle(value){
        this._title = value
    }

    setSection(section){
        this._section = section
    }

    setChangeFragment(fragment, ind){
        this._fragments[ind] = fragment
    }

    get isLoading(){
        return this._isLoading
    }

    get title(){
        return this._title
    }

    get section(){
        return this._section
    }

    get fragments(){
        return this._fragments
    }
}