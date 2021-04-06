const userintialValue = {}

export default function userReducer(state = userintialValue , action ){

    switch(action.type){
        case "USERINFO" : {
            return {...action.payload}
        }

        case "CLEAR" : {
            return userintialValue
        }

        default : {
            return {...state}
        }
    }
}