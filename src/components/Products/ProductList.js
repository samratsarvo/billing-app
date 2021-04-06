import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ProductItem from './ProductItem'
import { Grid, Typography, TextField } from '@material-ui/core'


export default function ProductList(){
    const [input, setInput] = useState('')

    let data = useSelector((state)=>{
        return state.product
    })

    const handleSearchChange = (e) => {
        setInput(e.target.value)
    }

    if(input.length>0){
        data = data.filter((ele)=>{
        return ele.name.toLowerCase().match(input.toLowerCase())
        })
    }

    return(
        <div>
             <hr/>
            <h2 style={{color:'green'}}>Products List</h2>
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
                    <Typography>No products found</Typography>
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
                                    <ProductItem  {...ele} />
                                </Grid>
                            )
                         })}
                    </Grid>
                </div>
            )}
        </div>
        
    )
}



        