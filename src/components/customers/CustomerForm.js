import React,{useState} from 'react'
import validator from 'validator'
import {useDispatch} from 'react-redux'
import { startAddCustomers, startEditCustomer } from '../../Actions/customerActions'
import {TextField,  Button, Grid} from '@material-ui/core'
import FormControl from '@material-ui/core/FormControl';


export default function CustomerForm({id , name : title , email : mail , phNumber:mobile , handleToggle }){
    const dispatch  = useDispatch()
    const [name , setName] = useState(title ? title : '')
    const [phNumber , setphNumber] = useState(mobile ? mobile : '')
    const [email , setEmail] = useState(mail ? mail :'')
    const [formError , setFormError] = useState({})
    const error = {}

    const handleInput = (e) =>{
        const input = e.target.name
        if(input === "name"){
            setName(e.target.value)
        } else if(input === "phNumber"){
            setphNumber(e.target.value)
        } else if(input === "email"){
            setEmail(e.target.value)
        }
    }

    const runValidation=()=>{
        //name
        if(name.trim().length === 0){
            error.name = "name cannot be empty"
        }
        //email
        if(email.trim().length === 0){
            error.email = 'email cannot be empty'
        } else if(!(validator.isEmail(email))){
            error.email ="invalid email format"
        }

        // phnumber
        if(phNumber.trim().length === 0 ){
            error.phNumber = "mobile cannot be blank"
        }
    }


    const handleSubmit = (e)=>{
        e.preventDefault()

        //validation part 
        runValidation()

        if(Object.keys(error).length === 0 ){
            setFormError({})

            const formData = {
                name : name,
                mobile : Number(phNumber),
                email : email
            }

            if(handleToggle){
                dispatch(startEditCustomer(formData ,id))
                handleToggle()
            } else {
                dispatch(startAddCustomers(formData))
            }
    
            // reset form
    
            setName('')
            setphNumber('')
            setEmail('')

        } else {
            setFormError(error)
        }
        
    }

    return(
        <div>
            <hr/>
            {title ? <h2 style={{color:'orange'}}>Edit Form</h2> : <h2 style={{color:'green'}}>Add Customer</h2>}
            <form onSubmit = {handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}> 
                <FormControl size="small" style={{width:"300px"}} >
                <TextField   type="text" label="name" value={name}  name = "name" onChange={handleInput} /><br/>
                {formError.name && <span style={{color : 'red'}}>{formError.name}</span>}<br/>
                </FormControl>
                </Grid>

                <Grid item xs={12}>
                <FormControl size="small" style={{width:"300px"}} >     
                <TextField  type="text" label="mobile" value={phNumber} name = "phNumber" onChange={handleInput} /><br/>
                {formError.phNumber && <span style={{color : 'red'}}>{formError.phNumber}</span>}<br/>
                </FormControl>
                </Grid>

                <Grid item xs={12}> 
                <FormControl size="small" style={{width:"300px"}} >
                <TextField   type="email" label="email" value={email} name = "email" onChange={handleInput} /><br/>
                {formError.email && <span style={{color : 'red'}}>{formError.email}</span>}<br/>
                </FormControl>
                </Grid>

                <Grid item xs={12}> 
                <Button type="submit" size="small" variant="contained" color="primary"> {title ? 'Save' : 'Add'} </Button>
                </Grid>
            </Grid>
            </form>
        </div>
    )
}