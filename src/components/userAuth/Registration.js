import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'
import { Box, Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';


export default function Registration({history}){


    const [userName, steUserName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [businessName , setBusinessName] = useState('')
    const [address , setAddress] = useState('')
    const [formErrors , setFormErrors] = useState({})
    const errors= {}

    const handleInput = (e)=>{
        const input  = e.target.name
        if(input === "username"){
            steUserName(e.target.value)
        } else if(input === "email"){
            setEmail(e.target.value)
        } else if (input === "password"){
            setPassword(e.target.value)
        } else if(input === "businessName"){
            setBusinessName(e.target.value)
        } else if(input === "address"){
            setAddress(e.target.value)
        }
    }
    
    const runValidation = ()=>{
        //name
        if(userName.trim().length === 0){
            errors.username = "name cannot be blank"
        }
        //for email
        if(email.trim().length === 0){
            errors.email = "email cannot be blank"
        } else if(!(validator.isEmail(email))){
            errors.email = "invalid email format"
        }

        // for password
        if(password.trim().length === 0){
            errors.password = "password cannot be blank"
        }
        // for businessname
        if(businessName.trim().length === 0){
            errors.businessName = "businessName cannot be blank"
        }

        // for address
        if(address.trim().length === 0){
            errors.address = "address cannot be blank"
        }

    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        // for validation 
        runValidation ()

        if(Object.keys(errors).length === 0){
            setFormErrors({})
            const formData = {
                username : userName,
                email    : email,
                password : password,
                businessName : businessName,
                address : address
    
            }

            axios.post('http://dct-billing-app.herokuapp.com/api/users/register' , formData)
            .then((responce)=>{
                const result = responce.data
                if(Object.keys(result).includes('errors')){
                    swal(result.errors)
                } else {
                    swal('successfully created an account')
                    history.push('/login')
                }
            })
            .catch((err)=>{
                swal(err.message)
            })

                // reset form 
                steUserName('')
                setEmail('')
                setPassword('')
                setBusinessName('')
                setAddress('')

        } else {
            setFormErrors(errors)
        }

    }

    const avatarStyle={backgroundColor:'#055205'}

    return(
        <div>
            <Grid>
                
                <Paper component ={Box} width ="40%" mx= "auto" p={4}>
                    <Grid align='center'>
                             <Avatar style={avatarStyle}> <VpnKeyOutlinedIcon/> </Avatar>
                             <h2>Sign Up</h2>
                     </Grid>

                     <form onSubmit={handleSubmit}>
                     <Grid  container spacing={2}>
                     <Grid item xs={12}>
                        <TextField fullWidth placeholder="Enter your Name" margin ="normal" variant ="outlined" color ="secondary" label ="Name"
                        value ={userName} name ="username" onChange ={handleInput}/>
                        {formErrors.username && <span style={{color : 'red'}}>{formErrors.username}</span>}
                        </Grid>

                        <Grid item xs={12}>
                        <TextField fullWidth placeholder ="Enter your Email" margin ="normal" variant ="outlined" color ="secondary" label ="Email"
                        value ={email} name ="email" onChange = {handleInput}/>
                        {formErrors.email && <span style={{color : 'red'}}>{formErrors.email}</span>}
                        </Grid>

                        <Grid item xs={12}>
                        <TextField fullWidth placeholder ="Enter Password" margin ="normal" variant ="outlined" color ="secondary" label ="Password"
                        type = "password" value ={password} name ="password" onChange ={handleInput}/>
                        { formErrors.password && <span style={{color : 'red'}}> {formErrors.password} </span> }
                        </Grid>

                        <Grid item xs={12}>
                        <TextField fullWidth placeholder ="Enter your businessName" margin ="normal" variant ="outlined" color ="secondary" label ="Business Name"
                        value= {businessName} name = "businessName" onChange ={handleInput}/>
                        {formErrors.businessName && <span style={{color : 'red'}}>{formErrors.businessName}</span>}
                        </Grid>

                        <Grid item xs={12}>
                        <TextField fullWidth placeholder ="Enter your Address" margin ="normal" variant ="outlined" color ="secondary" label ="Address" multiline
                        rows ={4} value ={address} name ="address" onChange ={handleInput}/>
                        {formErrors.address && <span style={{color : 'red'}}>{formErrors.address}</span>}
                        </Grid>

                        <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="secondary" > SignUp </Button>
                        </Grid>

                        <Typography style = {{position: 'relative', top:20}}>
                        Already a user?
                        <Link to = '/login'>Login</Link>
                    </Typography>
                        </Grid>
                    </form> 
                </Paper>
         </Grid>
        </div>
    )
}