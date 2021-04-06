import React from 'react'
import CustomerForm from './CustomerForm'

export default function EditCustomer({id , name ,email, mobile , handleToggle}){

    return(
        <div>
            <CustomerForm handleToggle ={handleToggle} 
            id = {id} name ={name} email ={email} phNumber = {mobile}/>
        </div>
    )
}