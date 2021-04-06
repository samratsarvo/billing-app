import React from 'react'
import ProductForm from './ProductForm'

export default function EditProduct( {id , name , price , handleToggle}){

    return (
        <div>
            <ProductForm id = {id} name ={name} price ={price} handleToggle = {handleToggle}/>
        </div>
    )
}