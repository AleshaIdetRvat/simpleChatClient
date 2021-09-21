import React from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import "./EntryPage.scss"

const InputWithValidate = ({
    className,
    register,
    placeholder,
    defaultValue = "",
    error,
    errorMsg = "",
}) => {
    return (
        <div class={`input-with-validate ${error && "with-error"} ${className}`}>
            <input defaultValue={defaultValue} placeholder={placeholder} {...register} />
            {error && <div class="input-with-validate__error">{errorMsg}</div>}
        </div>
    )
}

const EntryPage = ({ onLogin, isLoading, setLoading, defaultName }) => {
    const [error, setError] = React.useState(null)
    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            setError(null)
            setLoading(true)
            await axios.post("/rooms", data)

            onLogin(data)
        } catch (error) {
            setError("This username already exists")
            //console.log(error)
        } finally {
            setLoading(false)
        }
    }

    //console.log(watch("example")) // watch input value by passing the name of it

    return (
        <>
            <div class="entry-page">
                <form class="entry-page__form" onSubmit={handleSubmit(onSubmit)}>
                    <InputWithValidate
                        className="entry-page__room-id"
                        errorMsg="Field required"
                        error={errors.roomId}
                        placeholder={"Room id"}
                        register={register("roomId", { required: true })}
                    />
                    <InputWithValidate
                        defaultValue={defaultName}
                        className="entry-page__user-name"
                        errorMsg={error}
                        error={error}
                        placeholder={"Your name"}
                        register={register("userName", { required: true, maxLength: 10 })}
                    />

                    <button className="entry-page__btn" type="submit">
                        entry
                    </button>
                </form>
            </div>
        </>
    )
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
}

export default EntryPage
