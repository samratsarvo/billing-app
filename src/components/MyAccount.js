import React,{useEffect} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {startgetUser} from '../Actions/userActions'
import { Container, Typography, Paper} from '@material-ui/core'

export default function MyAccount(){
    const dispatch = useDispatch()
    let user = useSelector((state)=>{
        return state.user
    })

    useEffect(()=>{
        dispatch(startgetUser())
    },[dispatch])

    return(
        <Container align="center">
        <hr />
        <Paper elevation={12} style={{width : '1200px', height : '250px', position :'absolute'}}>
                <Typography variant="a" component="h2" style={{color:'blue'}}>Account</Typography>
                <div style={{textAlign :'left', position :'absolute', marginLeft : '100px', marginTop : '30px'}}>
                <Typography> <b style={{color:'purple'}}>Name</b> -  <b style={{color:'purple'}}>{user.username}</b> </Typography>
                <Typography> <b style={{color:'purple'}}>Email</b> - <b style={{color:'purple'}}>{user.email}</b> </Typography>
                <Typography> <b style={{color:'purple'}}>Business Name</b> - <b style={{color:'purple'}}>{user.businessName}</b></Typography>
                <Typography> <b style={{color:'purple'}}>Communication Address</b> - <b style={{color:'purple'}}>{user.address}</b></Typography>
            </div>
        </Paper>
    </Container>
    )
}