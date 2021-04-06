import React,{useEffect} from 'react'
import CustomerForm from './CustomerForm'
import {useDispatch} from 'react-redux'
import { startGetCustomer } from '../../Actions/customerActions'
import CustomerList from './CustomerList'
import {Grid} from '@material-ui/core'

export default function CustomerContainer(){
    const dispatch  = useDispatch()

    useEffect(()=>{
        dispatch(startGetCustomer())
    } ,[dispatch])

    return(
        <div>
             <Grid container spacing={20}>

                <Grid item xs={6}>
                    <CustomerForm />
                </Grid>

                <Grid item xs={6}>
                     <CustomerList/>
                </Grid>
            </Grid>
        </div>
    )
}