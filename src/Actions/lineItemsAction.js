export const addItem = (item) => {
    return {
        type : "ADD_ITEM",
        payload : item
    }
}

export const removeItem = (id) => {
    return {
        type : "REMOVE_ITEM",
        payload : id
    }
}

export const incrementQuantity = (id) => {
    return {
        type : 'INCREMENT_QUANTITY',
        payload : id
    }
}

export const decrementQuantity = (id) => {
    return {
        type : 'DECREMENT_QUANTITY',
        payload : id
    }
}

export const resetItems = () => {
    return {
        type : "RESET_ITEMS"
    }
}