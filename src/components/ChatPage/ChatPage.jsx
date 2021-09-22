import React from "react"
import { useForm } from "react-hook-form"
import Preloader from "../common/Preloader/Preloader"
import socket from "../../socket"
import Media from "react-media"
import "./ChatPage.scss"

const ChatPage = ({ userName, roomId, isAuth, users, messages }) => {
    //
    const [showSidebar, setShowSidebar] = React.useState(false)

    const chat = React.useRef(null)

    const chatGoDown = () => {
        // it isn't action creator, it is dirty function!)
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

                        <Media
                            queries={{
                                small: "(max-width: 426px)",
                            }}
                        >
                            {(matches) => (
                                <>
                                    {matches.small ? (
                                        <>
                                            {showSidebar ? (
                                                ""
                                            ) : (
                                                <span class="chat-page__online">
                                                    Online:{" "}
                                                    <strong>{users.length}</strong>
                                                </span>
                                            )}
                                            <button
                                                onClick={() =>
                                                    setShowSidebar(!showSidebar)
                                                }
                                                className="chat-page__show-online-btn"
                                            >
                                                <svg
                                                    id="Capa_1"
                                                    enable-background="new 0 0 512 512"
                                                    height="512"
                                                    viewBox="0 0 512 512"
                                                    width="512"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g>
                                                        <circle
                                                            cx="256"
                                                            cy="119.631"
                                                            r="87"
                                                        />
                                                        <circle
                                                            cx="432"
                                                            cy="151.63"
                                                            r="55"
                                                        />
                                                        <circle
                                                            cx="80"
                                                            cy="151.63"
                                                            r="55"
                                                        />
                                                        <path d="m134.19 256.021c-21.65-17.738-41.257-15.39-66.29-15.39-37.44 0-67.9 30.28-67.9 67.49v109.21c0 16.16 13.19 29.3 29.41 29.3 70.026 0 61.59 1.267 61.59-3.02 0-77.386-9.166-134.137 43.19-187.59z" />
                                                        <path d="m279.81 241.03c-43.724-3.647-81.729.042-114.51 27.1-54.857 43.94-44.3 103.103-44.3 175.48 0 19.149 15.58 35.02 35.02 35.02 211.082 0 219.483 6.809 232-20.91 4.105-9.374 2.98-6.395 2.98-96.07 0-71.226-61.673-120.62-111.19-120.62z" />
                                                        <path d="m444.1 240.63c-25.17 0-44.669-2.324-66.29 15.39 51.965 53.056 43.19 105.935 43.19 187.59 0 4.314-7.003 3.02 60.54 3.02 16.8 0 30.46-13.61 30.46-30.34v-108.17c0-37.21-30.46-67.49-67.9-67.49z" />
                                                    </g>
                                                </svg>
                                            </button>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </>
                            )}
                        </Media>
                    </header>
                    <aside class={`chat-page__sidebar ${showSidebar ? "showed" : ""}`}>
                        <span class="chat-page__online">
                            Online: <strong>{users.length}</strong>
                        </span>
                        <div className="chat-page__users">
                            <div class="chat-page__users-row">
                                {users.map((user, i) => (
                                    <div key={user + i} class="chat-page__user">
                                        {user}
                                    </div>
                                ))}
                            </div>
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
