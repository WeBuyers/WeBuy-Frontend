const initial = {
    username: "",
    password: "",
    auth: ""
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
        default:
            return state
    }
}