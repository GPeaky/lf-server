const ErrorList = ({text, type}) => {
    return (
        <div className={type}>
            <span>{text}</span>
            <br />
        </div>
    )
}

export default ErrorList;