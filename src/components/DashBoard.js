import React from 'react'
import {useSelector} from 'react-redux'
import { Grid, Typography, CardContent, Card} from '@material-ui/core'
import BillsList from './BillsList'
import Chart from "react-google-charts"

const DashBoard = (props) => {

    const customers = useSelector((state) => {
        return state.customer
    })

    const products = useSelector((state) => {
        return state.product
    })

    const bills = useSelector((state) => {
        return state.bills
    })

    return (
        <div style={{textAlign : 'center'}}>
            <Typography variant="h4" component="h2" style={{textAlign : 'center', color: 'blue'}} >DashBoard</Typography>
            <Grid container spacing={2} justify="center" >
                <Grid item xs={4}>
                <Card>    
                <CardContent>
                <Typography variant="h5" component="h2" style={{color:'purple'}}>
                Number of Customers
                </Typography>
                <Typography variant="h2" component="h2" style={{color:'purple'}}>
                {customers.length}
                </Typography>
                </CardContent>
                </Card>    
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                        <Typography variant="h5" component="h2" style={{color:'purple'}}>
                        Number of Products
                        </Typography>
                        <Typography variant="h2" component="h2" style={{color:'purple'}}>
                        {products.length}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                        <Typography variant="h5" component="h2" style={{color:'purple'}}>
                        Today's Bill
                        </Typography>
                        <Typography variant="h2" component="h2" style={{color:'purple'}}>
                        {bills.length}
                        </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                
            </Grid>
            
            <CardContent>
                <Typography variant="h5" component="h2"  style={{color:'green', textAlign : 'left'}}>Last 5 Bill's</Typography>
               
                </CardContent>
                <Grid container spacing={20}>
                 <Grid  item xs={8}>
                        <BillsList/>
                    </Grid>
                    


                    {/* PIE CHART */}

                    <Grid item xs={4}>
                    <Typography variant="h5" component="h6"  style={{color:'green', textAlign : 'right'}}>Sales Progress</Typography>
                    <Card>
                    {/* <Grid container >
                <Grid xs={12} sm={6}> */}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Title', 'Progress'],
                        [`Customer's`, customers.length],
                        [`Product's`, products.length],
                        [`Order's`, bills.length],
                    ]}
                    
                    rootProps={{ 'data-testid': '1' }}
                />
                {/* </Grid>
            </Grid> */}
            </Card>
            
                </Grid>
        </Grid>
        </div>
    )
}

export default DashBoard