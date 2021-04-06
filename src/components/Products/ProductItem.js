import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { startRemoveProduct} from '../../Actions/productActions'
import EditProduct from './EditProduct'
import swal from 'sweetalert'
import {Card, CardActionArea,  CardActions, CardContent, Button, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export default function ProductItem({_id , name , price}){
    const dispatch = useDispatch()
    const [toggle , setToggle] = useState(false)

    const handleRemove = () =>{
        swal({
            title: "Are you sure?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        .then((willDelete) => {
            if(willDelete) {
                dispatch(startRemoveProduct(_id))
            } 
          })
        
    }

    

    const handleToggle = ()=>{
        setToggle(!toggle)
    }
    

    return (
        <div>
            {toggle ? (<div>
                <EditProduct id = {_id} name = {name} price = {price} handleToggle ={handleToggle}/>
                <Button size="small" variant="contained" color="secondary" onClick ={handleToggle}>Cancel</Button>
            </div>) : (
            <div>
               
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {name}
                          </Typography>
                          <Typography variant="body2"  component="p">
                            Price: ₹{price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button  onClick={handleToggle} size="small" color="primary">
                          <EditIcon fontSize="small"/>
                        </Button>
                        <Button size="small" color="secondary" onClick={() => {
                                        handleRemove(_id)
                                    }}>
                          <DeleteIcon fontSize="small"/>
                        </Button>
                      </CardActions>
                       
            </div>)}
        </div>
    )
}