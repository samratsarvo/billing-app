import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { startBillsList } from '../../Actions/billsAction'
import AddBill from './AddBill'
import BillsList from './BillsList'
import { Grid } from '@material-ui/core'
import { startGetCustomer } from '../../Actions/customerActions'
import { startGetProducts } from '../../Actions/productActions'

const BillContainer = (props) => {
    const { handleShowBill } = props
    const dispatch = useDispatch()
      
    useEffect(() => {
        dispatch(startGetCustomer())
        dispatch(startGetProducts())
        dispatch(startBillsList())
    }, [dispatch])


    return (
        <div >
          <Grid container spacing={20}>

            <Grid item xs={6}>
                <AddBill />
            </Grid>

            <Grid item xs={6}>
                <BillsList handleShowBill={handleShowBill}/>
            </Grid>
          </Grid>
        </div>
    )
}

export default BillContainer