import React from "react"
import "./Preloader.scss"

function usePrevious(value) {
    const ref = React.useRef()
    React.useEffect(() => {
        ref.current = value
    })
    return ref.current
}

const Preloader = ({ loading }) => {
    const [closing, setClosing] = React.useState(false)

    let timer = React.useRef(null)
    let prevLoading = usePrevious(loading)

    React.useEffect(() => {
        if (!loading && prevLoading) {
            setClosing(true)

            clearTimeout(timer.current)

            timer.current = setTimeout(() => {
                setClosing(false)
            }, 300)
        }
    }, [loading, prevLoading])
    return (
        <div
            style={loading || closing ? { display: "block" } : { display: "none" }}
            className={`main-preloader ${closing && "preloader-closing"}`}
        >
            <div className="main-preloader__body">
                <div className="main-preloader__icon lds-dual-ring"></div>
            </div>
        </div>
    )
}

export default Preloader
