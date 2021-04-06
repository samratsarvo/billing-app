import React,{useEffect} from 'react'
import ProductForm from './ProductForm'
import {useDispatch} from 'react-redux'
import { startGetProducts } from '../../Actions/productActions'
import ProductList from './ProductList'
import {Grid} from '@material-ui/core'

export default function ProductContainer(){
    const dispatch = useDispatch()


    useEffect(()=>{
        dispatch(startGetProducts())
    },[dispatch])

    return(
        <div>
             <Grid container spacing={20}>

                <Grid item xs={6}>
                    <ProductForm />
                </Grid>

                <Grid item xs={6}>
                    <ProductList/>
                </Grid>
            </Grid>
        </div>
    )
}