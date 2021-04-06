import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { Provider } from 'react-redux'
import configureStore from './Store/configureStore'
import {BrowserRouter} from 'react-router-dom'
import {startBillsList} from './Actions/billsAction'
import { startGetCustomer } from "./Actions/customerActions"
import { startGetProducts } from "./Actions/productActions"
import { startgetUser } from "./Actions/userActions"

const store = configureStore()
// console.log(store.getState())

store.subscribe(()=>{
  // console.log("updated store:", store.getState())
})

//handle page reload
if(localStorage.getItem('token')){
  store.dispatch(startgetUser())
  store.dispatch(startGetProducts())
  store.dispatch(startGetCustomer())
  store.dispatch(startBillsList())
 }

ReactDOM.render(<Provider store = {store}><BrowserRouter>
<App/>
</BrowserRouter>
</Provider> , document.getElementById('root'))
