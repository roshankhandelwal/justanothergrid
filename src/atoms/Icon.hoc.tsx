import Icon from "./Icon"

const WithIcon = (Component) => (props) => {
    return (
        <div onClick={props.clickHandler} className="cursor-pointer">
            <Component {...props}/>
        </div>
    );
}

export default WithIcon(Icon);