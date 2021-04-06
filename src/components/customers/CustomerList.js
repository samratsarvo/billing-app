import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CustomerItem from './CustomerItem'
import { Grid, Typography, TextField } from '@material-ui/core'

export default function CustomerList(){
    const [input, setInput] = useState('')

    let data  = useSelector((state)=>{
        return state.customer
    })

    //search functionality
    const handleSearchChange = (e) => {
        setInput(e.target.value)
    }

    if(input.length>0){
        data = data.filter((cust)=>{
        return cust.name.toLowerCase().match(input.toLowerCase())
        })
    }
    return (
        <div>
             <hr />
            <h3 style={{color:'blue'}}>Number of Customers - {data.length}</h3>
            {data.length === 0 ? (
                <div>
                    <TextField  
                       style={{width: '90%', marginBottom : '30px'}}
                       variant="outlined"
                       size="small"
                       type = "text" 
                       placeholder = "Search by name..." 
                       onChange = {handleSearchChange} 
                       value = {input}
                    />
                    <Typography>No customers found</Typography>
                </div>
            ):(
                <div>
                     <TextField  
                       style={{width: '90%', marginBottom : '30px'}}
                       variant="outlined"
                       size="small"
                       type = "text" 
                       placeholder = "Search by name..." 
                       onChange = {handleSearchChange} 
                       value = {input}
                />
                    <Grid container spacing={2} style={{overflowY : 'scroll', maxHeight : '400px'}} >
                         {data.map((ele) => {
                            return (
                               <Grid item xs={6} key={ele._id}>
                                  <CustomerItem  {...ele} />
                               </Grid>
                            )
                         })}
                    </Grid>
            
                </div>
            )}
        </div>
    )
}