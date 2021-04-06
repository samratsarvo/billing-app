const productInitialValue = []

export default function productReducer(state = productInitialValue , action){
    switch(action.type) {
        case "GET_PRODUCT" :{
            return [...action.payload]
        }

        case "ADD_PRODUCT" :{
            return [...state , {...action.payload}]
        }

        case "REMOVE" : {
            return state.filter(ele=> ele._id !== action.payload._id)
        }
        
        case "EDIT" : {
            return state.map(ele=>{
                if(ele._id === action.payload._id){
                    return {...ele , ...action.payload}
                } else {
                    return {...ele}
                }
            })
        }
        
        default :{
            return [...state]
        }
    }
}