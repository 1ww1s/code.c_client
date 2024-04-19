import { action, makeAutoObservable } from "mobx"

export class Fragment{
    constructor(type = 'text', index = -1){
        this._title = ''
        this._text = ''
        this._type = type
        this._details = false
        this._status = 'change'
        this._index = index
        this._style = {}
        makeAutoObservable(this)
    }
    
    setStyle(style){
        this._style = style
    }

    setDetails(bool){
        this._details = bool
    }

    setTitle(title){    
        this._title = title
    }
    setText(text){    
        this._text = text
    }

    setType(type){
        this._type = type
    }

    setStatus(val){
        this._status = val
    }

    get details(){
        return this._details
    }
    
    get status(){
        return this._status
    }

    get title(){
        return this._title
    }

    get text(){
        return this._text
    }
    
    get type(){
        return this._type
    }

    get index(){
        return this._index
    }

    get style(){
        return this._style
    }
}