import classNames from "classnames";
const Spinner = ({className}) => {
    return (
        <div className={classNames("spinner-border mx-auto mt-5", className)}  role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default Spinner;