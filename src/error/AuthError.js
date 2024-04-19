export default function(err){
    if(err.response.status === 422){
        alert(err.response.data.message)
    }

}