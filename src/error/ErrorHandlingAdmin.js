import { LOGIN_ROUTE } from "../utils/consts";
import ErrorHandling from "./ErrorHandling"


export default function(e, message, user, router){
    if(e.response?.status === 403){
        user.setUser({});
        user.setIsAuth(false)
        router(LOGIN_ROUTE)
    }
    else ErrorHandling(e, message)
}