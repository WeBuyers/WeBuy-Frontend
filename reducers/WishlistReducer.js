const initial = {
    wishlist: []
}

export const wishlistReducer = (state = initial, action) =>{
    console.log(JSON.stringify(action));
    switch (action.type) {
        case 'IMPORT_WISHLIST':
            return {
                ...state,
                wishlist: action.payload
            }
        default:
            return state
    }
}