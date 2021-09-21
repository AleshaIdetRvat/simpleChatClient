import React from "react"
import { useForm } from "react-hook-form"
import Preloader from "../common/Preloader/Preloader"
import socket from "../../socket"
import "./ChatPage.scss"

const ChatPage = ({ userName, roomId, isAuth, users, messages }) => {
    //

    const chat = React.useRef(null)

    const chatGoDown = () => {
        // it isn't action creator, it is dirty function!)
        //const chatBody = document.getElementById("chat-msgs-body")
        chat.current.scrollTop = chat.current.scrollHeight
    }

    const {
        register,
        handleSubmit,
        reset,
        //formState: { errors },
    } = useForm()

    const onSubmit = (msg) => {
        console.log(msg)
        socket.emit("ROOM_NEW_MSG", { roomId, userName, text: msg.message })
        reset()
    }

    React.useEffect(() => {
        chatGoDown()
    }, [messages])

    return (
        <>
            <Preloader loading={!users.length} />
            <div class="chat-page">
                <div class="chat-page__body">
                    <header class="chat-page__header">
                        <h3 class="chat-page__room">Room #{roomId}</h3>
                    </header>
                    <aside class="chat-page__sidebar">
                        <span class="chat-page__online">
                            Online: <strong>{users.length}</strong>
                        </span>
                        <div class="chat-page__users-row">
                            {users.map((user, i) => (
                                <div key={user + i} class="chat-page__user">
                                    {user}
                                </div>
                            ))}
                        </div>
                    </aside>
                    <div class="chat-page__dialog chat-dialog">
                        <div class="chat-dialog__body">
                            <div
                                ref={chat}
                                class="chat-dialog__messages"
                                id="chat-msgs-body"
                            >
                                <div class="chat-dialog__messages-body">
                                    {messages.map((msg) => (
                                        <div
                                            class={`chat-dialog__msg chat-msg ${
                                                msg?.userName == userName ? "my-msg" : ""
                                            }`}
                                        >
                                            <span class="chat-msg__name">
                                                {msg?.userName}
                                            </span>
                                            <span class="chat-msg__text">
                                                {msg?.text}
                                            </span>
                                            <span class="chat-msg__time">
                                                {msg?.time}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                class="chat-dialog__send-block"
                            >
                                <input
                                    {...register("message", {
                                        required: true,
                                    })}
                                    placeholder="Your message"
                                    rows="2"
                                    class="chat-dialog__input"
                                />
                                <button type="submit" class="chat-dialog__send-btn">
                                    <img src="https://img.icons8.com/material-rounded/192/000000/filled-sent.png" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatPage
