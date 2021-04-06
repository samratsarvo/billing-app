import React from 'react'
import BillsItem from './BillsItem'
import {useSelector} from 'react-redux'
import { Container, Grid, CardContent, Card } from '@material-ui/core'

const BillsList = (props) => {
    // const [searchInput, setSearchInput] = useState('')
    let billsData = useSelector((state)=> {
        return state.bills
    })

    console.log(billsData)
        const lastFiveBills = billsData.slice(Math.max(billsData.length - 5, 0))
    console.log(lastFiveBills)
    return (
        <Grid item xs={10}>     
                <CardContent>
                    {lastFiveBills.map(ele=>{
                        return <BillsItem key = {ele._id} {...ele} />
                    })}
                 </CardContent>
                 <Container>
                </Container>               
                </Grid>
    )
}
export default BillsList