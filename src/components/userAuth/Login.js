import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import validator from 'validator'
import { Box, Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

export default function Login({history , handleToggle}){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [formError , setFormError] = useState({})
    const errors = {}

    const handleInput = (e)=>{
        const input = e.target.name
        if(input === 'email'){
            setEmail(e.target.value)
        } else if(input ==="password"){
            setPassword(e.target.value)
        }
    }

    const runValidation=()=>{
        // for email
        if(email.trim().length === 0){
            errors.email = "email cannot be empty"
        } else if(!(validator.isEmail(email))){
            errors.email = "invalid email format"
        }

        // for password
        if(password.trim().length === 0){
            errors.password = "password cannot be empty"
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()

        //for validation 
        runValidation()

        if(Object.keys(errors).length === 0){
            setFormError({})

            const formData = {
                email : email,
                password : password
            }
    
            axios.post('https://dct-billing-app.herokuapp.com/api/users/login' , formData)
                .then((responce)=>{
                    const result = responce.data
                    if(Object.keys(result).includes('errors')){
                        swal(result.errors)
                    } else{
                        swal('successfully loggedin')
                        localStorage.setItem('token',result.token)
                        history.push('/account')
                        handleToggle()
                    }
                })
                .catch((err) => {
                    swal(err.message)
                })
        } else {
            setFormError(errors)
        }
        //reset form
        setPassword('')
        setEmail('')
    }

        const avatarStyle={backgroundColor:'#055205'}

    return (
        <div>
             <Paper component ={Box} width ="40%" mx= "auto" p={4}>
             <Grid align='center'>
                        <Avatar style={avatarStyle}> < LockOutlinedIcon/> </Avatar>
                        <h2>Sign In</h2>
                </Grid>
               <Typography component="h1" variant="h5">Login</Typography>
               <form onSubmit={handleSubmit}>
               <Grid  container spacing={2}>
               <Grid item xs={12}>
                    <TextField fullWidth placeholder ="Enter your Email" margin ="normal" variant ="outlined" color ="secondary" label ="Email"
                        value ={email} name ="email" onChange = {handleInput}/>
                        {formError.email && <span style={{color : 'red'}}>{formError.email}</span>}
                        </Grid>

                        <Grid item xs={12}>
                    <TextField fullWidth placeholder ="Enter Password" margin ="normal" variant ="outlined" color ="secondary" label ="Password"
                        type = "password" value ={password} name ="password" onChange ={handleInput}/>
                        { formError.password && <span style={{color : 'red'}}> {formError.password} </span> }
                        </Grid>
   
                        <Grid item xs={12}>
                   <Button type="submit" variant="contained" color="primary"> Sign in </Button>
                   </Grid>

                   <Grid item xs={12}>
                   <Typography style = {{position: 'relative', top:20}}>
                        New user?
                        <Link to = '/registration'>Register</Link>
                    </Typography>
                    </Grid>
                    </Grid>
               </form>
            </Paper>
        </div>
    )
}  