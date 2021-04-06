import React from 'react'
import { Grid, List , ListItem} from '@material-ui/core'

const Home = (props) => {

    return (
        <div>
            
            <Grid   >
                    <h1 style={{color:'orange', textAlign : "center"}}>Hello User</h1>
                    <br/>
                    <h2>follow the steps bellow:- </h2>
                    <div style={{ textAlign : "center"}}>
                    <List>
                        <ListItem > Register your account.</ListItem>
                        <ListItem> Login with your credentials.</ListItem>
                        <ListItem> For experimental basis login credentials:-</ListItem>
                        <ListItem><b>Email - sarvottamdutta@gmail.com ; Password - secreat@123</b></ListItem>
                        <ListItem> After login, account page will appear.</ListItem>
                        <ListItem> Add new customers and products in the respective links.</ListItem>
                        <ListItem> Add bill for the customers.</ListItem>
                        <ListItem> Click "print" link from the bills list to see a particular bill.</ListItem>
                        <ListItem> Click "pdf" to save/print the bill.</ListItem>
                        <ListItem> In Dashboard we can see all the customers, number products added and todays along with the last 5 bills and pie chart.</ListItem> 
                    </List>
                    </div>
                </Grid>
        </div>
    )
}

export default Home