import {createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../Reducers/userReducers'
import customerReducer from '../Reducers/customerReducers'
import productReducer from '../Reducers/productReducers'
import billsReducer from '../Reducers/billsReducers'


import lineItemsReducer from '../Reducers/lineItemsReducer'

const  configureStore =()=>{
    const store = createStore(combineReducers({
        user : userReducer ,
        customer : customerReducer ,
        product : productReducer,
        bills : billsReducer,
        lineItems : lineItemsReducer,
    }),applyMiddleware(thunk))

    return store
}

export default configureStore