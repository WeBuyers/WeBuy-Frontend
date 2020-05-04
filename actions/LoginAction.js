export const SET_USERNAME = 'SET_USERNAME'
export const SET_PASSWORD = 'SET_PASSWORD'
export const SET_TOKEN = 'SET_TOKEN'

export function setUsername(text) {
    return {
        type: SET_USERNAME,
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