import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {TextField,  Button, Grid} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';
import {   Container, Typography, Card, CardActionArea,  CardActions, CardContent} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { startAddBill } from '../../Actions/billsAction'
import {addItem, resetItems , incrementQuantity, decrementQuantity, removeItem} from '../../Actions/lineItemsAction'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';


  export default function BillForm(){
    const dispatch=useDispatch()

    const customersList=useSelector((state)=>{
        return state.customer
    })

    const productsList=useSelector((state)=>{
        return state.product
    })

    const lineItems = useSelector((state) => {
        return state.lineItems
    })

    const [ date,setDate ] = useState(new Date())
    const [ customer,setCustomer ] = useState('')
    const [ product,setProduct ] = useState('')
    const [ quantity,setQuantity ] = useState(1)
    const [formError , setFormError] = useState({})
    const error  = {}

    //validation
    const runValidator=()=>{
        // for date
        if(!date){
            error.date = "date cannot be blank "
          }

        // for customer
        if(customer.length === 0){
            error.customer = "customer cannot be blank "
          }       

        // for product
        if(product.length === 0){
            error.product = "product cannot be blank "
          }    
    }

    const  handleDateChange = (date) => {
        setDate(date)
      }

    const handleCustomerChange = (e,val) => {
        console.log('id', val)
        if(val){
            setCustomer(val._id )
        }else{
            setCustomer('')
        }  
    }

    const handleProductChange=(e,val)=>{
        console.log('product_id', val)
        if(val){
            setProduct(e.target.value)
            newLineItem(val)
        } else {
            setProduct('')
        }
    }

    const newLineItem = (item) => {
        const newItem = {
            'prodId' : new Date(),
            'prodName' : item.name,
            'price' : item.price,
            'product' : item._id,
            'quantity' : quantity
        }
        dispatch(addItem(newItem))
        console.log('lineItems', lineItems)
    }

    //decreasing quantity
    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id))
    }

    //increasing quantity
    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id))
    }

    //removing item in lineItems
    const handleRemove = (id) => {
        dispatch(removeItem(id))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        runValidator()

        if(Object.keys(error).length === 0){
            setFormError({})
            const formData = {
                'date' : date ,
                'customer' : customer,
                'lineItems' : lineItems                
            }
            dispatch(startAddBill(formData))
            setDate(new Date())
            setCustomer('')
            setProduct('')
            dispatch(resetItems())
            } else {
                setFormError(error)
        }        
    }

    const totalBill = () => {
        let total = 0

        lineItems.forEach((item) => {
            total += (item.price * item.quantity)
        })

        return total
    }

    return (
        <Container>
            <form onSubmit={handleSubmit}>

            <Grid container spacing={2} >
        <Grid item xs={12}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <FormControl size="small" style={{width:"300px"}} >
            <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date"
            format="yyyy/MM/dd"
            value={date}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change date',
                }}
                />
            </FormControl>
            </MuiPickersUtilsProvider>
            </Grid>
                    <Grid item xs={10} >
                    { formError.date && <Typography style={{color : 'red'}}> {formError.date} </Typography> }
                    </Grid>

                    <Grid item xs={12}> 
                    <Autocomplete
                       options={customersList}
                       getOptionLabel={(customer) => customer.name}
                       onChange={handleCustomerChange}
                       style={{width:"300px"}}
                       renderInput={(params) => (
                         <TextField {...params} label="customer" variant="outlined" fullWidth />
                       )}
                     />
                   </Grid>
                    
                    <Grid item xs={10} >
                    { formError.customer && <Typography style={{color : 'red'}}> {formError.customer} </Typography> }
                    </Grid>

                    <Grid item xs={12}>
                    <Autocomplete
                            options={productsList}
                            getOptionLabel={(option) => option.name}
                            onChange={handleProductChange}
                            value={product || ''}
                            size="small" 
                            style={{width:"300px"}}
                            renderInput={(params) => (
                            <TextField {...params} label="Product" variant="outlined" fullWidth />
                            )}
                    />

                    </Grid>
                    <Grid item xs={10} >
                    { formError.product && <Typography style={{color : 'red'}}> {formError.product} </Typography> }
                    </Grid>

                    <Grid item xs={10} align='left'> 
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                        > ADD </Button>
                    </Grid>

                    <Grid item xs={6} >
                    {lineItems.length > 0 && (
                        <div>
                            <Typography style={{ color : 'teal'}} variant='b' component='h3'>Items List :</Typography>
                            <Typography style={{ color : 'teal'}}>Total Bill : ₹{totalBill()}</Typography>
                        </div>
                    )}

                    <Grid item xs={10   } >
                       {lineItems.map((item) => {
                          return <Card  key={item.prodId} elevation={1} style={{width:'400px'}} size="small">
                                 <CardActionArea>
                                   <CardContent>
                                    <b>{item.prodName}</b> - Unit Price: ₹{item.price}<br/>
                                       Sub Total: ₹{item.price * item.quantity}
                                   </CardContent>
                                   <CardActions >
                                      <Button size="small" color="primary"
                                        onClick={() => {handleDecrement(item.prodId)}}> -   
                                     </Button>
                                     {item.quantity}
                                     <Button size="small" color="primary"
                                        onClick={() => {handleIncrement(item.prodId)}}> +
                                     </Button>
                                     <Button size="small" color="secondary"
                                        onClick={() => {handleRemove(item.prodId)}} > delete 
                                    </Button>
                                   </CardActions>
                                 </CardActionArea>
                                  </Card>
                       })}
                    </Grid>
                </Grid>

                </Grid>    
            </form>  
        </Container>                
    )
}
