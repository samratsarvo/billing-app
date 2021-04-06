import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import jsPDF from "jspdf"
import {Container, Grid, 
         Typography,  Button} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'

const PrintBill = (props) => {
    const {id} = props.match.params

    let [uniqueBill, setUniqueBill] = useState({})
    const [orderDetails, setOrderDetails] = useState([])
    const [product, setProduct] = useState('')
    const [quantity, setQuentity] = useState('')
    const [price, setPrice] = useState('')
    const [subTotal, setSubTotal] = useState('')

    const billCustomer=useSelector((state)=>{        
            return state.customer.find(c=>c._id === uniqueBill.customer)
        })
        
    const billProduct=useSelector((state)=>{        
        return state.product.find(c=>c._id === product)
    })
    
    useEffect(()=>{
        axios.get(`https://dct-billing-app.herokuapp.com/api/bills/${id}`, {
            headers: {
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response)=>{
            const result = response.data
            console.log('result', result)
            setUniqueBill(result)
            setOrderDetails(result.lineItems)
            result.lineItems.map(ele=>{
                setProduct(ele.product)
                setQuentity(ele.quantity)
                setPrice(ele.price)
                setSubTotal(ele.subTotal)
                
            })
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[id])

//generate pdf
    const generatePDF = () => {
      let doc = new jsPDF('p', 'pt');
      
      doc.text(280, 20, `Bill`)

      doc.setFont('helvetica')
    //   doc.setFontType('normal')
      doc.text(20, 60, `Customer_id: ${billCustomer && billCustomer.name}`)

      doc.setFont('helvetica')
    //   doc.setFontType('normal')
      doc.text(20, 80, `Date: ${uniqueBill.date.slice(0,10)}`)
      
      doc.text(20, 100, `Order Details: 
                        Product_Id: ${billProduct && billProduct.name}
                        Quantity: ${quantity}
                        Price: ${price}
                        Sub-Total: ${subTotal}`
        )      
      doc.text(20, 200, `Total: ${uniqueBill.total}`)
      
      doc.save(`${billCustomer && billCustomer.name}'s Bill.pdf`)
    }


    return(
        <Container>
            <Grid>
                    <Typography variant = "h4" style={{textAlign : 'center', color: 'green'}}>Bill-Details</Typography>
                <hr/>
                    <Typography><b>Customer:</b>{billCustomer && billCustomer.name}</Typography>
                    <Typography><b>Date:</b> {uniqueBill.date}</Typography>
                    <Typography><b>Product: </b>{billProduct && billProduct.name}</Typography>
                    <Typography><b>Price: </b>₹{price}</Typography>
                    <Typography><b>Quantity: </b>{quantity}</Typography>
                    <Typography><b>Sub Total: </b>₹{subTotal}</Typography>
                    <Typography><b>Total:</b> ₹{uniqueBill.total}</Typography>
                <hr/>
                <Grid container>
                    <Button style = {{left: 4}} startIcon={<SaveIcon />} variant="small" onClick = {generatePDF}>Pdf</Button>
                </Grid>
            </Grid>
        </Container>
    )
}
export default PrintBill

// const billCustomer=useSelector((state)=>{        
//     return state.customers.find(c=>c._id === uniqueBill.customer)
// })
// console.log("BillCustomer", billCustomer)
// billCustomer && billCustomer.name
