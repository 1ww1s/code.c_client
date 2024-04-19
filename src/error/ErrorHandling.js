export default function(e, message){
    message.setType('error')
    if(e.response && e.response.data?.message){
        message.setMessage(e.response.data.message)
    }
    else{
        if(e.status === 400 || e.status === 409){
            message.setMessage(e.message)
        }
    }
}