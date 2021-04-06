import React from 'react'
import {useDispatch} from 'react-redux'
import {startAddBill} from '../../Actions/billsAction'
import BillsForm from './BillsForm'


export default function AddBill(){
    const dispatch = useDispatch()
   
    const formSubmit = (bill) => {
        dispatch(startAddBill(bill))
    }

    return (
        <div>
          <hr />
           <h2 style={{color:'orange'}}>Add a Bill</h2>
            <BillsForm
           formSubmit={formSubmit}
            />
        </div>
    )
}