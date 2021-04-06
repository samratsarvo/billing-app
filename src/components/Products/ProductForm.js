import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { startAddProduct, startEditProduct } from '../../Actions/productActions'
import {TextField,  Button, Grid} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';

export default function ProductForm({id , name : title , price : cost , handleToggle}){
    const dispatch = useDispatch()
    const [name , setName] = useState( title ? title :'')
    const [price , setPrice] = useState(cost ? cost :'')
    const [formError ,setFormError]  = useState({})
    const error = {}

    const handleInput = (e)=>{
        const input = e.target.name
        if(input === "name"){
            setName(e.target.value)
        } else if(input === "price"){
            setPrice(e.target.value)
        }
    }

    const runValidation=()=>{
        //name
        if(name.trim().length === 0){
            error.name = "name can not be empty "
        }

        // for price

        if(price.trim().length === 0){
            error.price = "price can not be empty"
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault()

        //for validation 
        runValidation()
        
        if(Object.keys(error).length === 0){
            setFormError({})

            const formData = {
                name : name ,
                price : Number(price)
            }

            if(handleToggle){
                dispatch(startEditProduct(formData,id))
                handleToggle()
            } else{
                dispatch(startAddProduct(formData))
            }

            // reset the form 
            setName('')
            setPrice('')

        } else {
            setFormError(error)
        }
        
    }
    
    return (
        <div>
             <hr />
            <h2 style={{color:'orange'}}>Add Product</h2>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12}> 
            <FormControl size="small" style={{width:"300px"}} >
            <TextField  name = "name" type="text" label="name" value={name} onChange={handleInput} /><br/>
            {formError.name && <span style={{color : 'red'}}>{formError.name}</span>}
            </FormControl>
            </Grid>

            <Grid item xs={12}>
            <FormControl size="small" style={{width:"300px"}} > 
            <TextField name = "price" type="text" label="price" value={price} onChange={handleInput} /><br/>
            {formError.price && <span style={{color : 'red'}}>{formError.price}</span>}
            </FormControl>
            </Grid>
            
            <Grid item xs={12}> 
                <Button type="submit" size="small" variant="contained" color="primary"> {title ? 'Save' : 'add'} </Button>
            </Grid>
        </Grid>
           
        </form>
    </div>
    )
}