import './loading.css'
import {Translate} from "react-i18nify";

const Loading = () => {
    return (
        <div className="loader"><Translate value='general.loading' /></div>
    )
}

export default Loading