const AppReducer = (state, action) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                ...state,
                ...action.payload,
                isAuth: true,
            }
        case "SET_USERS":
            return {
                ...state,
                users: action.users,
            }
        case "SET_MESSAGES":
            return {
                ...state,
                messages: action.messages,
            }
        case "ADD_MSG":
            return {
                ...state,
                messages: [...state.messages, action.msg],
            }

        default:
            break
    }
}
export default AppReducer
