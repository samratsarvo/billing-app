import React from 'react'
import {useSelector} from 'react-redux'
import BillsItem from './BillsItem'
import { Grid, Typography } from '@material-ui/core'

const BillsList = (props) => {
const {handleShowBill} = props
    // bills
    let bills = useSelector((state) => {
        return state.bills
    })
    
    return (
        <div>
            <hr />
            <h2 style={{color:'green'}}>Bills List</h2>
            {bills.length === 0 ? (
                <div>
                    <Typography style={{color:'red'}}>No bills found</Typography>
                </div>
     
            ) : (
                <div>
                    <Grid style={{maxHeight : '400px', overflowY : 'scroll'}}container spacing={2}>
                    {bills.map((bill) => {
                        return (
                         <Grid item xs={12} key={bill._id}>
                         <BillsItem  {...bill} handleShowBill={handleShowBill}/>
                            </Grid>
                            )
                         })}
                    </Grid>
                </div>
            )}
            
        </div>
    )
}

export default BillsList