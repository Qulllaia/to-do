const defaultState = {
    user:{}
}

const LOGIN_USER = "LOGIN_USER"
const LOGOUT_USER = "LOGOUT_USER"

export const reducer = (state = defaultState, action) =>{
    switch(action.type){
      case LOGIN_USER:
        return {...state, user: action.payload}
      case LOGOUT_USER:
        return {user: {}}
      default:
        return state
    }
}

export const addLogAction = (payload) => ({type: LOGIN_USER, payload})
export const removeLogAction = (payload) => ({type: LOGOUT_USER, payload})
