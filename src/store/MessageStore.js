import { makeAutoObservable } from "mobx"


export default class MessageStore{
    constructor(){
        this._message = ''
        this._type = ''
        makeAutoObservable(this)
    }
    
    setMessage(message){
        this._message = message
    }
     
    setType(type){
        this._type = type
    }

    get message(){
        return this._message
    }
    
    get type(){
        return this._type
    }
}