export const SET_USERNAME = 'SET_USERNAME'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_EMAIL = 'SET_EMAIL'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_ID = 'SET_ID'

export function setUsername(text) {
    return {
        type: SET_USERNAME,
        text
    }
}

export function setEmail(text) {
    return {
        type: SET_EMAIL,
        text
    }
}

export function setPassword(text) {
    return{
        type: SET_PASSWORD,
        text
    }
}

export function setToken(text) {
    return{
        type: SET_TOKEN,
        text
    }
}

export function setId(number) {
    return{
        type: SET_ID,
        payload: number
    }
}