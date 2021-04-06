import axios from 'axios'
import swal from 'sweetalert'


// getting user account details

export const startgetUser = ()=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/users/account' , {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })

        .then((responce)=>{
            const result = responce.data
            dispatch(userInfo(result))
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}

export const userInfo=(data)=>{
    return{
        type :"USERINFO",
        payload : data
    }
}

// clear the store of my account details 
export const clear = ()=>{
    return {
        type : "CLEAR"
    }
}