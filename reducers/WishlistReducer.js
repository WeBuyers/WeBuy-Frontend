const initial = {
    wishlist: [],
    plan: [],
}

export const wishlistReducer = (state = initial, action) =>{
    console.log(JSON.stringify(action));
    switch (action.type) {
        case 'IMPORT_WISHLIST':
            return {
                ...state,
                wishlist: action.payload
            }
        case 'IMPORT_PLAN':
            return {
                ...state,
                plan: action.payload
            }
        default:
            return state
    }
}