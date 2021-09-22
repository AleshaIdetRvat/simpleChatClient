import React from "react"
import socket from "./socket"
import EntryPage from "./components/EntryPage/EntryPage"
import AppReducer from "./reducers/AppReducer"
import ChatPage from "./components/ChatPage/ChatPage"
import Preloader from "./components/common/Preloader/Preloader"
import "./App.scss"

//window.socket = socket

const App = () => {
    const [isLoading, setLoading] = React.useState(false)

    const [state, dispatch] = React.useReducer(AppReducer, {
        userName: null,
        roomId: null,
        isAuth: false,
        users: [],
        messages: [],
    })

    const onLogin = (data) => {
        dispatch({ type: "SET_AUTH", payload: data })
        socket.emit("ROOM_JOIN", data)
    }
    React.useEffect(() => {
        socket.on("ROOM_SET_USERS", (users) => dispatch({ type: "SET_USERS", users }))
        socket.on("ROOM_SET_ALL_DATA", ({ users, messages }) => {
            dispatch({ type: "SET_USERS", users })
            dispatch({ type: "SET_MESSAGES", messages })
        })
        socket.on("ROOM_ADD_MSG", (msg) => dispatch({ type: "ADD_MSG", msg }))
    }, [])

    return (
        <div className="app">
            <ChatPage {...state} />
        </div>
        // <div className="app">
        //     <Preloader loading={isLoading} />
        //     {state.isAuth ? (
        //         <ChatPage {...state} />
        //     ) : (
        //         <EntryPage
        //             defaultName={state.userName}
        //             onLogin={onLogin}
        //             isLoading={isLoading}
        //             setLoading={setLoading}
        //         />
        //     )}
        // </div>
    )
}

export default App
