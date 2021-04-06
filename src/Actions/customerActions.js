import axios from 'axios'
import swal from 'sweetalert'

// get customer 
export const startGetCustomer =()=>{
    return (dispatch)=>{
        axios.get('https://dct-billing-app.herokuapp.com/api/customers' , {
            headers : {
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            console.log('data', result)
            if(Object.keys(result).includes('errors')){
                swal(result.errors)
            } else {
                dispatch(getCustomers(result))
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}

export const getCustomers=(data)=>{
    return {
        type : "GET_CUSTOMER" ,
        payload : data
    }
}

// Add customers

export const startAddCustomers = (formdata) => {
    return (dispatch) => {
        axios.post("http://dct-billing-app.herokuapp.com/api/customers", formdata , {
            headers : {
                'Authorization' : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty("errors")){
                swal({title : result.errors ,icon : 'error'})
            }else {
                dispatch(addCustomer(result))
            }
        })
        .catch((err) => {
            alert(err.message)
        })
    }
}

export const addCustomer = (data)=>{
    return {
        type : "ADD_CUSTOMER" ,
        payload : data
    }
}

//remove

export const startRemoveCustomer =(id) =>{
    return (dispatch)=>{
        axios.delete(`https://dct-billing-app.herokuapp.com/api/customers/${id}`,  {
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })
        .then((response)=>{
            const result  = response.data
            if(Object.keys(result).includes('errors')){
                swal(result.errors)
            } else{
                swal("successfully removed the customer ")
                dispatch(remove(result))
            }
        })
        .catch((err)=>{
            swal(err.message)
        })
    }
}

export const remove =(data) =>{
    return {
        type : "REMOVE" ,
        payload : data
    }
}

export const startEditCustomer=(formData ,id)=>{
    return (dispatch)=>{
        axios.put(`https://dct-billing-app.herokuapp.com/api/customers/${id}`, formData ,{
            headers:{
                "Authorization":`Bearer ${localStorage.getItem('token')}`
            } })
            .then((response)=>{
                const result = response.data
                if(Object.keys(result).includes('errors')){
                    swal(result.errors)
                } else {
                    swal("successfully Edit the customer information")
                    dispatch(editCustomer(result))
                }
            })
            .catch((err)=>{
                swal(err.message)
            })
    }
}

export const editCustomer =(data)=>{
    return {
        type : "EDIT" ,
        payload : data
    }
}