import './header.css'
import Logout from "../logout/Logout"
import {Translate} from "react-i18nify";
import {useLocalization} from "../../hooks/useLocalization";

interface HeaderProps {
    showLogout?: boolean
}

const Header = (props: HeaderProps) => {

    const {setNextLocale} = useLocalization()

    const {
        showLogout = true
    } = props

    return (
        <header>
            <div className="header__language-box">
                <button
                    className='header__language-btn'
                    onClick={() => setNextLocale()}
                ><Translate value='icon' iconClass='header__language-btn' /></button>
            </div>
            <div className="header__logo-box">
                <img src="/logo.svg" alt='Speak Out Logo' />
                <h1><Translate value='header.logo' /></h1>
            </div>
            {
                showLogout &&
                <div className="header__logout">
                    <Logout />
                </div>
            }
        </header>
    )
}

export default Header