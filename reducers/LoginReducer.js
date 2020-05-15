const initial = {
    username: "",
    password: "",
    auth: "",
    user_id: 0
}

export const loginReducer = (state = initial, action) =>{
    console.log(JSON.stringify(action))
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.text
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.text
            }
        case 'SET_TOKEN':
            return {
                ...state,
                auth: action.text
            }
        case 'SET_ID':
            return {
                ...state,
                user_id: action.payload
            }
        default:
            return state
    }
}