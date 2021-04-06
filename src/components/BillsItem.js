import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

//Material UI
import {Container, Grid, Typography, Paper} from '@material-ui/core'


const BillsItem = (props) => {
    const {date, customer, lineItems, total} = props 
    const [product, setProduct] = useState('')
    const [quantity, setQuentity] = useState('')
    const [price, setPrice] = useState('')
    const [subTotal, setSubTotal] = useState('')

    const billCustomer=useSelector((state)=>{        
        return state.customer.find(c=>c._id === customer)
    })
    console.log("BillCustomerss", billCustomer)
    
    const billProduct=useSelector((state)=>{        
        return state.product.find(c=>c._id === product)
    })

    useEffect(()=>{
        lineItems.map(ele=>{
            setProduct(ele.product)
            setQuentity(ele.quantity)
            setPrice(ele.price)
            setSubTotal(ele.subTotal)    
        })
    },[lineItems])
    
    const pStyle = {
        position: "relative",
        top: "10px",
        left: "10px"
    }

    return(
        <Container>
          <Grid>
            <Grid style = {{position: "relative", padding: 7}}>
                <Paper style = {{position: "relative", padding: 7, top: 5}}>
                    <Typography style = {pStyle} variant = "h6"><b>Customer: </b>{billCustomer && billCustomer.name}</Typography>
                    <Typography style = {pStyle}><b>Date:</b>{date}</Typography>
                    <Typography style = {pStyle}><b>Product: </b>{billProduct && billProduct.name}</Typography>
                    <Typography style = {pStyle}><b>Price: </b>₹{price}</Typography>
                    <Typography style = {pStyle}><b>Quantity: </b>{quantity}</Typography>
                    <Typography style = {pStyle}><b>Sub Total: </b>₹{subTotal}</Typography>
                    <Typography style = {pStyle}><b>Total:</b> ₹{total}</Typography>
                </Paper>
            </Grid>
          </Grid>
        </Container>
    )
}

export default BillsItem