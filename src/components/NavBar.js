import React from 'react'
import swal from 'sweetalert'
import {Link , Route, withRouter} from 'react-router-dom'
import BillsContainer from '../components/Billings/BillContainer'
import CustomerContainer from './customers/CustomerContainer'
import DashBoard from './DashBoard'
import MyAccount from './MyAccount'
import productContainer from './Products/ProductContainer'
import Home from './userAuth/Home'
import Login from './userAuth/Login'
import Registration from './userAuth/Registration'
import {clear} from "../Actions/userActions"
import {useDispatch} from 'react-redux'
import PrintBill from './Billings/PrintBill'
import {Grid,Typography, Button} from '@material-ui/core'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import DashboardTwoToneIcon from '@material-ui/icons/DashboardTwoTone';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import PersonOutlineTwoToneIcon from '@material-ui/icons/PersonOutlineTwoTone';
import DescriptionTwoToneIcon from '@material-ui/icons/DescriptionTwoTone';
import LocalMallTwoToneIcon from '@material-ui/icons/LocalMallTwoTone';


 const NavBar=({toggle , handleToggle , history, handleShowBill})=>{
     const dispatch = useDispatch()

     const navStyle = {
        position: "relative",
        left: 20
    }
    
    return(
        <div>
            
            <p style={{textAlign : "center"}}>
                {toggle ? (
                    <>
                         <Grid container direction="row">
                         <Grid item lg={2} style = {navStyle}><Button startIcon={<AccountBoxTwoToneIcon/>} component = {Link} to = "/account">Profile</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={<PersonOutlineTwoToneIcon/>} component = {Link} to = "/customers">Customer</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={< LocalMallTwoToneIcon/>} component = {Link} to = "/products">Products</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={< DescriptionTwoToneIcon/>} component = {Link} to = "/bills">Bills Generator</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={<DashboardTwoToneIcon/>}component = {Link} to = "/dashboard">Dashboard</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={<ExitToAppTwoToneIcon/>}component = {Link} to = "" onClick = {()=>{
                            swal('successfully logout')
                            dispatch(clear())
                            localStorage.removeItem('token')
                            history.push('/')
                            handleToggle()
                        }}>Logout</Button></Grid>
                        </Grid>
                    </>
                ): (
                    <>
                        <Grid >
                        <Typography align="right">
                         <Grid container direction="row" container spacing={10} justify="center"  >
                         <Grid item lg={2} style = {navStyle}><Button startIcon={<HomeTwoToneIcon />} component = {Link} to = "/">Home</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={<PersonAddRoundedIcon/>} component = {Link} to = "/registration" >Register</Button></Grid>
                        <Grid item lg={2} style = {navStyle}><Button startIcon={<LockOpenTwoToneIcon/>} component = {Link} to = "/login" >Login</Button></Grid>
                        </Grid>
                        </Typography>
                        </Grid>
                    </>
                )}
                </p>
            

            <Route path ="/" component ={Home} exact ={true}/>
            <Route path ="/account" component ={MyAccount} />
            <Route path ="/customers" component ={CustomerContainer} />
            <Route path ="/products" component ={productContainer} />
            <Route path ="/bills" render={(props) => {
                return <BillsContainer
                          {...props}
                          handleShowBill={handleShowBill}
                       />
            }} />
            <Route path = '/PrintBill/:id' component = {PrintBill}/>
            <Route path ="/dashboard" render={(props) => {
                return <DashBoard
                          {...props}
                          handleToggle ={handleToggle}
                       />
            }}/>
            <Route path ="/registration" component ={Registration} />
            <Route path ="/login" render ={(props)=>{
                return <Login {...props} handleToggle ={handleToggle}/>
            }} />

        </div>
    )
}

export default withRouter(NavBar)


            