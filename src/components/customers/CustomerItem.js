import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { startRemoveCustomer } from '../../Actions/customerActions'
import EditCustomer from './EditCustomer'
import swal from 'sweetalert'
import {Card, CardActionArea, CardActions, CardContent, Button, Typography} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function CustomerItem({_id , name , email , mobile}){
    const dispatch = useDispatch()
    const [toggle , setToggle] = useState(false)

    const handleToggle = () =>{
        setToggle(!toggle)
    }

    const handleRemove = () =>{
      swal({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
      .then((willDelete) => {
          if(willDelete) {
              dispatch(startRemoveCustomer(_id))
          } 
        })
  }

    return (
        <div>
            {toggle ? (
                <div>
                    <EditCustomer id ={_id} name = {name} email = {email} mobile = {mobile} handleToggle = {handleToggle}/>
                    <Button size="small" variant="contained" color="secondary" onClick = {handleToggle}>cancel</Button>
                </div>
        ) : (
            <div>
                   
                      <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                         {name}
                        </Typography>
                        <Typography variant="body2" component="h2">
                         Mobile: {mobile}
                        </Typography>
                        <Typography variant="body2" component="h2">
                         Email: {email}
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
                                  
                  </div>
                  )}
                  </div>
                  )
}