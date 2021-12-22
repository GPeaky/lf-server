const ErrorList = ({type, text}) => {
    return (
        <div className={type}>
            <span>{text}</span>
            <br />
        </div>
    )
}

export default ErrorList;