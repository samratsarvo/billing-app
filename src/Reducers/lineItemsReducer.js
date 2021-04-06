const lineItemsInitialValue = []

const lineItemsReducer = (state = lineItemsInitialValue, action) => {
    switch(action.type){
        case 'REMOVE_ITEM' : {
            return state.filter(item => action.payload !== item.prodId)
        }
        case 'ADD_ITEM' : {
            return [{...action.payload}, ...state]
        }
        case 'INCREMENT_QUANTITY' : {
            return state.map((item) => {
                if(item.prodId === action.payload  && item.quantity >=1){
                    return {...item, 'quantity' : item.quantity + 1}
                }else {
                    return {...item}
                }
            })
        }
        case 'DECREMENT_QUANTITY' : {
            return state.map((item) => {
                if(item.prodId === action.payload && item.quantity >=2){
                    return {...item, 'quantity' : item.quantity - 1}
                }else {
                    return {...item}
                }
            })
        }
        case 'RESET_ITEMS' : {
            return lineItemsInitialValue
        }
        default : {
            return state
        }
    }
}

export default lineItemsReducer