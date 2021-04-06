import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import {startDeleteBill} from '../../Actions/billsAction'
import CustomerItem from '../customers/CustomerItem';

const BillsItem = (props) => {
    let dispatch = useDispatch()
  

    const { _id, customer, lineItems, total, handleShowBill } = props

    const productsBought = useSelector((state) => {
        const arr = []

        for(const item of lineItems){
            const result = state.product.find(prod => prod._id === item.product)
            arr.push({...result, ...item})
        }
        return arr
    })

    // bills
    const customers = useSelector((state) => {
      return state.customer.find(cus => cus._id === customer)
  })

    // const handleBillBtn = () => {
    //    dispatch(addCustomer(customers))
    //    dispatch(addBillProduct(productsBought))
    //    dispatch(billTotal(total))
    //    handleShowBill()
    // }

    const handleRemove = (id) => {
      swal({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((Delete) => {
          if (Delete) {
              dispatch(startDeleteBill(id))
          } 
        })
  }

  const handleBillBtn = () => {
    handleShowBill()
 }
  
    return (
        <div>
          
          <CardActionArea>
          <CardContent>
            <Typography component="h2" gutterBottom variant="h5" >
              <b>Name :</b> {customers && customers.name}        
            </Typography>
            <Typography  component="p">
               Phn.No : {customers && customers.mobile}
            </Typography>                            
          <Table border="2" size="small">
            <TableHead>
            <TableRow>
            <TableCell>Products</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Total Price</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
              {productsBought.map((product) => {
                return (
              <TableRow key={product._id}>
             <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>₹{product.price}</TableCell>
              <TableCell>₹{product.subTotal}</TableCell>
                  </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
              <Typography  component="p" align="left">
              <b>Total: ₹{total}</b>
              </Typography>
              </CardContent>
              </CardActionArea>
              <CardActions>
              <Link to={`/PrintBill/${_id}`} >PRINT</Link>
              <Button size="small" color="secondary" onClick={() => {
              handleRemove(_id)
                }}>
              <DeleteIcon fontSize="small"/>
              </Button>                                  
              </CardActions>

        </div>   
    )
}

export default BillsItem