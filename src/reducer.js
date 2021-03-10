const initialState = {
    accessToken: 0,
    profileObj: {},
}

export default function reducer(state = initialState,action){
    switch(action.type){
        case "LOGIN":
            console.log('LOGIN')
            return {accessToken: action.payload.accessToken, profileObj: action.payload.profileObj}
        case "LOGOUT":
            return {accessToken: null, profileObj: null}
        default:
            return state;
    }
}