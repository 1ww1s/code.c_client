
export class ValidationError extends Error {
    constructor(status, message){
        super()
        this.status = status
        this.message = message
    }

    static BadRequest(message){
        return new ValidationError(400, message)
    }

}